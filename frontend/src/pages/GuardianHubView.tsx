import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Phone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Trash2,
  Edit2,
  ExternalLink,
  MessageSquare,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { GuardianContact, Incident } from '../types.js';

interface GuardianHubViewProps {
  guardians: GuardianContact[];
  activeIncidents: Incident[];
  onAddGuardian: (guardian: Omit<GuardianContact, 'id'>) => void;
  onDeleteGuardian: (id: string) => void;
  onOpenIncidentDetail: (id: string) => void;
  onNavigate: (tab: string) => void;
}

export const GuardianHubView: React.FC<GuardianHubViewProps> = ({
  guardians,
  activeIncidents,
  onAddGuardian,
  onDeleteGuardian,
  onOpenIncidentDetail,
  onNavigate
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Parent / Mother');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);

  const activeSOS = activeIncidents.find(i => i.status === 'Active');

  const handleSaveGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide name and phone number.');
      return;
    }
    onAddGuardian({
      name,
      relationship,
      phone,
      email,
      isConnected: true,
      priority: guardians.length === 0 ? 'Primary' : 'Secondary'
    });
    setName('');
    setPhone('');
    setEmail('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-white">Guardian Hub & Responder Console</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Circle Active
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Dedicated responder console allowing trusted contacts to monitor real-time safety telemetry, acknowledge alerts, and dispatch assistance.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30 transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Trusted Guardian</span>
        </button>
      </div>

      {/* Prominent Emergency Card (Section 16 requirement) */}
      {activeSOS ? (
        <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/40 shadow-2xl shadow-red-950/40 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-red-600 text-white text-xl animate-bounce">
                🚨
              </span>
              <div>
                <h2 className="text-base font-black text-white tracking-wide">
                  ACTIVE EMERGENCY INCIDENT ({activeSOS.id})
                </h2>
                <p className="text-xs text-red-200">
                  User triggered Silent Emergency Beacon • Priority Responder Protocol
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow">
              {activeSOS.riskScore}% {activeSOS.riskLevel}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
              <span className="text-slate-400 block mb-1">Live Coordinates</span>
              <span className="font-mono font-bold text-slate-100">
                {activeSOS.location.latitude.toFixed(4)}°N, {activeSOS.location.longitude.toFixed(4)}°E
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
              <span className="text-slate-400 block mb-1">Guardian Notification</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> SENT (Prototype SMS)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
              <span className="text-slate-400 block mb-1">Evidence Captured</span>
              <span className="font-bold text-slate-200 font-mono">
                {activeSOS.evidenceIds.length} Cryptographic Records
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
              <span className="text-slate-400 block mb-1">Responder Status</span>
              <span className="font-bold text-amber-400">
                {acknowledged ? '✓ ACKNOWLEDGED' : '⏳ IN PROGRESS'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => onNavigate('location')}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition"
            >
              View Location Map
            </button>
            <button
              onClick={() => onOpenIncidentDetail(activeSOS.id)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              View Incident Dossier
            </button>
            <button
              onClick={() => onNavigate('evidence')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              Inspect Evidence
            </button>
            <button
              onClick={() => setAcknowledged(true)}
              disabled={acknowledged}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                acknowledged
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
              }`}
            >
              {acknowledged ? '✓ Alert Acknowledged' : 'Acknowledge Alert'}
            </button>
          </div>
        </div>
      ) : null}

      {/* Add Guardian Form Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleSaveGuardian}
          className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Add Trusted Guardian Contact</h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Guardian Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Maya Patel"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-slate-800 text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Relationship</label>
              <input
                type="text"
                placeholder="e.g. Mother, Sister, Friend, Partner"
                value={relationship}
                onChange={e => setRelationship(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-slate-800 text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Emergency Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 98450 99887"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-slate-800 text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Email Address (Optional)</label>
              <input
                type="email"
                placeholder="guardian@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090b] border border-slate-800 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-900/30 transition"
            >
              Save Guardian Contact
            </button>
          </div>
        </form>
      )}

      {/* Guardian Contacts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guardians.map(g => (
          <div
            key={g.id}
            className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-lg space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-bold text-sm">
                  {g.name[0]}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {g.name}
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {g.priority}
                    </span>
                  </h3>
                  <span className="text-xs text-slate-400">{g.relationship}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Connected
                </span>
                {guardians.length > 1 && (
                  <button
                    onClick={() => onDeleteGuardian(g.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition"
                    title="Remove Guardian"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono">{g.phone}</span>
              </div>
              {g.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-mono text-slate-400">{g.email}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Stealth SMS & Push Dispatch: Enabled</span>
              <span className="text-slate-400">Encrypted Channel</span>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Dispatch Log (Section 27 & 47 requirement) */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-bold text-white">Simulated Notification Dispatch Log</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Prototype SMS & Push Preview</span>
        </div>

        <div className="space-y-2.5">
          <div className="p-3.5 rounded-xl bg-[#09090b] border border-slate-800 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-red-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                [SMS DISPATCH PREVIEW] → Priya Sharma (+91 98450 12345)
              </span>
              <span className="text-[10px] font-mono text-slate-500">Delivered</span>
            </div>
            <p className="font-mono text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              🚨 SILENT GUARDIAN ALERT: User emergency SOS triggered near Indiranagar 100ft Road. Live tracking link: https://guardian.demo/live/INC-2026-8941
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#09090b] border border-slate-800 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                [PUSH NOTIFICATION] → Ananya Sharma (+91 98450 67890)
              </span>
              <span className="text-[10px] font-mono text-slate-500">Delivered</span>
            </div>
            <p className="font-mono text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              Silent Guardian AI: Real-time telemetry lock engaged. Risk score: 87%. Immediate contact recommended.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 italic">
          * Notifications are simulated locally for hackathon demonstration. No actual telecom charges or real cellular carrier transmissions occur.
        </p>
      </div>
    </div>
  );
};
