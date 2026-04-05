import React, { useState } from 'react';
import doctorsData from '../data/doctors.json';
import { MapPin, Phone, Mail, Video, UserRound } from 'lucide-react';

export default function Doctors() {
  const [filterCity, setFilterCity] = useState('All');
  const [virtualOnly, setVirtualOnly] = useState(false);

  const cities = ['All', ...new Set(doctorsData.map(d => d.city))];

  const filteredDoctors = doctorsData.filter(doc => {
    if (filterCity !== 'All' && doc.city !== filterCity) return false;
    if (virtualOnly && !doc.virtual_consult) return false;
    return true;
  });

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="mb-8 md:flex justify-between items-end">
        <div>
          <h1 className="text-4xl text-white mb-2">Find a Sleep Specialist</h1>
          <p className="text-gray-400">Connect with top somnologists and sleep experts across India.</p>
        </div>
        
        <div className="mt-6 md:mt-0 flex gap-4">
          <select 
            className="bg-navy-800 border border-navy-700 text-white text-sm rounded-xl px-4 py-2 focus:ring-teal-500 focus:border-teal-500"
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          >
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
          
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input 
              type="checkbox" 
              checked={virtualOnly}
              onChange={(e) => setVirtualOnly(e.target.checked)}
              className="rounded bg-navy-800 border-navy-700 text-teal-500 focus:ring-teal-500/50 w-4 h-4"
            />
            Virtual Consult Only
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="glass-panel p-6 flex flex-col group relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all"></div>
            
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-navy-700 flex items-center justify-center text-teal-400">
                <UserRound size={24} />
              </div>
              {doc.virtual_consult && (
                <span className="inline-flex items-center gap-1 text-xs font-mono bg-lavender-500/20 text-lavender-300 px-2 py-1 rounded-full border border-lavender-500/30">
                  <Video size={12} /> Virtual
                </span>
              )}
            </div>
            
            <h3 className="text-xl text-white mb-1">{doc.name}</h3>
            <p className="text-teal-400 text-sm font-medium mb-3">{doc.specialty}</p>
            
            <div className="space-y-2 mb-6">
              <p className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={16} /> {doc.clinic}, {doc.city}
              </p>
              <p className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={16} /> {doc.phone}
              </p>
              <p className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} /> {doc.email}
              </p>
            </div>
            
            <div className="mt-auto pt-4 border-t border-navy-700 flex gap-2">
              {doc.virtual_consult && (
                <button className="flex-1 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 py-2 rounded-lg text-sm font-medium transition-colors">
                  Book Virtual
                </button>
              )}
              <button className="flex-1 bg-navy-700 hover:bg-navy-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Call Clinic
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredDoctors.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No doctors found matching your criteria.
        </div>
      )}
    </div>
  );
}
