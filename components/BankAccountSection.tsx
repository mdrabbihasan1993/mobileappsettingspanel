
import React, { useState, useRef, useEffect } from 'react';
import { Landmark, Save, AlertCircle, Loader2, ChevronDown, Search, Check } from 'lucide-react';
import { OTPVerificationOverlay } from './OTPVerificationOverlay';

const BANGLADESH_BANKS = [
  "Dutch Bangla Bank PLC",
  "Sonali Bank PLC",
  "BRAC Bank PLC",
  "Islami Bank Bangladesh PLC",
  "City Bank PLC",
  "Eastern Bank PLC (EBL)",
  "United Commercial Bank (UCB)",
  "Mutual Trust Bank (MTB)",
  "Prime Bank PLC",
  "Bank Asia PLC",
  "Standard Chartered Bank",
  "HSBC Bangladesh",
  "Pubali Bank PLC",
  "Janat Bank PLC",
  "Agrani Bank PLC",
  "Rupali Bank PLC",
  "Social Islami Bank PLC",
  "Al-Arafah Islami Bank PLC",
  "Mercantile Bank PLC",
  "Southeast Bank PLC",
  "One Bank PLC",
  "National Bank PLC",
  "IFIC Bank PLC",
  "Exim Bank PLC",
  "First Security Islami Bank PLC",
  "Jamuna Bank PLC",
  "NRB Bank",
  "Modhumoti Bank",
  "South Bangla Agriculture & Commerce Bank",
  "Midland Bank",
  "Meghna Bank"
].sort();

export const BankAccountSection: React.FC = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const [bankSearch, setBankSearch] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredBanks = BANGLADESH_BANKS.filter(bank => 
    bank.toLowerCase().includes(bankSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBankDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBank) {
      alert('Please select a bank from the list.');
      return;
    }
    setShowOTP(true);
  };

  const handleVerified = () => {
    setShowOTP(false);
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      alert('Bank account information updated successfully!');
    }, 800);
  };

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank);
    setBankSearch(bank);
    setIsBankDropdownOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#1a3762] flex items-center gap-2">
            <Landmark size={18} className="text-brand-orange" />
            Bank Details
          </h2>
          <span className="text-[9px] font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-md border border-brand-orange/10 uppercase tracking-wider">
            Required
          </span>
        </div>
        
        <div className="p-5 md:p-6 space-y-6">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
            <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
            <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
              Account holder name must match legal records to avoid payout delays.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              {/* Searchable Bank Dropdown */}
              <div className="space-y-1.5 relative" ref={dropdownRef}>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Name of Bank
                </label>
                <div 
                  className={`relative flex items-center bg-[#f8fafc] border rounded-xl transition-all ${isBankDropdownOpen ? 'border-brand-orange ring-4 ring-brand-orange/5' : 'border-slate-100'}`}
                >
                  <div className="pl-4 text-slate-300">
                    <Search size={16} />
                  </div>
                  <input 
                    required
                    type="text" 
                    value={bankSearch}
                    onChange={(e) => {
                      setBankSearch(e.target.value);
                      if (!isBankDropdownOpen) setIsBankDropdownOpen(true);
                    }}
                    onFocus={() => setIsBankDropdownOpen(true)}
                    placeholder="Search bank name..."
                    className="w-full px-3 py-3 bg-transparent outline-none text-[#1a3762] font-bold text-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setIsBankDropdownOpen(!isBankDropdownOpen)}
                    className="pr-4 text-slate-300 hover:text-brand-dark transition-colors"
                  >
                    <ChevronDown size={18} className={`transition-transform duration-200 ${isBankDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {isBankDropdownOpen && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl max-h-60 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
                    {filteredBanks.length > 0 ? (
                      filteredBanks.map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => handleBankSelect(bank)}
                          className={`w-full flex items-center justify-between px-5 py-3 text-left text-sm font-medium transition-colors hover:bg-slate-50 ${selectedBank === bank ? 'text-brand-orange bg-brand-orange/5' : 'text-slate-700'}`}
                        >
                          {bank}
                          {selectedBank === bank && <Check size={16} />}
                        </button>
                      ))
                    ) : (
                      <div className="px-5 py-4 text-xs text-slate-400 italic">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Branch Name
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Uttara Branch"
                  className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-100 rounded-xl text-[#1a3762] font-bold text-sm outline-none focus:border-brand-orange transition-all"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Account Holder Name
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="Exact name as on record"
                  className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-100 rounded-xl text-[#1a3762] font-bold text-sm outline-none focus:border-brand-orange transition-all"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    Account Number
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="000.000.000.0000"
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-100 rounded-xl text-[#1a3762] font-bold text-sm outline-none focus:border-brand-orange transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    Routing Number
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="9-digit code"
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-100 rounded-xl text-[#1a3762] font-bold text-sm outline-none focus:border-brand-orange transition-all"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isUpdating}
              className="w-full py-4 bg-white border border-slate-200 text-[#1a3762] font-black rounded-2xl shadow-sm hover:border-brand-orange hover:text-brand-orange transition-all active:scale-[0.98] disabled:opacity-70 text-xs uppercase tracking-widest"
            >
              {isUpdating ? 'Saving...' : 'Update Bank Account'}
            </button>
          </form>
        </div>
      </div>

      <OTPVerificationOverlay 
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleVerified}
        title="Verify Bank Update"
      />
    </>
  );
};
