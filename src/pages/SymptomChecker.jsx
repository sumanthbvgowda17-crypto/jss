import React, { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import disordersData from '../data/disorders.json';

const SYMPTOMS = [
  "sleep onset issues",
  "frequent waking",
  "snoring",
  "daytime fatigue",
  "sleep paralysis",
  "restless legs",
  "nightmares",
  "circadian disruption",
  "excessive sleepiness"
];

export default function SymptomChecker() {
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState({});
  const [diagnosis, setDiagnosis] = useState(null);

  const handleSliderChange = (symptom, value) => {
    setSymptoms(prev => ({
      ...prev,
      [symptom]: parseInt(value)
    }));
  };

  const analyzeSymptoms = () => {
    let topMatch = null;
    let highestScore = 0;

    disordersData.forEach(disorder => {
      let score = 0;
      disorder.symptoms.forEach(sym => {
        if (symptoms[sym]) {
          score += symptoms[sym]; // add severity rating (1-10)
        }
      });

      if (score > highestScore) {
        highestScore = score;
        topMatch = disorder;
      }
    });

    if (topMatch && highestScore > 0) {
      let severity = "Mild";
      if (highestScore >= topMatch.severity_thresholds.severe) severity = "Severe";
      else if (highestScore >= topMatch.severity_thresholds.moderate) severity = "Moderate";

      // Mock confidence based on total possible vs actual
      const confidence = Math.min(Math.round((highestScore / (topMatch.symptoms.length * 10)) * 100) + 15, 98);

      setDiagnosis({
        ...topMatch,
        severity,
        confidence,
        score: highestScore
      });
    } else {
      setDiagnosis({
        name: "Inconclusive",
        confidence: 0,
        severity: "Unknown",
        description: "Your symptoms don't strongly match our specific disorder profiles. We still recommend improving general sleep hygiene or consulting a doctor if issues persist.",
        treatments: ["General Sleep Hygiene", "Maintain consistent schedule", "Reduce screen time before bed"],
        recovery_timeline: "Varies"
      });
    }
    setStep(2);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl text-white mb-2">AI Symptom Checker</h1>
        <p className="text-gray-400">Describe what you're experiencing, and our agent will analyze potential causes.</p>
      </div>

      {step === 1 && (
        <div className="glass-panel p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-navy-700">
            <Activity className="text-teal-400" />
            <h2 className="text-2xl text-white m-0">Symptom Severity (1-10)</h2>
          </div>
          
          <div className="space-y-6">
            {SYMPTOMS.map(sym => (
              <div key={sym} className="group">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-300 capitalize text-sm font-medium tracking-wide">
                    {sym.replace('-', ' ')}
                  </label>
                  <span className="font-mono text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded">
                    {symptoms[sym] || 0}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={symptoms[sym] || 0}
                  onChange={(e) => handleSliderChange(sym, e.target.value)}
                  className="w-full h-2 bg-navy-900 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <button 
              onClick={analyzeSymptoms}
              className="btn-primary inline-flex items-center gap-2"
              disabled={Object.values(symptoms).every(v => v === 0)}
            >
              Analyze Symptoms <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && diagnosis && (
        <div className="glass-panel p-6 md:p-8 animate-slide-up relative overflow-hidden">
          {/* Subtle glow based on severity */}
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none ${
            diagnosis.severity === 'Severe' ? 'bg-red-500' :
            diagnosis.severity === 'Moderate' ? 'bg-yellow-500' : 'bg-teal-500'
          }`}></div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h4 className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-2">Analysis Complete</h4>
              <h2 className="text-4xl text-white mb-4">{diagnosis.name}</h2>
              <p className="text-gray-300 mb-6 leading-relaxed bg-navy-900/50 p-4 rounded-xl border border-navy-700">
                {diagnosis.description}
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h5 className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Clinical & Lifestyle Actions</h5>
                  <ul className="space-y-2">
                    {diagnosis.treatments?.map((t, i) => (
                      <li key={`treat-${i}`} className="flex items-start gap-2 text-gray-200">
                        <CheckCircle2 size={18} className="text-lavender-400 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {diagnosis.yoga_remedies && (
                  <div>
                    <h5 className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Yoga & Physical Exercises</h5>
                    <ul className="space-y-2 bg-teal-900/20 p-3 rounded-lg border border-teal-500/20">
                      {diagnosis.yoga_remedies.map((t, i) => (
                        <li key={`yoga-${i}`} className="flex items-start gap-2 text-teal-100">
                          <Activity size={18} className="text-teal-400 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {diagnosis.modern_remedies && (
                  <div>
                    <h5 className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Modern Alternative Remedies</h5>
                    <ul className="space-y-2 bg-navy-800/80 p-3 rounded-lg border border-navy-600">
                      {diagnosis.modern_remedies.map((t, i) => (
                        <li key={`mod-${i}`} className="flex items-start gap-2 text-gray-300">
                          <ChevronRight size={18} className="text-blue-400 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2">
                  <h5 className="text-gray-400 text-sm mb-1 uppercase tracking-wider border-t border-navy-700/50 pt-4">Estimated Recovery</h5>
                  <p className="text-gray-200 font-mono">{diagnosis.recovery_timeline}</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-64 flex flex-col gap-4">
              <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Confidence</span>
                <span className="text-4xl font-serif text-white">{diagnosis.confidence}%</span>
              </div>
              
              <div className={`glass-panel p-4 flex flex-col items-center justify-center text-center border ${
                diagnosis.severity === 'Severe' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' :
                diagnosis.severity === 'Moderate' ? 'border-yellow-500/50' : 'border-teal-500/50'
              }`}>
                <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Severity</span>
                <span className={`text-xl font-bold uppercase tracking-widest ${
                  diagnosis.severity === 'Severe' ? 'text-red-400' :
                  diagnosis.severity === 'Moderate' ? 'text-yellow-400' : 'text-teal-400'
                }`}>{diagnosis.severity}</span>
              </div>

              {diagnosis.warning_flag && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex gap-3 text-red-200 text-sm">
                  <AlertCircle size={20} className="shrink-0 text-red-400" />
                  <p>Strongly advised to consult a specialist.</p>
                </div>
              )}

              <button 
                onClick={() => setStep(1)}
                className="btn-secondary w-full mt-auto"
              >
                Re-take Check
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
