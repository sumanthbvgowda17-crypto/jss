import React from 'react';
import { Info, Shield, BrainCircuit } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in relative">
       {/* Background styling */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-white mb-4">About SleepSense AI</h1>
        <p className="text-xl text-gray-400 font-light">Combining artificial intelligence with somnology to help you understand your sleep.</p>
      </div>

      <div className="space-y-8">
        <div className="glass-panel p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center">
              <BrainCircuit size={24} />
            </div>
            <h2 className="text-2xl text-white">How Our AI Works</h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4">
            SleepSense utilizes a rule-based inference engine combined with advanced Large Language Models (LLMs) to analyze your reported symptoms against an extensive, clinically-curated database of sleep disorders.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Severity scores, concurrent symptoms, and historical timeline markers are weighted to predict the likelihood of specific disorders, ranging from transient insomnia to obstructive sleep apnea.
          </p>
        </div>

        <div className="glass-panel p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-lavender-500/20 text-lavender-400 rounded-xl flex items-center justify-center">
              <Shield size={24} />
            </div>
            <h2 className="text-2xl text-white">Medical Disclaimer</h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4">
            The insights provided by SleepSense AI are for informational and educational purposes only. This tool does not provide definitive medical diagnoses, treatment plans, or professional clinical advice.
          </p>
          <p className="text-gray-300 leading-relaxed font-semibold text-teal-100">
            Always consult with a qualified healthcare provider or a certified sleep specialist before making any medical decisions or changing your treatment regimen.
          </p>
        </div>
      </div>
    </div>
  );
}
