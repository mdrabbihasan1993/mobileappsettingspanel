
import React, { useState, useRef, useEffect } from 'react';
import { Truck, Plus, MapPin, Phone, Store, Check, MoreVertical, Loader2, Search, ChevronDown, X } from 'lucide-react';
import { DIVISIONS, DISTRICTS, AREAS } from '../constants';
import { OTPVerificationOverlay } from './OTPVerificationOverlay';

interface SearchableDropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ label, placeholder, options, value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-1 relative" ref={dropdownRef}>
      <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">{label}</label>
      <div 
        className={`relative flex items-center bg-slate-50 border rounded-xl transition-all h-11 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-slate-300'} ${isOpen ? 'border-brand-orange ring-4 ring-brand-orange/5 bg-white' : 'border-slate-200'}`}
      >
        <div className="pl-3 text-slate-400">
          <Search size={14} />
        </div>
        <input 
          disabled={disabled}
          type="text" 
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => !disabled && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-2 py-2 bg-transparent outline-none text-slate-900 font-bold text-sm"
        />
        <button 
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className="pr-3 text-slate-400 hover:text-brand-dark transition-colors"
        >
          <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-[60] top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-48 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-1 duration-200">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setSearch(opt);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-slate-50 ${value === opt ? 'text-brand-orange bg-brand-orange/5' : 'text-slate-700'}`}
              >
                {opt}
                {value === opt && <Check size={14} />}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-xs text-slate-400 italic text-center">
              No results for "{search}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const PickupMethodSection: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  
  const [formData, setFormData] = useState({
    storeName: '',
    phone: '',
    address: '',
    division: '',
    district: '',
    area: ''
  });

  const handleUpdateClick = () => {
    if (!formData.storeName || !formData.phone || !formData.division) {
      alert('Please fill in the mandatory fields.');
      return;
    }
    setShowOTP(true);
  };

  const handleVerified = () => {
    setShowOTP(false);
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowAddForm(false);
      setFormData({ storeName: '', phone: '', address: '', division: '', district: '', area: '' });
      alert('New address information updated successfully!');
    }, 800);
  };

  const availableDistricts = formData.division ? (DISTRICTS[formData.division] || []) : [];
  const availableAreas = formData.district ? (AREAS[formData.district] || AREAS["default"]) : [];

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-dark">Pickup & Return Hubs</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-bold shadow-sm ${showAddForm ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-brand-dark text-white hover:bg-slate-800'}`}
          >
            {showAddForm ? <X size={18} /> : <Plus size={18} />}
            {showAddForm ? 'Close Form' : 'Add New Address'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 animate-in zoom-in-95 duration-200 overflow-visible relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-bold text-brand-dark text-lg leading-tight">Add New Hub</h3>
                <p className="text-xs text-slate-400 font-medium">Register a new store or pickup point</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Store Name *</label>
                  <input 
                    type="text" 
                    value={formData.storeName}
                    onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm focus:ring-4 focus:ring-brand-orange/5 focus:border-brand-orange outline-none transition-all" 
                    placeholder="e.g. Uttara Branch" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Phone Number *</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm focus:ring-4 focus:ring-brand-orange/5 focus:border-brand-orange outline-none transition-all" 
                    placeholder="01XXX-XXXXXX" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Detailed Address *</label>
                <textarea 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl h-20 text-slate-900 font-bold text-sm focus:ring-4 focus:ring-brand-orange/5 focus:border-brand-orange outline-none transition-all resize-none" 
                  placeholder="House, Road, Block, Area description..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SearchableDropdown 
                  label="Division *" 
                  placeholder="Search..." 
                  options={DIVISIONS} 
                  value={formData.division} 
                  onChange={(val) => setFormData({ ...formData, division: val, district: '', area: '' })} 
                />
                
                <SearchableDropdown 
                  label="District *" 
                  placeholder="Search..." 
                  options={availableDistricts} 
                  value={formData.district} 
                  disabled={!formData.division}
                  onChange={(val) => setFormData({ ...formData, district: val, area: '' })} 
                />
                
                <SearchableDropdown 
                  label="Area *" 
                  placeholder="Search..." 
                  options={availableAreas} 
                  value={formData.area} 
                  disabled={!formData.district}
                  onChange={(val) => setFormData({ ...formData, area: val })} 
                />
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[10px] text-slate-400 font-bold uppercase">* Mandatory fields</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowAddForm(false)} 
                  className="px-6 py-2.5 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateClick}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-8 py-2.5 bg-brand-dark text-white font-black rounded-xl shadow-lg hover:shadow-slate-900/20 disabled:opacity-70 transition-all active:scale-95 text-sm"
                >
                  {isSaving && <Loader2 size={16} className="animate-spin" />}
                  {isSaving ? 'Updating...' : 'Save Hub Address'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Addresses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className={`bg-white p-6 rounded-2xl border transition-all group ${i === 1 ? 'border-brand-orange ring-1 ring-brand-orange/10' : 'border-slate-200 hover:border-brand-dark/20'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl transition-colors ${i === 1 ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-brand-dark group-hover:text-white'}`}>
                    <Store size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark leading-tight">{i === 1 ? 'Main Warehouse' : 'Sub Hub DH-1'}</h4>
                    <div className="flex gap-2 mt-1.5">
                      {i === 1 && (
                        <span className="text-[9px] uppercase tracking-wider font-black bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-md border border-brand-orange/20">Default Pickup</span>
                      )}
                      <span className="text-[9px] uppercase tracking-wider font-black bg-brand-dark/10 text-brand-dark px-2 py-0.5 rounded-md border border-brand-dark/20">Default Return</span>
                    </div>
                  </div>
                </div>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400">
                  <MoreVertical size={16} />
                </button>
              </div>
              
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-5 flex justify-center"><Phone size={14} className="text-slate-400" /></div>
                  <span className="text-slate-900 font-bold">+880 1622-334455</span>
                </div>
                <div className="flex items-start gap-3 text-slate-600">
                  <div className="w-5 flex justify-center mt-0.5"><MapPin size={14} className="text-slate-400" /></div>
                  <span className="text-slate-900 font-medium leading-relaxed">H-45, R-12, Sector 07, Uttara, Dhaka-1230</span>
                </div>
              </div>
              
              {i !== 1 && (
                <button 
                  onClick={() => { setShowOTP(true); }}
                  className="w-full mt-5 py-2.5 bg-slate-50 text-slate-600 text-[10px] font-black rounded-xl hover:bg-brand-orange/5 hover:text-brand-orange border border-transparent hover:border-brand-orange/20 transition-all uppercase tracking-widest"
                >
                  Set as Default Pickup
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <OTPVerificationOverlay 
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleVerified}
        title="Verify Hub Changes"
      />
    </>
  );
};
