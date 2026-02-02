
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';

export const AIAssistantSection: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'ai' | 'user', text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleConsult = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    const newHistory = [...chatHistory, { role: 'user', text: prompt }];
    setChatHistory(newHistory as any);
    const currentPrompt = prompt;
    setPrompt('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: currentPrompt,
        config: {
          systemInstruction: "You are an expert e-commerce business consultant in Bangladesh. Help the merchant grow their logistics and sales business. Keep answers concise and professional in English.",
        }
      });
      
      setChatHistory([...newHistory, { role: 'ai', text: response.text || "I'm sorry, I couldn't process that." }] as any);
    } catch (error) {
      setChatHistory([...newHistory, { role: 'ai', text: "Service temporarily unavailable. Please try again later." }] as any);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[70vh]">
      <div className="p-6 border-b border-slate-100 bg-brand-dark text-white rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center">
            <Sparkles className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">AI Business Assistant</h2>
            <p className="text-xs text-slate-300">Powered by Gemini 3</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {chatHistory.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 max-w-sm mx-auto">
            <div className="p-4 bg-slate-50 rounded-full">
              <Bot size={48} className="text-slate-300" />
            </div>
            <h3 className="font-bold text-brand-dark">How can I help you today?</h3>
            <p className="text-sm text-slate-500">
              Ask about business growth, logistics optimization, or marketing strategies for your merchant profile.
            </p>
          </div>
        )}
        
        {chatHistory.map((chat, idx) => (
          <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] flex items-start gap-3 p-4 rounded-2xl ${
              chat.role === 'user' 
                ? 'bg-brand-orange text-white rounded-tr-none' 
                : 'bg-slate-100 text-brand-dark rounded-tl-none border border-slate-200'
            }`}>
              <div className="shrink-0 mt-1">
                {chat.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-brand-orange" />}
              </div>
              <p className="text-sm leading-relaxed">{chat.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none border border-slate-200 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-brand-orange" />
              <span className="text-sm text-slate-500">Analyzing business data...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="relative">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleConsult()}
            placeholder="Ask about your business..."
            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none pr-16 transition-all text-slate-900 font-medium"
          />
          <button 
            disabled={isLoading}
            onClick={handleConsult}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-dark text-white rounded-xl flex items-center justify-center hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
