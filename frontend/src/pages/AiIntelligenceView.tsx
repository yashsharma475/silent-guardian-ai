import React from 'react';
import {
  Sparkles,
  Volume2,
  Activity,
  MapPin,
  Footprints,
  Clock,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers
} from 'lucide-react';
import { SafetySignals, RiskCalculation } from '../types.js';

interface AiIntelligenceViewProps {
  signals: SafetySignals;
  assessment: RiskCalculation;
  onUpdateSignals: (newSignals: Partial<SafetySignals>) => void;
  onSimulateThreat: () => void;
  onResetSignals: () => void;
}

export const AiIntelligenceView: React.FC<AiIntelligenceViewProps> = ({
  signals,
  assessment,
  onUpdateSignals,
  onSimulateThreat,
  onResetSignals
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-white">AI Threat Intelligence Engine</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
              Prototype AI Simulation
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Correlates multi-modal acoustic frequencies, accelerometer gait variations, spatiotemporal transit risk zones, and trajectory proximity into an explainable threat assessment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSimulateThreat}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30 border border-red-500/30 transition"
          >
            🧪 Simulate Threat (87%)
          </button>
          <button
            onClick={onResetSignals}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            Reset to Normal (24%)
          </button>
        </div>
      </div>

      {/* Main Grid: Visual Risk Meter + 4 Main Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Risk Gauge Card */}
        <div className="p-6 rounded-2xl bg-[#09090b] border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              AI Threat Score
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                assessment.riskScore >= 61
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {assessment.riskLevel} RISK
            </span>
          </div>

          {/* Circular SVG Gauge Meter */}
          <div className="relative w-48 h-48 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="14"
                fill="transparent"
                className="text-slate-800/80"
              />
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="14"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={2 * Math.PI * 80 * (1 - assessment.riskScore / 100)}
                strokeLinecap="round"
                className={`transition-all duration-700 ${
                  assessment.riskScore >= 61
                    ? 'text-red-500'
                    : assessment.riskScore >= 31
                    ? 'text-amber-500'
                    : 'text-emerald-400'
                }`}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-light font-mono text-white tracking-tight">
                {assessment.riskScore}%
              </span>
              <span className="text-xs text-slate-500 font-medium">Composite Risk</span>
            </div>
          </div>

          <div className="w-full text-xs text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800 text-left">
            <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">
              Protocol Action Recommendation:
            </span>
            <p className="leading-snug text-slate-300">{assessment.recommendation}</p>
          </div>
        </div>

        {/* 4 Sensor Signals Breakdown */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Audio Signal */}
          <div
            className={`p-4 rounded-2xl border transition ${
              signals.audioDistress
                ? 'bg-red-950/20 border-red-500/40'
                : 'bg-slate-900/40 border border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Volume2
                  className={`w-4 h-4 ${
                    signals.audioDistress ? 'text-red-400' : 'text-slate-400'
                  }`}
                />
                <span className="text-xs font-bold text-white">1. Audio Signal</span>
              </div>
              <span
                className={`text-xs font-bold font-mono ${
                  signals.audioDistress ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {signals.audioDistress ? 'Distress Detected' : 'Normal'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Detects acoustic distress markers, sharp decibel spikes, or vocal strain patterns.
            </p>
            {/* Audio Waveform visualization bar */}
            <div className="h-6 flex items-center gap-1 px-2 rounded-lg bg-[#09090b] border border-slate-800">
              {[4, 12, 8, 20, 15, 6, 18, 24, 14, 8, 19, 9, 22, 5].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    signals.audioDistress ? 'bg-red-500 animate-pulse' : 'bg-emerald-500/40'
                  }`}
                  style={{
                    height: signals.audioDistress ? `${Math.min(100, h * 3.5)}%` : `${h}%`
                  }}
                />
              ))}
            </div>
          </div>

          {/* 2. Movement Pattern */}
          <div
            className={`p-4 rounded-2xl border transition ${
              signals.movementSuspicious
                ? 'bg-red-950/20 border-red-500/40'
                : 'bg-slate-900/40 border border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity
                  className={`w-4 h-4 ${
                    signals.movementSuspicious ? 'text-red-400' : 'text-slate-400'
                  }`}
                />
                <span className="text-xs font-bold text-white">2. Movement Pattern</span>
              </div>
              <span
                className={`text-xs font-bold font-mono ${
                  signals.movementSuspicious ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {signals.movementSuspicious ? 'Suspicious' : 'Normal'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Evaluates accelerometer/gyroscope gait stability, erratic fleeing velocity, or sudden stops.
            </p>
            <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-[#09090b] border border-slate-800">
              <span className="text-slate-400">Gait Deviance:</span>
              <span className="font-mono text-slate-200">
                {signals.movementSuspicious ? '+4.8σ (Rapid Pace Deviation)' : '0.4σ (Consistent Walk)'}
              </span>
            </div>
          </div>

          {/* 3. Location Risk */}
          <div
            className={`p-4 rounded-2xl border transition ${
              signals.locationRisk === 'high'
                ? 'bg-red-950/20 border-red-500/40'
                : 'bg-slate-900/40 border border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin
                  className={`w-4 h-4 ${
                    signals.locationRisk === 'high' ? 'text-red-400' : 'text-slate-400'
                  }`}
                />
                <span className="text-xs font-bold text-white">3. Location Risk</span>
              </div>
              <span
                className={`text-xs font-bold font-mono ${
                  signals.locationRisk === 'high' ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {signals.locationRisk === 'high' ? 'High Risk' : 'Low Risk'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Corroborates location against dark-zone municipal datasets, illumination indexes, and isolated alleys.
            </p>
            <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-[#09090b] border border-slate-800">
              <span className="text-slate-400">Zone Attribute:</span>
              <span className="font-mono text-slate-200">
                {signals.locationRisk === 'high' ? 'Isolated Underpass (+20)' : 'Safe Commercial Plaza'}
              </span>
            </div>
          </div>

          {/* 4. Suspicious Stalking Pattern */}
          <div
            className={`p-4 rounded-2xl border transition ${
              signals.stalkingPattern
                ? 'bg-red-950/20 border-red-500/40'
                : 'bg-slate-900/40 border border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Footprints
                  className={`w-4 h-4 ${
                    signals.stalkingPattern ? 'text-red-400' : 'text-slate-400'
                  }`}
                />
                <span className="text-xs font-bold text-white">4. Suspicious Pattern</span>
              </div>
              <span
                className={`text-xs font-bold font-mono ${
                  signals.stalkingPattern ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {signals.stalkingPattern ? 'Detected' : 'Not Detected'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Detects repeated proximity and identical turn trajectory sequences from nearby Bluetooth/Wi-Fi/RF signals.
            </p>
            <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-[#09090b] border border-slate-800">
              <span className="text-slate-400">Pattern Match:</span>
              <span className="font-mono text-slate-200">
                {signals.stalkingPattern ? '3 Turns Matched (+25)' : 'No Proximity Match'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 14: STALKING PATTERN DETECTION VISUALIZER */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Footprints className="w-4 h-4 text-red-400" />
            <h2 className="text-sm font-bold text-white">
              Stalking & Trailing Pattern Sequence
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {signals.stalkingPattern ? '⚠️ Threat Correlated (+25 Risk)' : 'Nominal Transit Path'}
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Demonstrates how repeated spatial coincidence across multiple transit checkpoints is detected:
        </p>

        {/* Visual Progression Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Checkpoint 1</span>
            <p className="font-bold text-slate-200 mt-0.5">Location A</p>
            <span className="text-[10px] text-slate-400">Metro Exit A3</span>
          </div>

          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Checkpoint 2</span>
            <p className="font-bold text-slate-200 mt-0.5">Location B</p>
            <span className="text-[10px] text-slate-400">Main 100ft Road</span>
          </div>

          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Checkpoint 3</span>
            <p className="font-bold text-slate-200 mt-0.5">Location C</p>
            <span className="text-[10px] text-slate-400">Subway Underpass</span>
          </div>

          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Trajectory Heuristic</span>
            <p className="font-bold text-amber-300 mt-0.5">Same Route Detected</p>
            <span className="text-[10px] text-slate-400">Identical 3 Turn Path</span>
          </div>

          <div
            className={`p-3 rounded-xl border ${
              signals.stalkingPattern
                ? 'bg-red-950/40 border-red-500/50 text-red-200'
                : 'bg-[#09090b] border-slate-800 text-slate-400'
            }`}
          >
            <span className="block text-[10px]">System Output</span>
            <p className="font-bold mt-0.5">
              {signals.stalkingPattern ? 'Repeated Proximity Alert' : 'Normal Trajectory'}
            </p>
            <span className="text-[10px]">
              {signals.stalkingPattern ? 'Risk Contribution: +25' : 'Contribution: 0'}
            </span>
          </div>
        </div>
      </div>

      {/* Section 7: Explainable Risk Factors Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400" />
          Explainable Risk Engine Audit Log (Why the score changed)
        </h2>

        <div className="space-y-2">
          {assessment.factors.map((factor, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl bg-[#09090b] border border-slate-800/80 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200">{factor}</span>
              </div>
              <span className="font-mono text-slate-400 text-[11px] font-semibold">
                Corroborated Factor
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Signal Override Toggles (for presentation demos) */}
        <div className="pt-4 border-t border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
            Interactive Sensor Toggles (Observe Score Recalculation)
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <button
              onClick={() => onUpdateSignals({ audioDistress: !signals.audioDistress })}
              className={`p-2.5 rounded-xl border text-left transition ${
                signals.audioDistress
                  ? 'bg-red-950/40 border-red-500/50 text-red-200'
                  : 'bg-[#09090b] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="font-bold block">Audio Distress (+20)</span>
              <span className="text-[10px]">{signals.audioDistress ? 'Active' : 'Disabled'}</span>
            </button>

            <button
              onClick={() =>
                onUpdateSignals({ movementSuspicious: !signals.movementSuspicious })
              }
              className={`p-2.5 rounded-xl border text-left transition ${
                signals.movementSuspicious
                  ? 'bg-red-950/40 border-red-500/50 text-red-200'
                  : 'bg-[#09090b] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="font-bold block">Movement Fluctuation (+20)</span>
              <span className="text-[10px]">
                {signals.movementSuspicious ? 'Active' : 'Disabled'}
              </span>
            </button>

            <button
              onClick={() =>
                onUpdateSignals({
                  locationRisk: signals.locationRisk === 'high' ? 'low' : 'high'
                })
              }
              className={`p-2.5 rounded-xl border text-left transition ${
                signals.locationRisk === 'high'
                  ? 'bg-red-950/40 border-red-500/50 text-red-200'
                  : 'bg-[#09090b] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="font-bold block">Location Risk (+20)</span>
              <span className="text-[10px]">
                {signals.locationRisk === 'high' ? 'High Risk Zone' : 'Low Risk Zone'}
              </span>
            </button>

            <button
              onClick={() =>
                onUpdateSignals({ stalkingPattern: !signals.stalkingPattern })
              }
              className={`p-2.5 rounded-xl border text-left transition ${
                signals.stalkingPattern
                  ? 'bg-red-950/40 border-red-500/50 text-red-200'
                  : 'bg-[#09090b] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="font-bold block">Stalking Pattern (+25)</span>
              <span className="text-[10px]">
                {signals.stalkingPattern ? 'Active' : 'Disabled'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
