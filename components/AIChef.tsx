import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './ui/Icons';
import { chatWithChef } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useRestaurant } from '../context/RestaurantContext';

export const AIChef: React.FC = () => {
  const { menuItems } = useRestaurant();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bonjour. I am Chef Aurelius, your digital concierge. I can recommend pairings or detail our ingredients. How may I be of service?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const historyForAi = messages.concat(userMsg);
    const responseText = await chatWithChef(historyForAi, input, menuItems);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col transition-all animate-fade-in-up origin-bottom-right">
          {/* Header */}
          <div className="bg-stone-900 text-gold-50 p-5 flex justify-between items-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Icons.Chef className="w-24 h-24 text-white" />
             </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-1.5 bg-gold-500 rounded-full text-stone-900">
                 <Icons.Chef className="w-5 h-5" />
              </div>
              <div>
                  <h3 className="font-display font-bold text-lg tracking-wide leading-none">Concierge</h3>
                  <span className="text-[10px] text-gold-300 uppercase tracking-widest">Always at service</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition relative z-10">
              <Icons.Close className="w-5 h-5" />
            </button>
          </div>
          
          {/* Chat Area */}
          <div ref={scrollRef} className="h-96 overflow-y-auto p-6 bg-[#FAFAF9] space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-stone-900 text-white rounded-2xl rounded-tr-none' 
                    : 'bg-white border border-stone-200 text-stone-700 rounded-2xl rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                  <span className="text-xs text-stone-400 mr-2 font-serif italic">Chef is thinking</span>
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-stone-100">
            <div className="flex gap-2 items-center bg-stone-50 border border-stone-200 rounded-full px-2 py-1 focus-within:ring-2 focus-within:ring-gold-400/20 focus-within:border-gold-400 transition-all">
                <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for a wine pairing..."
                className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-sm text-stone-800 placeholder:text-stone-400"
                />
                <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className="p-2 bg-stone-900 text-gold-400 rounded-full hover:bg-black hover:text-gold-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                <Icons.Send className="w-4 h-4 ml-0.5" />
                </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-2 ${
            isOpen ? 'bg-stone-800 border-stone-700 text-white rotate-90' : 'bg-white border-gold-400 text-gold-600 hover:scale-110'
        }`}
      >
        {isOpen ? <Icons.Close className="w-6 h-6" /> : <Icons.Chef className="w-8 h-8" />}
        {!isOpen && (
            <span className="absolute right-0 top-0 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-gold-500"></span>
            </span>
        )}
      </button>
    </div>
  );
};