import React, { useState, useEffect } from 'react';
import { AlertTriangle, Calendar, Activity, Smile, Frown, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Recovery() {
  const [day, setDay] = useState(1);
  const [improving, setImproving] = useState(true);
  const [logs, setLogs] = useState([]);

  // Determine current phase based on day
  const phase = day <= 7 ? "Self-Care Phase (Day 1-7)" : 
                day <= 21 ? "Monitored Phase (Day 7-21)" : 
                "Escalation Phase (Day 21+)";

  const showEscalation = !improving && day > 7;

  const logDaily = (mood, quality) => {
    setLogs([{ day, mood, quality, date: new Date().toLocaleDateString() }, ...logs]);
    setDay(d => d + 1);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      <div className="mb-8">
        <h1 className="text-4xl text-white mb-2">My Recovery</h1>
        <p className="text-gray-400">Track your progress and receive AI-guided phase interventions.</p>
      </div>

      {showEscalation && (
        <div className="mb-8 border border-red-500/50 bg-red-500/10 rounded-xl p-6 relative overflow-hidden animate-pulse-slow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="flex items-start gap-4">
            <div className="bg-red-500/20 p-3 rounded-full text-red-400 shrink-0">
              <AlertTriangle size={28} />
            </div>
            <div>
              <h3 className="text-xl text-red-100 mb-2 font-serif tracking-wide">Escalation Alert</h3>
              <p className="text-red-200/80 mb-4">
                Based on your lack of progress past the self-care phase, we strongly recommend consulting a sleep specialist. Continuous sleep disruption requires medical evaluation.
              </p>
              <div className="flex gap-3">
                <Link to="/doctors" className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-red-600 transition">
                  <PhoneCall size={16} /> Contact Specialist
                </Link>
                <button onClick={() => setImproving(true)} className="bg-navy-800 text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-navy-700 transition">
                  Dismiss for now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl text-white flex items-center gap-2"><Calendar className="text-lavender-400"/> Current Phase</h3>
            <span className="font-mono text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full text-sm">Day {day}</span>
          </div>

          <div className="relative pt-4 pb-8">
            <div className="absolute top-1/2 -mt-4 left-0 w-full h-1.5 bg-navy-700 rounded-full"></div>
            <div className="absolute top-1/2 -mt-4 left-0 h-1.5 bg-gradient-to-r from-teal-400 to-lavender-400 rounded-full transition-all duration-500" style={{ width: `${Math.min((day / 30) * 100, 100)}%` }}></div>
            
            <div className="relative flex justify-between text-xs font-mono text-gray-500 mt-4">
              <span className={day >= 1 ? "text-teal-400" : ""}>Day 1</span>
              <span className={day >= 7 ? "text-teal-400" : ""}>Day 7</span>
              <span className={day >= 21 ? "text-lavender-400" : ""}>Day 21+</span>
            </div>
          </div>
          <p className="text-gray-300"><strong>Status:</strong> {phase}</p>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-xl text-white flex items-center gap-2 mb-4"><Activity className="text-teal-400"/> Progress</h3>
          <p className="text-sm text-gray-400 mb-4">Are your symptoms improving compared to when you started?</p>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setImproving(true)}
              className={`p-3 rounded-lg border text-sm flex justify-center items-center gap-2 transition-colors ${improving ? 'bg-teal-500/20 border-teal-500/50 text-teal-300' : 'bg-navy-800 border-navy-700 text-gray-400 hover:text-white'}`}
            >
              <Smile size={18} /> Yes, improving
            </button>
            <button 
              onClick={() => setImproving(false)}
              className={`p-3 rounded-lg border text-sm flex justify-center items-center gap-2 transition-colors ${!improving ? 'bg-red-500/20 border-red-500/50 text-red-300' : 'bg-navy-800 border-navy-700 text-gray-400 hover:text-white'}`}
            >
              <Frown size={18} /> Not improving
            </button>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 shadow-xl mb-8">
        <h3 className="text-xl text-white mb-4 border-b border-navy-700 pb-2">Daily Check-in</h3>
        <div className="flex items-center gap-4">
          <p className="text-gray-400 flex-1">How was your sleep last night?</p>
          <div className="flex gap-2">
            {['Terrible', 'Poor', 'Fair', 'Good', 'Excellent'].map((q, idx) => (
              <button 
                key={idx}
                onClick={() => logDaily('Neutral', q)}
                className="w-10 h-10 rounded-full bg-navy-800 border border-navy-700 hover:border-teal-500 hover:text-teal-400 text-gray-400 flex items-center justify-center text-xs transition"
                title={q}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {logs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg text-gray-300 font-serif">Recent Logs</h3>
          {logs.map((log, i) => (
            <div key={i} className="flex items-center justify-between bg-navy-800/50 p-4 rounded-xl border border-navy-700/50">
              <div className="flex gap-4 items-center">
                <span className="font-mono text-teal-400 bg-teal-400/10 px-2 py-1 rounded text-xs">Day {log.day}</span>
                <span className="text-gray-300">{log.date}</span>
              </div>
              <span className="text-gray-200">Sleep Quality: <strong className="text-white">{log.quality}</strong></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
