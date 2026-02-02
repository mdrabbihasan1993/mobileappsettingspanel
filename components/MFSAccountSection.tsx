
import React, { useState } from 'react';
import { Smartphone, CheckCircle2, Wallet, AlertCircle, Save } from 'lucide-react';
import { OTPVerificationOverlay } from './OTPVerificationOverlay';

interface MFSState {
  value: string;
  error: string;
}

export const MFSAccountSection: React.FC = () => {
  const [accounts, setAccounts] = useState<Record<string, MFSState>>({
    bkash: { value: '', error: '' },
    nagad: { value: '', error: '' },
    rocket: { value: '', error: '' }
  });
  const [showOTP, setShowOTP] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const validPrefixes = ['013', '014', '015', '016', '017', '018', '019'];

  const getValidationError = (id: string, val: string): string => {
    if (!val) return '';
    if (val.length >= 3) {
      const prefix = val.substring(0, 3);
      if (!validPrefixes.includes(prefix)) {
        return 'Invalid operator prefix (Use 013-019)';
      }
    }
    return ''; 
  };

  const handleInputChange = (id: string, val: string) => {
    const maxLen = id === 'rocket' ? 12 : 11;
    const cleanVal = val.replace(/\D/g, '');
    if (cleanVal.length > maxLen) return;
    const error = getValidationError(id, cleanVal);
    setAccounts(prev => ({
      ...prev,
      [id]: { value: cleanVal, error }
    }));
  };

  const handleSaveClick = () => {
    let globalError = false;
    const newAccounts = { ...accounts };
    let hasValue = false;

    Object.keys(newAccounts).forEach(id => {
      const acc = newAccounts[id];
      if (!acc.value) return; 
      
      hasValue = true;
      const targetLength = id === 'rocket' ? 12 : 11;
      
      if (acc.value.length !== targetLength) {
        acc.error = `Must be exactly ${targetLength} digits`;
        globalError = true;
      } else if (!validPrefixes.includes(acc.value.substring(0, 3))) {
        acc.error = 'Invalid operator prefix';
        globalError = true;
      }
    });

    setAccounts(newAccounts);

    if (!hasValue) {
      alert('Please enter at least one MFS number to save.');
      return;
    }

    if (!globalError) {
      setShowOTP(true);
    }
  };

  const handleVerified = () => {
    setShowOTP(false);
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('MFS Account information updated successfully!');
    }, 1200);
  };

  const mfsList = [
    { 
      id: 'bkash', 
      name: 'bKash', 
      icon: <Wallet className="w-8 h-8 text-pink-500" />,
      bgColor: 'bg-pink-50',
      length: 11
    },
    { 
      id: 'nagad', 
      name: 'Nagad', 
      icon: <Wallet className="w-8 h-8 text-orange-500" />,
      bgColor: 'bg-orange-50',
      length: 11
    },
    { 
      id: 'rocket', 
      name: 'Rocket', 
      icon: <Wallet className="w-8 h-8 text-purple-600" />,
      bgColor: 'bg-purple-50',
      length: 12
    }
  ];

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
          <h2 className="text-sm font-bold text-brand-dark flex items-center gap-2">
            <Smartphone size={18} className="text-brand-orange" />
            MFS (Mobile Financial Services)
          </h2>
        </div>
        
        <div className="p-5 space-y-6">
          {mfsList.map((mfs) => {
            const acc = accounts[mfs.id];
            const isComplete = acc.value.length === mfs.length && !acc.error;
            
            return (
              <div key={mfs.id} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-brand-orange/30">
                <div className={`w-12 h-12 shrink-0 ${mfs.bgColor} rounded-xl flex items-center justify-center shadow-inner`}>
                  <div className="scale-75">{mfs.icon}</div>
                </div>
                
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-brand-dark text-sm">{mfs.name}</h4>
                    {isComplete && <CheckCircle2 size={14} className="text-green-500" />}
                  </div>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    value={acc.value}
                    onChange={(e) => handleInputChange(mfs.id, e.target.value)}
                    placeholder={`01XXXXXXXXX${mfs.id === 'rocket' ? 'X' : ''}`}
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-xl outline-none font-bold text-sm transition-all placeholder:text-slate-300 placeholder:font-normal ${
                      acc.error 
                        ? 'border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                        : isComplete 
                          ? 'border-green-200 focus:border-green-500 text-green-700'
                          : 'border-slate-100 focus:border-brand-orange text-slate-900'
                    }`}
                  />
                  {acc.error && (
                    <div className="flex items-center gap-1 text-red-500 text-[10px] font-bold mt-1">
                      <AlertCircle size={12} />
                      {acc.error}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="pt-4 border-t border-slate-50 space-y-6">
            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Validation Requirements:</p>
              <div className="text-[11px] text-slate-400 font-medium leading-relaxed">
                <p>• Numbers must start with: 013, 014, 015, 016, 017, or 019.</p>
                <p>• bKash/Nagad: 11 digits. Rocket: 12 digits.</p>
              </div>
            </div>

            <button 
              onClick={handleSaveClick}
              disabled={isSaving}
              className="w-full py-4 bg-white border border-slate-200 text-[#1a3762] font-black rounded-2xl shadow-sm hover:border-brand-orange hover:text-brand-orange transition-all active:scale-[0.98] disabled:opacity-70 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                   <Loader2 size={16} className="animate-spin" />
                   Saving...
                </span>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save MFS Settings</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <OTPVerificationOverlay 
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleVerified}
        title="Verify MFS Update"
      />
    </>
  );
};

// Helper for the loading spinner
const Loader2 = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
