import React from 'react';
import { AlertTriangle, ShieldCheck, HeartHandshake, ShieldAlert } from 'lucide-react';
import { RiskCalculation } from '../types.js';

interface ThreatVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: RiskCalculation | null;
  onConfirmSOS: () => void;
  onMarkFalseAlarm: () => void;
  onNotifyGuardianOnly: () => void;
}

export const ThreatVerificationModal: React.FC<ThreatVerificationModalProps> = ({
  isOpen,
  onClose,
  assessment,
  onConfirmSOS,
  onMarkFalseAlarm,
  onNotifyGuardianOnly
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#09090b] border border-slate-800 shadow-2xl shadow-red-950/30 overflow-hidden">
        {/* Header */}
        <div className="bg-red-950/20 border-b border-slate-800 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Suspicious Situation Detected</h2>
            <p className="text-xs text-slate-400">Multiple safety sensors indicate elevated risk</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Threat Corroboration Score</span>
              <span className="font-bold text-red-400 font-mono">
                {assessment ? assessment.riskScore : 87}% • {assessment ? assessment.riskLevel : 'HIGH'}
              </span>
            </div>
            {assessment && assessment.factors.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-slate-800">
                {assessment.factors.map((factor, idx) => (
                  <p key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>{factor}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="text-center py-2">
            <p className="text-sm font-bold text-white">Do you feel unsafe?</p>
            <p className="text-xs text-slate-400 mt-1">
              Human verification is included to reduce false positives and ensure user autonomy.
            </p>
          </div>

          {/* Action Choice Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={() => {
                onConfirmSOS();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-900/30 transition"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>YES — Trigger Silent SOS</span>
            </button>

            <button
              onClick={() => {
                onNotifyGuardianOnly();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition"
            >
              <HeartHandshake className="w-4 h-4 text-red-400" />
              <span>Need Help — Notify Guardian Discreetly</span>
            </button>

            <button
              onClick={() => {
                onMarkFalseAlarm();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-medium text-xs border border-slate-800 transition"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>NO — False Alarm (Safe)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-900/60 px-6 py-2.5 border-t border-slate-800 text-[11px] text-slate-400 text-center">
          Auto-escalation disabled while awaiting human verification
        </div>
      </div>
    </div>
  );
};
