import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  ShieldAlert,
  Smartphone,
  CheckCircle2,
  Save
} from 'lucide-react';
import { PrivacySettings } from '../types.js';

interface SettingsViewProps {
  privacy: PrivacySettings;
  onUpdatePrivacy: (updates: Partial<PrivacySettings>) => void;
  onShowToast: (title: string, message: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  privacy,
  onUpdatePrivacy,
  onShowToast
}) => {
  const [userName, setUserName] = useState('Anika Ray');
  const [userPhone, setUserPhone] = useState('+91 98451 10022');
  const [userEmail, setUserEmail] = useState('anika.ray@demo.user');
  const [notifySms, setNotifySms] = useState(true);
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifyCall, setNotifyCall] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Profile Updated', 'User safety credentials updated successfully.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <SettingsIcon className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-white">System Settings & Safety Profile</h1>
            <p className="text-xs text-slate-400">
              Configure personal telemetry defaults, notification channels, and emergency escalation policies.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Safety Profile */}
        <form
          onSubmit={handleSaveProfile}
          className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-4"
        >
          <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <User className="w-4 h-4 text-red-400" />
            Protected User Profile
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-slate-800 text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">Primary Phone Number</label>
              <input
                type="tel"
                value={userPhone}
                onChange={e => setUserPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-slate-800 text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">Emergency Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-slate-800 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-900/30 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Information</span>
            </button>
          </div>
        </form>

        {/* Notification Channel Preferences */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <Bell className="w-4 h-4 text-red-400" />
            Alert Dispatch Preferences
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#09090b] border border-slate-800">
              <div>
                <span className="font-bold text-white block">Stealth SMS Alerts</span>
                <span className="text-[11px] text-slate-400">
                  Instant SMS with live GPS tracking link dispatched to guardian
                </span>
              </div>
              <button
                type="button"
                onClick={() => setNotifySms(!notifySms)}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  notifySms ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {notifySms ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#09090b] border border-slate-800">
              <div>
                <span className="font-bold text-white block">Push Notification & Alarm</span>
                <span className="text-[11px] text-slate-400">
                  Guardian device rings with high-priority critical breakthrough alert
                </span>
              </div>
              <button
                type="button"
                onClick={() => setNotifyPush(!notifyPush)}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  notifyPush ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {notifyPush ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#09090b] border border-slate-800">
              <div>
                <span className="font-bold text-white block">Automated Voice Dispatch</span>
                <span className="text-[11px] text-slate-400">
                  Autonomous priority IVR call placed if SMS is unread for 90 seconds
                </span>
              </div>
              <button
                type="button"
                onClick={() => setNotifyCall(!notifyCall)}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  notifyCall ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {notifyCall ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
