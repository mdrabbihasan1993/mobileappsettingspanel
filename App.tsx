
import React, { useState } from 'react';
import { NAVIGATION_ITEMS } from './constants';
import { BusinessInfoSection } from './components/BusinessInfoSection';
import { OwnerInfoSection } from './components/OwnerInfoSection';
import { PickupMethodSection } from './components/PickupMethodSection';
import { PaymentMethodSection } from './components/PaymentMethodSection';
import { BankAccountSection } from './components/BankAccountSection';
import { MFSAccountSection } from './components/MFSAccountSection';
import { AIAssistantSection } from './components/AIAssistantSection';
import { Settings, ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('settings');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 140; // Height of header + nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center font-['Inter']">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-[480px] bg-[#f8fafc] min-h-screen flex flex-col shadow-2xl shadow-slate-200 relative">
        
        {/* Sticky Header Group */}
        <div className="sticky top-0 z-50 bg-[#f8fafc]/90 backdrop-blur-lg border-b border-slate-100 shrink-0">
          {/* Main Title Bar */}
          <header className="px-6 py-4 flex items-center gap-4">
            <button className="p-2 hover:bg-white rounded-full transition-colors shadow-sm border border-slate-50">
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <div>
              <h1 className="text-lg font-black text-[#1a3762] tracking-tight leading-none">Settings</h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Merchant Profile</p>
            </div>
            <div className="ml-auto">
               <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-slate-50 flex items-center justify-center text-brand-orange">
                  <Settings size={20} />
               </div>
            </div>
          </header>

          {/* Fixed Navigation Pills (Based on Screenshot) */}
          <div className="px-4 pb-4 overflow-x-auto no-scrollbar flex gap-3">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex-none px-5 py-2.5 bg-white border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] text-slate-600 rounded-full whitespace-nowrap text-[13px] font-bold hover:border-brand-orange/30 hover:text-brand-orange transition-all active:scale-95"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 p-5 space-y-6 pb-32">
          <div className="space-y-10">
            {/* Business Info Section */}
            <section id="business" className="scroll-mt-40">
              <BusinessInfoSection />
            </section>

            {/* Owner Info Section */}
            <section id="owner" className="scroll-mt-40">
              <OwnerInfoSection />
            </section>

            {/* Pickup Method Section */}
            <section id="pickup" className="scroll-mt-40">
              <PickupMethodSection />
            </section>

            {/* Payment Method Section */}
            <section id="payment" className="scroll-mt-40">
              <PaymentMethodSection />
            </section>

            {/* Bank Account Section */}
            <section id="bank" className="scroll-mt-40">
              <BankAccountSection />
            </section>

            {/* MFS Account Section */}
            <section id="mfs" className="scroll-mt-40">
              <MFSAccountSection />
            </section>

            {/* AI Assistant Section */}
            <section id="ai-assistant" className="scroll-mt-40">
              <AIAssistantSection />
            </section>
          </div>

          <footer className="py-12 text-center opacity-40">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">End of Settings</p>
            <div className="mt-4 flex justify-center gap-4">
               <div className="w-1 h-1 rounded-full bg-slate-400"></div>
               <div className="w-1 h-1 rounded-full bg-slate-400"></div>
               <div className="w-1 h-1 rounded-full bg-slate-400"></div>
            </div>
          </footer>
        </main>

        {/* Bottom Tab Bar */}
        <nav className="fixed bottom-0 max-w-[480px] w-full bg-white/90 backdrop-blur-md border-t border-slate-100 flex items-center justify-around py-4 px-6 z-50 shadow-[0_-10px_25px_rgba(0,0,0,0.03)] rounded-t-[32px]">
           <button className="flex flex-col items-center gap-1.5 text-slate-400 transition-colors">
              <div className="w-5 h-5 bg-slate-100 rounded-md"></div>
              <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
           </button>
           <button className="flex flex-col items-center gap-1.5 text-brand-orange animate-pulse-slow">
              <Settings size={20} />
              <span className="text-[9px] font-black uppercase tracking-tighter">Settings</span>
           </button>
           <button className="flex flex-col items-center gap-1.5 text-slate-400 transition-colors">
              <div className="w-5 h-5 bg-slate-100 rounded-md"></div>
              <span className="text-[9px] font-black uppercase tracking-tighter">Profile</span>
           </button>
        </nav>
      </div>
    </div>
  );
};

export default App;
