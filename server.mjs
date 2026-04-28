import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = Number(process.env.PORT || 8787);
const ENV_PATHS = [resolve('.env.local'), resolve('.env')];
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';
const MAX_REPLY_LINES = 5;

function loadEnvValue(name) {
  if (process.env[name]) {
    return process.env[name];
  }

  for (const filePath of ENV_PATHS) {
    if (!existsSync(filePath)) continue;

    const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;

      const equalsIndex = trimmed.indexOf('=');
      const key = trimmed.slice(0, equalsIndex).trim();
      if (key !== name) continue;

      let value = trimmed.slice(equalsIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      return value;
    }
  }

  return '';
}

function loadGroqApiKey() {
  return loadEnvValue('GROQ_API_KEY') || loadEnvValue('VITE_GROQ_API_KEY');
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function jsonResponse(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(payload));
}

function buildMessages(systemPrompt, messages) {
  return [
    { role: 'system', content: systemPrompt },
    ...messages.map(message => ({
      role: message.role === 'assistant' ? 'assistant' : 'user',
      content: String(message.text || ''),
    })),
  ];
}

function formatReply(text) {
  const normalized = String(text || '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (!normalized) return '';

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map(sentence => sentence.trim())
    .filter(Boolean);

  const limited = (sentences.length ? sentences : [normalized])
    .slice(0, MAX_REPLY_LINES)
    .join('\n');

  return limited.length > 420 ? `${limited.slice(0, 417).trimEnd()}...` : limited;
}

const server = createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    });
    response.end();
    return;
  }

  if (request.method !== 'POST' || request.url !== '/api/chat') {
    jsonResponse(response, 404, { error: 'Not found' });
    return;
  }

  const apiKey = loadGroqApiKey();
  if (!apiKey) {
    jsonResponse(response, 500, { error: 'Missing GROQ_API_KEY' });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const systemPrompt = typeof body.systemPrompt === 'string' ? body.systemPrompt : '';

    const groqResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: buildMessages(systemPrompt, messages),
        temperature: 0.7,
      }),
    });

    const payload = await groqResponse.json();

    if (!groqResponse.ok) {
      jsonResponse(response, groqResponse.status, {
        error: payload?.error?.message || 'Groq request failed',
      });
      return;
    }

    const reply = formatReply(payload?.choices?.[0]?.message?.content || '');
    jsonResponse(response, 200, { reply, raw: payload });
  } catch (error) {
    jsonResponse(response, 500, {
      error: error instanceof Error ? error.message : 'Unexpected server error',
    });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Groq chat proxy listening on http://0.0.0.0:${PORT}`);
  if (!loadGroqApiKey()) {
    console.log('Set GROQ_API_KEY in .env.local to enable the chatbot.');
  }
});
