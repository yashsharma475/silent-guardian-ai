import React from 'react';
import {
  X,
  ShieldCheck,
  MapPin,
  Clock,
  Lock,
  Users,
  AlertTriangle,
  Radio,
  Share2
} from 'lucide-react';
import { Incident } from '../types.js';

interface IncidentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident | null;
  onResolve: (id: string) => void;
  onMarkFalseAlarm: (id: string) => void;
  onViewEvidence: (evidenceId: string) => void;
}

export const IncidentDetailModal: React.FC<IncidentDetailModalProps> = ({
  isOpen,
  onClose,
  incident,
  onResolve,
  onMarkFalseAlarm,
  onViewEvidence
}) => {
  if (!isOpen || !incident) return null;

  const statusColors = {
    Active: 'bg-red-500/10 text-red-400 border-red-500/20',
    Investigating: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Resolved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'False Alarm': 'bg-slate-800 text-slate-400 border-slate-700'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl bg-[#09090b] border border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900/60 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold">
              #
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-mono">{incident.id}</h2>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                    statusColors[incident.status]
                  }`}
                >
                  {incident.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Created: {new Date(incident.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-slate-500 block mb-1 font-medium">Threat Score</span>
              <p className="text-lg font-bold text-red-400 font-mono">{incident.riskScore}%</p>
              <span className="text-[10px] text-slate-400">{incident.riskLevel} Risk</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-slate-500 block mb-1 font-medium">Guardian Alert</span>
              <p className="text-sm font-bold text-emerald-400 flex items-center gap-1 mt-1">
                <Users className="w-3.5 h-3.5" />
                {incident.guardianStatus}
              </p>
              <span className="text-[10px] text-slate-400">Priya S. (Primary)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-slate-500 block mb-1 font-medium">Evidence Records</span>
              <p className="text-lg font-bold text-slate-200 font-mono">
                {incident.evidenceIds.length} Sealed
              </p>
              <span className="text-[10px] text-slate-400">SHA-256 Verified</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-slate-500 block mb-1 font-medium">GPS Telemetry</span>
              <p className="text-xs font-semibold text-slate-200 mt-1 truncate">
                ±{incident.location.accuracy}m Precision
              </p>
              <span className="text-[10px] text-emerald-400">Live Active</span>
            </div>
          </div>

          {/* Location Details */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Incident Coordinates & Address
              </span>
              <span className="font-mono text-slate-400">
                {incident.location.latitude.toFixed(4)}° N, {incident.location.longitude.toFixed(4)}° E
              </span>
            </div>
            <p className="text-xs text-slate-300 bg-[#09090b] p-2.5 rounded-lg border border-slate-800">
              {incident.location.address}
            </p>
          </div>

          {/* Threat Signals Detected */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Sensor Signals at Trigger Time
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div
                className={`p-2.5 rounded-lg border ${
                  incident.signals.audioDistress
                    ? 'bg-red-950/20 border-red-500/30 text-red-200'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400'
                }`}
              >
                <span className="font-medium block text-[11px]">Audio Frequency</span>
                <span className="font-bold">
                  {incident.signals.audioDistress ? 'Distress Acoustic' : 'Nominal Ambient'}
                </span>
              </div>

              <div
                className={`p-2.5 rounded-lg border ${
                  incident.signals.movementSuspicious
                    ? 'bg-red-950/20 border-red-500/30 text-red-200'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400'
                }`}
              >
                <span className="font-medium block text-[11px]">Gait / Velocity</span>
                <span className="font-bold">
                  {incident.signals.movementSuspicious ? 'Rapid Pace Anomaly' : 'Normal Walk'}
                </span>
              </div>

              <div
                className={`p-2.5 rounded-lg border ${
                  incident.signals.stalkingPattern
                    ? 'bg-red-950/20 border-red-500/30 text-red-200'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400'
                }`}
              >
                <span className="font-medium block text-[11px]">Trailing Trajectory</span>
                <span className="font-bold">
                  {incident.signals.stalkingPattern ? 'Proximity Detected' : 'Uncorrelated'}
                </span>
              </div>
            </div>
          </div>

          {/* Evidence Records Link */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Secured Evidence Records
            </h3>
            <div className="space-y-2">
              {incident.evidenceIds.map(evId => (
                <div
                  key={evId}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 text-xs hover:border-slate-700 transition cursor-pointer"
                  onClick={() => onViewEvidence(evId)}
                >
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-red-400 font-bold">{evId}</span>
                    <span className="text-slate-400 text-[11px]">
                      Encrypted Payload • SHA-256 Sealed
                    </span>
                  </div>
                  <span className="text-xs text-slate-300 hover:text-white font-medium">
                    Inspect Digital Hash →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Response Timeline */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Chronological Response Timeline
            </h3>
            <div className="space-y-3 relative before:absolute before:inset-0 before:left-2.5 before:w-0.5 before:bg-slate-800">
              {incident.timeline.map((evt, idx) => (
                <div key={idx} className="relative flex items-start gap-3 pl-6 text-xs">
                  <div className="absolute left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-[#09090b]"></div>
                  <div className="flex-1 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{evt.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{evt.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-900/60 border-t border-slate-800 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Lifecycle actions:
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {incident.status !== 'Resolved' && (
              <button
                onClick={() => {
                  onResolve(incident.id);
                  onClose();
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
              >
                <ShieldCheck className="w-4 h-4" />
                Mark Incident Resolved
              </button>
            )}

            {incident.status === 'Active' && (
              <button
                onClick={() => {
                  onMarkFalseAlarm(incident.id);
                  onClose();
                }}
                className="flex-1 sm:flex-none py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
              >
                Mark False Alarm
              </button>
            )}

            <button
              onClick={onClose}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-medium transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
