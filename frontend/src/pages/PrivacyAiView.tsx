import React from 'react';
import {
  Lock,
  ShieldCheck,
  Eye,
  Sliders,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  XCircle,
  Sparkles
} from 'lucide-react';
import { PrivacySettings } from '../types.js';

interface PrivacyAiViewProps {
  privacy: PrivacySettings;
  onUpdatePrivacy: (updates: Partial<PrivacySettings>) => void;
}

export const PrivacyAiView: React.FC<PrivacyAiViewProps> = ({
  privacy,
  onUpdatePrivacy
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <Lock className="w-5 h-5" />
          </span>
          <h1 className="text-xl font-bold text-white">Privacy & Responsible AI Architecture</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Ethical AI Charter
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
          Silent Guardian AI is built upon consent-first, privacy-preserving principles. We reject black-box surveillance in favor of user-governed sensor telemetry and transparent explainable decision metrics.
        </p>
      </div>

      {/* User Consent Controls (Section 24 requirement) */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-red-400" />
            User Sensor Consent Permissions
          </h2>
          <span className="text-xs text-slate-400">Real-time device hardware access</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Location Toggle */}
          <div className="p-4 rounded-xl bg-[#09090b] border border-slate-800 flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-white block">Location Monitoring</span>
              <p className="text-[11px] text-slate-400">
                {privacy.locationMonitoring
                  ? 'Continuous GPS waypoint calculation enabled'
                  : '⚠️ Location sharing disabled by user.'}
              </p>
            </div>
            <button
              onClick={() => onUpdatePrivacy({ locationMonitoring: !privacy.locationMonitoring })}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                privacy.locationMonitoring
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {privacy.locationMonitoring ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Audio Toggle */}
          <div className="p-4 rounded-xl bg-[#09090b] border border-slate-800 flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-white block">Acoustic Distress Monitoring</span>
              <p className="text-[11px] text-slate-400">
                {privacy.audioMonitoring
                  ? 'High-decibel acoustic pattern correlation active'
                  : 'Microphone sensor disabled.'}
              </p>
            </div>
            <button
              onClick={() => onUpdatePrivacy({ audioMonitoring: !privacy.audioMonitoring })}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                privacy.audioMonitoring
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {privacy.audioMonitoring ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Emergency Alerts Toggle */}
          <div className="p-4 rounded-xl bg-[#09090b] border border-slate-800 flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-white block">Emergency SOS Dispatch</span>
              <p className="text-[11px] text-slate-400">
                {privacy.emergencyAlerts
                  ? 'Autonomous guardian dispatch upon confirmed threat'
                  : 'Automatic alerts disabled.'}
              </p>
            </div>
            <button
              onClick={() => onUpdatePrivacy({ emergencyAlerts: !privacy.emergencyAlerts })}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                privacy.emergencyAlerts
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {privacy.emergencyAlerts ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Evidence Capture Toggle */}
          <div className="p-4 rounded-xl bg-[#09090b] border border-slate-800 flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-white block">Evidence Cryptographic Vault</span>
              <p className="text-[11px] text-slate-400">
                {privacy.evidenceCapture
                  ? 'SHA-256 digital seals generated for incident logs'
                  : 'Evidence hashing suspended.'}
              </p>
            </div>
            <button
              onClick={() => onUpdatePrivacy({ evidenceCapture: !privacy.evidenceCapture })}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                privacy.evidenceCapture
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {privacy.evidenceCapture ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Two Columns: Core Privacy Principles & Responsible AI Framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Privacy Principles */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Core Privacy Principles
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Consent-Based Monitoring:</strong> Telemetry is captured solely during active transit modes or user-authorized sessions.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Granular User Control:</strong> The user can pause, wipe, or revoke location and sensor logging at any moment.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Minimal Data Retention:</strong> Unflagged ambient audio recordings are scrubbed continuously in rolling buffers.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Role-Based Access Control:</strong> Only explicitly authorized guardian contacts receive encrypted incident dossiers.
              </div>
            </li>
          </ul>
        </div>

        {/* Responsible AI Framework */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-400" />
            Responsible AI & Ethical AI Disclosure
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Risk Scores Do Not Imply Guilt:</strong> AI outputs signify situational vulnerability, not legal proof of criminal guilt.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Mandatory Human-in-the-Loop:</strong> Verification prompts guard against false positives caused by loud public environments.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Acknowledge Model Uncertainty:</strong> Environmental noise can cause false positives or false negatives.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Prototype Lab Validation:</strong> Sensor weights must undergo localized demographic testing before commercial deployment.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
