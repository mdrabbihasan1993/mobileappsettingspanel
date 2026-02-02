
import React, { useState } from 'react';
import { Building2, ChevronRight, Lock, Copy, Check } from 'lucide-react';

export const BusinessInfoSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const companyName = "Vertex Global Logistics";

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(companyName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Organization</h3>
      </div>
      
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 cursor-pointer hover:border-brand-orange/20"
      >
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
              <Building2 size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Business Information</h4>
              <p className="text-[11px] text-slate-400 font-medium">Click to view registration info</p>
            </div>
          </div>
          <ChevronRight 
            size={18} 
            className={`text-slate-300 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} 
          />
        </div>

        {isExpanded && (
          <div className="px-5 pb-6 animate-in slide-in-from-top-2 duration-300">
            <div className="h-px bg-slate-50 mb-6"></div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Company Name
                </label>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100">
                  <Lock size={10} className="text-slate-300" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Settled</span>
                </div>
              </div>

              <div className="p-4 bg-[#f8fafc] rounded-2xl border border-slate-100 flex items-center justify-between group">
                <span className="text-base font-black text-[#1a3762] tracking-tight truncate mr-4">
                  {companyName}
                </span>
                <button 
                  onClick={handleCopy}
                  className="shrink-0 p-2 bg-white text-slate-400 hover:text-brand-orange rounded-xl shadow-sm border border-slate-50 transition-all"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
              </div>

              <div className="flex items-center gap-2 mt-4 px-1">
                <div className="w-1 h-1 rounded-full bg-brand-orange"></div>
                <p className="text-[10px] text-slate-400 font-medium italic">
                  Legal name verified from Trade License.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
