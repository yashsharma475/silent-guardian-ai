import React from 'react';
import {
  Shield,
  Radio,
  Cpu,
  Lock,
  Compass,
  AlertTriangle,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl shadow-lg">
            🛡️
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Silent Guardian AI</h1>
            <p className="text-xs text-red-400 font-semibold">
              AI-Powered Women Safety & Crime Prevention Platform
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          An AI-powered women safety and crime prevention prototype designed to detect potentially dangerous situations, enable silent emergency response, assist guardians, and preserve incident integrity.
        </p>
      </div>

      {/* Core Workflow: SENSE -> ASSESS -> RESPOND -> PROVE */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Core System Architecture & Life Cycle
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#09090b] border border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs">
              01
            </span>
            <h3 className="text-base font-bold text-white">SENSE</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Monitors multi-modal acoustic decibel spikes, abnormal movement pace shifts, transit geofences, and trailing trajectories.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#09090b] border border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs">
              02
            </span>
            <h3 className="text-base font-bold text-white">ASSESS</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rules-based explainable scoring engine correlates signals into normalized 0–100 risk score and prompts autonomous human verification.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#09090b] border border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 font-bold flex items-center justify-center text-xs">
              03
            </span>
            <h3 className="text-base font-bold text-white">RESPOND</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engages stealth silent SOS without audible sirens or flashing screens. Instantly streams continuous GPS to guardian consoles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#09090b] border border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs">
              04
            </span>
            <h3 className="text-base font-bold text-white">PROVE</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seals incident audio, location breadcrumbs, and telemetry logs with SHA-256 cryptographic digests to defend against evidence tampering.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack Details */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white">Implementation Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-400 block mb-1">Frontend UI</span>
            <span className="font-bold text-slate-200">React 19 + Vite</span>
          </div>
          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-400 block mb-1">Styling Engine</span>
            <span className="font-bold text-slate-200">Tailwind CSS v4</span>
          </div>
          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-400 block mb-1">Backend Server</span>
            <span className="font-bold text-slate-200">Node.js + Express REST</span>
          </div>
          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-400 block mb-1">Optional AI Engine</span>
            <span className="font-bold text-slate-200">Python FastAPI</span>
          </div>
          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-400 block mb-1">Security Hashing</span>
            <span className="font-bold text-slate-200">SHA-256 Web Crypto</span>
          </div>
          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-400 block mb-1">Persistence</span>
            <span className="font-bold text-slate-200">Local JSON Store</span>
          </div>
          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-400 block mb-1">Tactical Mapping</span>
            <span className="font-bold text-slate-200">Vector Cartography + GPS</span>
          </div>
          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-400 block mb-1">Deployment Target</span>
            <span className="font-bold text-slate-200">Localhost / Cloud Run</span>
          </div>
        </div>
      </div>

      {/* Mandatory Hackathon Disclaimer (Section 56 requirement) */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
          <span>Hackathon Prototype & Proof of Concept Disclaimer</span>
        </div>
        <p className="leading-relaxed text-slate-300">
          "Silent Guardian AI is a hackathon prototype/PoC. AI threat detection shown in this demonstration uses controlled/simulated inputs and should not be interpreted as validated real-world crime prediction or guaranteed emergency protection."
        </p>
      </div>
    </div>
  );
};
