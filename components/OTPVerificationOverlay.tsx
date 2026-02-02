
import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, X, Loader2, ArrowRight } from 'lucide-react';

interface OTPVerificationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  title?: string;
}

export const OTPVerificationOverlay: React.FC<OTPVerificationOverlayProps> = ({ 
  isOpen, 
  onClose, 
  onVerify,
  title = "Verify Update"
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) return;
    
    setIsVerifying(true);
    // Simulated verification logic (accepting 123456 or any 6 digits for demo)
    setTimeout(() => {
      setIsVerifying(false);
      onVerify();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          
          <h2 className="text-2xl font-black text-brand-dark mb-2">{title}</h2>
          <p className="text-slate-500 text-sm font-medium mb-8">
            A 6-digit verification code has been sent to your registered mobile number <span className="font-bold text-brand-dark">017***344</span>.
          </p>

          <div className="flex justify-center gap-2 mb-8">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => inputRefs.current[idx] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 bg-slate-50 border-2 border-slate-200 rounded-xl text-center text-xl font-black text-brand-dark outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/5 transition-all"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={otp.join('').length < 6 || isVerifying}
            className="w-full py-4 bg-brand-dark text-white font-black rounded-2xl shadow-xl hover:shadow-brand-dark/20 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
          >
            {isVerifying ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span>Verify & Confirm Update</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>

          <p className="mt-6 text-xs text-slate-400 font-medium">
            Didn't receive code? <button className="text-brand-orange font-bold hover:underline">Resend OTP</button>
          </p>
        </div>
      </div>
    </div>
  );
};
