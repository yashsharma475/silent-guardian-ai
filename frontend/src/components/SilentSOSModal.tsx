import React, { useState } from 'react';
import { ShieldAlert, MapPin, Users, Lock, XCircle, CheckCircle2, PhoneCall, ExternalLink, VolumeX } from 'lucide-react';
import { Incident } from '../types.js';

interface SilentSOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident | null;
  onViewIncident: (id: string) => void;
  onCancelSOS: (id: string) => void;
}

export const SilentSOSModal: React.FC<SilentSOSModalProps> = ({
  isOpen,
  onClose,
  incident,
  onViewIncident,
  onCancelSOS
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!isOpen || !incident) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#09090b] border border-slate-800 shadow-2xl shadow-red-950/30 overflow-hidden">
        {/* Top Emergency Pulse Bar */}
        <div className="bg-red-600 px-6 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-black/20 text-xl animate-pulse">🚨</span>
            <div>
              <h2 className="text-base font-bold tracking-wide flex items-center gap-2">
                Silent SOS Activated
              </h2>
              <p className="text-[11px] text-red-100/90 font-medium">
                Stealth Emergency Beacon Active • Prototype Simulation
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-white text-red-600 shadow">
            {incident.riskScore}% RISK
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Stealth Audio & Screen Protection Banner */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <VolumeX className="w-5 h-5 text-red-400 shrink-0" />
            <p>
              <strong className="text-white">Stealth Protocol:</strong> Zero audible alarms or flashing displays are triggered on device to ensure perpetrator remains unaware.
            </p>
          </div>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                Emergency Alert
              </span>
              <p className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Triggered & Locked
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                Guardian Dispatch
              </span>
              <p className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Dispatched (Demo SMS)
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Live Location
              </span>
              <p className="text-slate-200 font-semibold font-mono">
                {incident.location.latitude.toFixed(4)}°N, {incident.location.longitude.toFixed(4)}°E
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Evidence Record
              </span>
              <p className="text-slate-200 font-semibold font-mono">
                {incident.evidenceIds[0] || 'EVD-AUTO-SHA256'}
              </p>
            </div>
          </div>

          {/* Incident Identifiers */}
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-400">Incident Reference: </span>
              <span className="font-mono font-bold text-slate-200">{incident.id}</span>
            </div>
            <div className="text-slate-400">
              {new Date(incident.createdAt).toLocaleTimeString()}
            </div>
          </div>

          {/* Cancel Confirmation Prompt */}
          {showCancelConfirm ? (
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/40 space-y-3">
              <p className="text-xs text-red-200 font-medium">
                Are you sure you want to cancel this emergency SOS? Guardian contacts will receive a safety stand-down update.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onCancelSOS(incident.id);
                    setShowCancelConfirm(false);
                    onClose();
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition"
                >
                  Yes, Cancel SOS
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                >
                  Keep Active
                </button>
              </div>
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              onClick={() => {
                onViewIncident(incident.id);
                onClose();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-900/30 transition"
            >
              <ExternalLink className="w-4 h-4" />
              View Incident Report
            </button>

            <a
              href="tel:+919845012345"
              onClick={(e) => {
                e.preventDefault();
                alert('Prototype simulation: Mock guardian priority call initiated to Priya Sharma (+91 98450 12345)');
              }}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Call Guardian
            </a>

            {!showCancelConfirm && (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-red-950/20 hover:bg-red-900/40 border border-red-800/40 text-red-300 text-xs font-medium transition"
              >
                <XCircle className="w-4 h-4" />
                Cancel SOS
              </button>
            )}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="bg-slate-900/60 px-6 py-2.5 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Prototype emergency flow</span>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-medium">
            Dismiss Window
          </button>
        </div>
      </div>
    </div>
  );
};
