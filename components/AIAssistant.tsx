
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Hi! I am Mahapurush Moving Assistant. How can I help you plan your move today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Ref to persist the chat session across re-renders
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Lazy initialization of the AI client and Chat session
      if (!chatSessionRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: `You are an expert moving consultant for 'Mahapurush Packers and Movers' in Ratnagiri, Maharashtra. 
            Provide helpful, professional advice about packing, moving fragile items, relocation checklists, and vehicle transport. 
            Keep answers concise and friendly. If users ask about specific prices, tell them to visit our Contact page or call us for a custom quote.
            Our address: House No. B/1714, Rasalwadi, Near Bus Stop, Nachane Road, Shanti Nagar, Ratnagiri.
            Focus on damage-free shifting and customer trust.`,
          },
        });
      }

      // Send message using the stateful chat session
      const result = await chatSessionRef.current.sendMessage({ message: userMsg });
      
      const botText = result.text || "I'm sorry, I couldn't process that. Please try again or call us directly.";
      setMessages(prev => [...prev, { role: 'model', text: botText }]);
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      
      let errorMessage = "I'm having a bit of trouble connecting to my moving database. Please feel free to call us directly for immediate help!";
      
      // Handle specific API key or auth issues gracefully
      if (error.message?.includes('API_KEY') || error.message?.includes('403') || error.message?.includes('401')) {
        errorMessage = "The moving assistant service is currently unavailable. Please contact us via phone or WhatsApp for assistance.";
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: errorMessage
      }]);
      
      // Reset chat session on error to allow a fresh start if it was a session-specific error
      chatSessionRef.current = null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 h-[500px] shadow-2xl rounded-3xl mb-4 flex flex-col overflow-hidden border border-brandGray animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-primary-500 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="bg-cta p-2 rounded-lg text-primary-900 shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold leading-none">Moving Assistant</p>
                <p className="text-[10px] text-cta uppercase tracking-widest mt-1 font-extrabold">Expert Help</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/10 p-1 rounded-full transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-brandGray/30 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm font-medium ${
                  m.role === 'user' 
                    ? 'bg-primary-500 text-white rounded-tr-none' 
                    : 'bg-white text-textMain rounded-tl-none border border-brandGray'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-brandGray flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-cta animate-spin" />
                  <span className="text-xs text-textMuted font-bold italic">Planning your move...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-brandGray">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about packing fragile items..."
                className="flex-1 bg-brandGray border-brandGray rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-cta focus:outline-none font-medium text-primary-900"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-cta text-primary-900 p-2 rounded-xl hover:bg-cta-hover transition-colors disabled:opacity-50 shadow-md flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-500 text-cta p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce-slow border-2 border-white"
        aria-label={isOpen ? "Close Assistant" : "Open Assistant"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default AIAssistant;
