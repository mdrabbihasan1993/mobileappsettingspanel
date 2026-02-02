
import React, { useState } from 'react';
import { CreditCard, Landmark, Wallet, CheckCircle2, ChevronRight } from 'lucide-react';
import { OTPVerificationOverlay } from './OTPVerificationOverlay';

export const PaymentMethodSection: React.FC = () => {
  const [defaultPayment, setDefaultPayment] = useState('bank');
  const [isSaving, setIsSaving] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const methods = [
    { id: 'bank', name: 'Bank', icon: <Landmark size={18} /> },
    { id: 'bkash', name: 'bKash', icon: <Wallet size={18} className="text-pink-500" /> },
    { id: 'nagad', name: 'Nagad', icon: <Wallet size={18} className="text-orange-500" /> },
    { id: 'rocket', name: 'Rocket', icon: <Wallet size={18} className="text-purple-600" /> },
  ];

  const handleUpdateClick = () => {
    setShowOTP(true);
  };

  const handleVerified = () => {
    setShowOTP(false);
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Payment settings saved successfully!');
    }, 800);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Payouts</h3>
        </div>

        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-5 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Primary Payout Method</h4>
              <p className="text-[11px] text-slate-400 font-medium">Where you receive your funds</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => setDefaultPayment(method.id)}
                className={`relative flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200 ${
                  defaultPayment === method.id 
                  ? 'border-brand-orange bg-brand-orange/5 ring-4 ring-brand-orange/5' 
                  : 'border-slate-50 bg-slate-50/50 hover:border-slate-200'
                }`}
              >
                <div className={`shrink-0 ${defaultPayment === method.id ? 'text-brand-orange' : 'text-slate-400'}`}>
                  {method.icon}
                </div>
                <span className={`font-bold text-[11px] truncate ${defaultPayment === method.id ? 'text-brand-orange' : 'text-slate-600'}`}>
                  {method.name}
                </span>
                {defaultPayment === method.id && (
                  <div className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white rounded-full p-0.5 shadow-sm border-2 border-white">
                    <CheckCircle2 size={10} />
                  </div>
                )}
              </button>
            ))}
          </div>

          <button 
            onClick={handleUpdateClick}
            disabled={isSaving}
            className="w-full py-4 bg-white border border-slate-200 text-[#1a3762] font-black rounded-2xl shadow-sm hover:border-brand-orange hover:text-brand-orange transition-all active:scale-[0.98] disabled:opacity-70 text-xs uppercase tracking-widest"
          >
            {isSaving ? 'Saving...' : 'Confirm Change'}
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
