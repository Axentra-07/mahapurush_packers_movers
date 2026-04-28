import React, { useEffect, useRef, useState } from 'react';
import { Bot, Loader2, MessageSquare, Send, X } from 'lucide-react';
import { ADDRESS, COMPANY_NAME, EMAIL, PHONE, SERVICES, WHATSAPP } from '../constants';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role: ChatRole;
  text: string;
};

const CHAT_API_URL = '/api/chat';
const SYSTEM_PROMPT = `You are a helpful assistant for ${COMPANY_NAME} in Ratnagiri, Maharashtra.
Answer in a friendly, concise, practical tone.
Keep every reply to 4 or 5 short lines maximum.
Use plain language and answer directly.
Help with packing, household shifting, office relocation, vehicle transport, fragile item handling, and service questions.
If asked about pricing, explain that costs depend on distance, volume, and service type, and direct the user to contact the company for a custom quote.
Use these contact details when relevant:
Phone: ${PHONE}
WhatsApp: ${WHATSAPP}
Email: ${EMAIL}
Address: ${ADDRESS}
Do not mention policies, coding, or internal implementation details.`;

const buildFallbackReply = (message: string) => {
  const text = message.toLowerCase();

  if (text.includes('price') || text.includes('cost') || text.includes('quote') || text.includes('charge')) {
    return `Pricing depends on the move size and distance. Please call ${PHONE} or WhatsApp ${WHATSAPP} for a custom quote.`;
  }

  if (text.includes('phone') || text.includes('contact') || text.includes('number') || text.includes('reach')) {
    return `You can reach ${COMPANY_NAME} at ${PHONE}, WhatsApp ${WHATSAPP}, or email ${EMAIL}.`;
  }

  if (text.includes('address') || text.includes('location') || text.includes('office')) {
    return `Our office address is ${ADDRESS}.`;
  }

  if (text.includes('car') || text.includes('bike') || text.includes('vehicle')) {
    return 'Yes, we provide car and bike transportation with careful loading and transit support.';
  }

  if (text.includes('fragile') || text.includes('glass') || text.includes('electronics') || text.includes('tv')) {
    return 'For fragile items, we use layered packing and cushioning to reduce damage risk.';
  }

  return `I can help with services, packing, vehicle transport, and contact details. We also handle ${SERVICES[0].title.toLowerCase()}.`;
};

const AIAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: 'Hi! I am Mahapurush Moving Assistant. How can I help you today?' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    const nextMessages = [...messages, { role: 'user', text: userMsg }];
    setInput('');
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages.slice(-8),
          systemPrompt: SYSTEM_PROMPT,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Chat request failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      const reply = data?.reply?.trim() || buildFallbackReply(userMsg);

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: buildFallbackReply(userMsg),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[70] flex flex-col items-end sm:bottom-6 sm:left-auto sm:right-6">
      {open && (
        <div className="mb-3 flex h-[min(72vh,32rem)] w-full max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-brandGray bg-white shadow-2xl sm:h-[500px] sm:w-96">
          <div className="flex items-center justify-between bg-primary-500 p-3 text-white sm:p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cta p-2 text-primary-900 shadow-md">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none sm:text-base">Moving Assistant</p>
                <p className="mt-1 text-[10px] font-extrabold uppercase tracking-widest text-cta">Groq powered</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 transition-colors hover:bg-white/10"
              aria-label="Close assistant"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-brandGray/30 p-3 no-scrollbar sm:space-y-4 sm:p-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-[13px] font-medium leading-relaxed shadow-sm sm:max-w-[85%] sm:p-3 sm:text-sm ${
                    message.role === 'user'
                      ? 'rounded-tr-none bg-primary-500 text-white'
                      : 'rounded-tl-none border border-brandGray bg-white text-textMain'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-brandGray bg-white px-3 py-2 shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-cta" />
                  <span className="text-xs font-bold italic text-textMuted">Planning your move...</span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-brandGray bg-white p-3 sm:p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about packing or transport..."
                className="min-w-0 flex-1 rounded-xl border border-brandGray bg-brandGray px-3 py-2 text-[13px] font-medium text-primary-900 focus:outline-none focus:ring-2 focus:ring-cta sm:px-4 sm:text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 rounded-xl bg-cta p-2.5 text-primary-900 shadow-md transition-colors hover:bg-cta-hover disabled:opacity-50 sm:p-2"
                aria-label="Send message"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(v => !v)}
        className="rounded-full border-2 border-white bg-primary-500 p-3 text-cta shadow-2xl transition-all hover:scale-110 active:scale-95 sm:p-4"
        aria-label={open ? 'Close Assistant' : 'Open Assistant'}
      >
        {open ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />}
      </button>
    </div>
  );
};

export default AIAssistant;
