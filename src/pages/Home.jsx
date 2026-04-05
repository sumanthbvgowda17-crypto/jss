import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Moon, Star, Activity, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in relative">
      {/* Background SVG Animation element */}
      <div className="absolute inset-0 z-[-1] overflow-hidden flex items-center justify-center opacity-30 pointer-events-none">
        <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="w-full h-full text-navy-800">
          <path d="M0,250 C200,100 300,400 500,250 C700,100 800,400 1000,250 L1000,500 L0,500 Z" fill="currentColor" fillOpacity="0.2">
            <animate attributeName="d" values="M0,250 C200,100 300,400 500,250 C700,100 800,400 1000,250 L1000,500 L0,500 Z; M0,250 C200,400 300,100 500,250 C700,400 800,100 1000,250 L1000,500 L0,500 Z; M0,250 C200,100 300,400 500,250 C700,100 800,400 1000,250 L1000,500 L0,500 Z" dur="10s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="glass-panel p-3 rounded-full mb-8 inline-flex items-center gap-2 border-teal-500/30">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
        <span className="text-sm font-mono text-teal-300">AI-Powered Sleep Analysis</span>
      </div>

      <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 tracking-tight leading-tight">
        Understand Your Sleep. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-lavender-400">
          Reclaim Your Life.
        </span>
      </h1>
      
      <p className="text-xl text-gray-400 max-w-2xl mb-12 font-light">
        SleepSense uses advanced AI to analyze your symptoms and guide you towards better rest. 
        Start your journey to deeper, more restorative sleep today.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/checker" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
          Start Symptom Check <ArrowRight size={20} />
        </Link>
        <Link to="/doctors" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg">
          Find a Specialist
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-4xl text-left">
        <div className="glass-panel p-6">
          <Activity className="text-teal-400 mb-4" size={32} />
          <h3 className="text-xl text-white mb-2">Smart Analysis</h3>
          <p className="text-gray-400 text-sm">Pinpoint potential sleep disorders based on your unique symptomatology.</p>
        </div>
        <div className="glass-panel p-6">
          <Moon className="text-lavender-400 mb-4" size={32} />
          <h3 className="text-xl text-white mb-2">Recovery Tracking</h3>
          <p className="text-gray-400 text-sm">Log your daily progress and receive AI-guided interventions.</p>
        </div>
        <div className="glass-panel p-6">
          <ShieldCheck className="text-teal-400 mb-4" size={32} />
          <h3 className="text-xl text-white mb-2">Expert Connect</h3>
          <p className="text-gray-400 text-sm">Escalate to certified sleep specialists when you need professional care.</p>
        </div>
      </div>
    </div>
  );
}
