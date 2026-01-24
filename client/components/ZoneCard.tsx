
import React from 'react';
import { Zone } from '../types';

interface ZoneCardProps {
  zone: Zone;
  onClick: () => void;
  isSelected: boolean;
}

export const ZoneCard: React.FC<ZoneCardProps> = ({ zone, onClick, isSelected }) => {
  const { score, builder_tag } = zone.ai_analysis.development_potential;
  
  return (
    <button
      onClick={onClick}
      className={`w-full text-left transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform rounded-2xl p-5 border group ${
        isSelected 
          ? 'bg-white border-indigo-500 shadow-xl ring-4 ring-indigo-500/10 -translate-y-1 z-10 scale-[1.02]' 
          : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-0.5'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 mr-2">
          <h3 className={`text-lg font-bold transition-colors duration-300 ${isSelected ? 'text-indigo-600' : 'text-slate-800'}`}>
            {zone.zoneName}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {zone.ai_analysis.zone_classification}
            </span>
            <span className="text-slate-300">•</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${isSelected ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 bg-slate-100'}`}>
              {zone.sub_zones.length} AREAS
            </span>
          </div>
        </div>
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-white font-bold text-lg score-gradient shadow-md transition-transform duration-500 group-hover:scale-110 ${isSelected ? 'rotate-3' : ''}`}>
          {score}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-tight group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
            {builder_tag}
          </span>
          {zone.ai_analysis.development_potential.builder_friendly && (
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-[10px] font-bold uppercase tracking-tight animate-pulse">
              Builder Friendly
            </span>
          )}
        </div>
        
        <p className={`text-sm leading-relaxed italic transition-colors ${isSelected ? 'text-slate-600' : 'text-slate-400'}`}>
          "{zone.ai_analysis.analysis_summary.why_this_state}"
        </p>
      </div>
    </button>
  );
};
