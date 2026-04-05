import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Minimize2, AlertTriangle } from 'lucide-react';

// ========================
// 🔑 GEMINI API CONFIG
// Get your key from: https://aistudio.google.com/app/apikey
// Key format looks like: AIzaSy... (NOT a client ID)
// ========================
const GEMINI_API_KEY = 'AIzaSyCq64lm4UeuqjqugAVfPaAQU9i4_cZYFgA'; // ⚠️ Replace with your AIzaSy... key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are SleepSense AI, an expert health assistant specializing in sleep disorders and general health topics.

YOUR RULES:
1. ONLY answer questions related to: sleep disorders, sleep health, yoga for sleep, breathing exercises, relaxation techniques, mental wellness, physical health, nutrition for sleep, fatigue, insomnia, snoring, anxiety related to sleep, and general medical health guidance.
2. If the user asks about ANYTHING outside health and wellness (like politics, coding, entertainment, finance, sports, or any non-health topic), respond ONLY with: "I'm SleepSense AI and I can only help with health and sleep-related questions. Please ask me about your sleep or health."
3. Be empathetic, supportive, and clear.
4. NEVER give a definitive medical diagnosis. Always suggest consulting a qualified doctor for serious symptoms.
5. Format responses in short, readable paragraphs. Use bullet points when listing remedies or tips.
6. Mention yoga poses, breathing exercises, or lifestyle changes before suggesting medication.
7. Always end serious symptom discussions with: "Please consult a sleep specialist or doctor for proper evaluation."`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! 👋 I\'m SleepSense AI, your health & sleep assistant. Ask me anything about sleep disorders, yoga, breathing exercises, or general wellness.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Build Gemini conversation history format
  // IMPORTANT: Gemini requires conversation to START with a 'user' turn.
  // We skip the initial bot greeting (index 0) to avoid API rejection.
  const buildHistory = (msgs) => {
    return msgs
      .filter(m => m.role !== 'system')
      .slice(1) // skip the initial assistant greeting
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));
  };

  const handleSend = async (text) => {
    const userMessage = text || input;
    if (!userMessage.trim()) return;

    const newMsgs = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMsgs);
    setInput('');
    setIsLoading(true);
    setApiError(false);

    try {
      const history = buildHistory(messages); // exclude the new user message from history

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [
            ...history,
            { role: 'user', parts: [{ text: userMessage }] }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          }
        })
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        console.error('Gemini API error body:', errBody);
        const errMsg = errBody?.error?.message || `HTTP ${response.status}`;
        throw new Error(errMsg);
      }

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
        || "I'm sorry, I couldn't generate a response. Please try again.";

      setMessages([...newMsgs, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Gemini API error:', error.message);
      setApiError(true);
      const isKeyError = error.message?.toLowerCase().includes('api key') || error.message?.includes('403') || error.message?.includes('401');
      setMessages([...newMsgs, {
        role: 'assistant',
        content: isKeyError
          ? "🔑 API key issue: Your key appears to be invalid. Please make sure you're using an **AIzaSy...** format key from https://aistudio.google.com/app/apikey (not a client ID)."
          : `⚠️ Connection error: ${error.message}. Please try again.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = [
    "I can't fall asleep",
    "I wake up often at night",
    "I feel tired all day",
    "Yoga poses for better sleep",
    "Tell me about sleep hygiene"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-teal-500 hover:bg-teal-400 text-navy-900 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,212,200,0.4)] transition-transform hover:scale-110 z-50"
        title="Chat with SleepSense AI"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-navy-900 border border-navy-700/50 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-slide-up h-[520px]">
      {/* Header */}
      <div className="bg-navy-800 p-4 border-b border-navy-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bot className="text-teal-400" size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          </div>
          <div>
            <span className="font-serif text-base tracking-wide text-white">SleepSense AI</span>
            <p className="text-xs text-emerald-400 font-mono">Powered by Gemini</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
          <Minimize2 size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-900/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-lavender-500/20 text-lavender-400' : 'bg-teal-500/20 text-teal-400'}`}>
              {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`p-3 rounded-2xl max-w-[78%] text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user'
              ? 'bg-lavender-600 text-white rounded-tr-sm'
              : 'bg-navy-800 border border-navy-700 text-gray-200 rounded-tl-sm'
              }`}>
              {m.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="p-4 bg-navy-800 border border-navy-700 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 border-t border-navy-800 bg-navy-900">
        {/* Quick replies — shown only on first message */}
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
            placeholder="Ask about sleep or health..."
            className="flex-1 bg-navy-800 border border-navy-700 text-white text-sm rounded-xl px-4 py-2 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none placeholder-gray-500 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-teal-500 text-navy-900 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-400 transition"
          >
            <Send size={18} />
          </button>
        </form>

        <p className="text-center text-gray-600 text-[10px] mt-2 font-mono">
          Health guidance only · Not a substitute for medical advice
        </p>
      </div>
    </div>
  );
}
