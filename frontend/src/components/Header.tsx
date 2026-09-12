import React from 'react';
import {
  ShieldAlert,
  Radio,
  MapPin,
  FileText,
  Lock,
  Users,
  Settings,
  PlayCircle,
  HelpCircle,
  Menu,
  X,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onActivateSOS: () => void;
  onSimulateThreat: () => void;
  onResetDemo: () => void;
  activeIncidentsCount: number;
  isThreatActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onActivateSOS,
  onSimulateThreat,
  onResetDemo,
  activeIncidentsCount,
  isThreatActive
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Radio },
    { id: 'intelligence', label: 'AI Intelligence', icon: Sparkles },
    { id: 'location', label: 'Live Location', icon: MapPin },
    {
      id: 'incidents',
      label: 'Incidents',
      icon: FileText,
      badge: activeIncidentsCount > 0 ? activeIncidentsCount : undefined
    },
    { id: 'evidence', label: 'Evidence', icon: Lock },
    { id: 'guardian', label: 'Guardian', icon: Users },
    { id: 'demo', label: 'Demo Mode', icon: PlayCircle, highlight: true },
    { id: 'privacy', label: 'Privacy & AI', icon: Lock },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About', icon: HelpCircle }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Disclaimer Banner */}
      <div className="bg-slate-900/50 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400 text-center flex items-center justify-center gap-2 flex-wrap">
        <span className="font-semibold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/20 text-[10px] uppercase tracking-wider">
          Hackathon Prototype
        </span>
        <span>
          AI threat detection uses controlled/simulated sensor inputs and is not validated real-world crime prediction.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white text-lg shadow-lg shadow-red-900/30 border border-red-500/30">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  Silent Guardian AI
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  System Active
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-500 font-medium">
                AI-Powered Women Safety & Crime Prevention
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Threat Simulation Button */}
            <button
              onClick={onSimulateThreat}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                isThreatActive
                  ? 'bg-red-950/50 border-red-500/40 text-red-300 hover:bg-red-900/50'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <span className="text-sm">🧪</span>
              <span>{isThreatActive ? 'Threat Active (87%)' : 'Simulate Threat'}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={onResetDemo}
              title="Reset state to initial prototype baseline"
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Silent SOS Trigger Button */}
            <button
              onClick={onActivateSOS}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30 border border-red-500/30 transition transform active:scale-95"
            >
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span>Activate Silent SOS</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 border-t border-slate-800/80 py-1.5 overflow-x-auto no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition relative ${
                  isActive
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                    : item.highlight
                    ? 'text-amber-300 hover:bg-amber-500/10 border border-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800/80 py-3 space-y-1 bg-[#09090b]">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  onSimulateThreat();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-semibold"
              >
                <span>🧪</span>
                <span>Simulate Threat</span>
              </button>
              <button
                onClick={() => {
                  onResetDemo();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>
            </div>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                    isActive
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
