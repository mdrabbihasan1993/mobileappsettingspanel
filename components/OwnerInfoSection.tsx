
import React, { useState } from 'react';
import { User, Camera, Mail, Phone, Fingerprint, ShieldCheck, Loader2, ChevronRight } from 'lucide-react';
import { OTPVerificationOverlay } from './OTPVerificationOverlay';

export const OwnerInfoSection: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [ownerName, setOwnerName] = useState('Ahsan Habib');

  const handleUpdateClick = () => {
    setShowOTP(true);
  };

  const handleVerified = () => {
    setShowOTP(false);
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Owner info updated!');
    }, 800);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Account</h3>
        </div>

        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-5 space-y-8">
          {/* Profile Row */}
          <div className="flex items-center gap-4">
             <div className="relative group shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahsan" alt="Owner" className="w-full h-full object-cover" />
                </div>
                <button className="absolute -bottom-1 -right-1 p-1.5 bg-brand-orange text-white rounded-lg shadow-md border-2 border-white">
                  <Camera size={12} />
                </button>
              </div>
              <div className="min-w-0">
                <h3 className="font-black text-[#1a3762] text-lg tracking-tight truncate">{ownerName}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Verified Identity</span>
                </div>
              </div>
          </div>

          {/* Mini Form */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Phone size={10} /> Mobile Number
              </label>
              <input 
                type="tel" 
                defaultValue="+880 1711-223344"
                className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-100 rounded-xl text-[#1a3762] font-bold text-sm outline-none focus:border-brand-orange transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Mail size={10} /> Email
              </label>
              <input 
                type="email" 
                defaultValue="owner@vertex.com"
                className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-100 rounded-xl text-[#1a3762] font-bold text-sm outline-none focus:border-brand-orange transition-all"
              />
            </div>
          </div>

          <button 
            onClick={handleUpdateClick}
            disabled={isSaving}
            className="w-full py-4 bg-white border border-slate-200 text-[#1a3762] font-black rounded-2xl shadow-sm hover:border-brand-orange hover:text-brand-orange transition-all active:scale-[0.98] disabled:opacity-70 text-xs uppercase tracking-widest"
          >
            {isSaving ? 'Saving...' : 'Update Details'}
          </button>
        </div>
      </div>

      <OTPVerificationOverlay 
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleVerified}
      />
    </>
  );
};
