import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Minimize2 } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi, I am SleepSense AI. How are you sleeping lately?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    const userMessage = text || input;
    if (!userMessage.trim()) return;

    const newMsgs = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMsgs);
    setInput('');
    setIsLoading(true);

    try {
      // NOTE: Using a mock response for now to prevent exposing a real API key.
      // To use the real Claude API:
      // const res = await fetch('https://api.anthropic.com/v1/messages', { ... })
      
      setTimeout(() => {
        let reply = "I understand. Poor sleep can be very difficult.";
        const lowerStr = userMessage.toLowerCase();
        
        if (lowerStr.includes("can't fall asleep")) {
          reply = "Trouble falling asleep (sleep onset insomnia) is common. Have you tried progressive muscle relaxation or the 4-7-8 breathing technique? Also, evaluating your caffeine intake and screen time before bed can help.";
        } else if (lowerStr.includes("wake up often")) {
          reply = "Frequent waking can be a sign of sleep apnea or environmental disruptions. Is your room dark, cool, and quiet? If you wake up gasping for air, please consult a specialist from our directory.";
        } else if (lowerStr.includes("tired all day")) {
          reply = "Excessive daytime sleepiness might indicate that you aren't reaching deep sleep or could point to conditions like hypersomnia. Are you getting 7-9 hours of sleep opportunity?";
        } else if (lowerStr.includes("hygiene")) {
          reply = "Good sleep hygiene involves: 1. Consistent sleep/wake times 2. Cool, dark room 3. No screens 1 hour before bed 4. Avoiding heavy meals late at night.";
        }

        setMessages([...newMsgs, { role: 'assistant', content: reply }]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      setMessages([...newMsgs, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
      setIsLoading(false);
    }
  };

  const quickReplies = [
    "I can't fall asleep", 
    "I wake up often", 
    "I feel tired all day", 
    "Tell me about sleep hygiene"
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-teal-500 hover:bg-teal-400 text-navy-900 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,212,200,0.4)] transition-transform hover:scale-110 z-50"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-navy-900 border border-navy-700/50 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-slide-up h-[500px]">
      <div className="bg-navy-800 p-4 border-b border-navy-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="text-teal-400" size={20} />
          <span className="font-serif text-lg tracking-wide text-white">SleepSense AI</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
          <Minimize2 size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-900/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-lavender-500/20 text-lavender-400' : 'bg-teal-500/20 text-teal-400'}`}>
              {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`p-3 rounded-2xl max-w-[75%] text-sm ${
              m.role === 'user' 
                ? 'bg-lavender-600 text-white rounded-tr-sm' 
                : 'bg-navy-800 border border-navy-700 text-gray-200 rounded-tl-sm'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="p-4 bg-navy-800 border border-navy-700 rounded-2xl rounded-tl-sm flex gap-1 items-center">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-navy-800 bg-navy-900">
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {quickReplies.map((qr) => (
              <button 
                key={qr} 
                onClick={() => handleSend(qr)}
                className="text-xs bg-navy-800 hover:bg-navy-700 text-teal-300 border border-teal-500/20 px-3 py-1.5 rounded-full transition"
              >
                {qr}
              </button>
            ))}
          </div>
        )}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-navy-800 border-none text-white text-sm rounded-xl px-4 py-2 focus:ring-1 focus:ring-teal-500 outline-none"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-teal-500 text-navy-900 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-400 transition"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
