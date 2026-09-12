import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Radio,
  FileCheck
} from 'lucide-react';

interface DemoStepperProps {
  onRunStep: (stepNumber: number) => Promise<void>;
  onReset: () => Promise<void>;
  currentRiskScore: number;
}

const DEMO_STEPS = [
  { num: 1, title: 'System Active', desc: 'Telemetry monitors operational; baseline sensors calibrated' },
  { num: 2, title: 'AI Monitoring Online', desc: 'Background audio, spatial gait and route heuristics started' },
  { num: 3, title: 'Suspicious Movement', desc: 'Accelerated stride rate and abrupt direction changes flagged' },
  { num: 4, title: 'Distress Audio Detected', desc: 'Frequency matching acoustic panic threshold (89 dB)' },
  { num: 5, title: 'Location Risk Increases', desc: 'Geofence matches high-risk isolated subway corridor' },
  { num: 6, title: 'Stalking Pattern Flagged', desc: 'Trajectory correlation confirms repeated proximity trailing (+25)' },
  { num: 7, title: 'Risk Score Reaches 87%', desc: 'Multi-signal corroborator escalates to HIGH THREAT' },
  { num: 8, title: 'Threat Alert Displayed', desc: 'System prepares automated silent response protocol' },
  { num: 9, title: 'Threat Verified', desc: 'Human-in-the-loop autonomous verification prompt checked' },
  { num: 10, title: 'Silent SOS Activated', desc: 'Stealth beacon engaged with zero audible alarms or screen alerts' },
  { num: 11, title: 'Location Sharing Locked', desc: 'Continuous GPS telemetry broadcast locked into incident record' },
  { num: 12, title: 'Guardian Dispatched', desc: 'Priority SMS & Push notification dispatched to Priya Sharma' },
  { num: 13, title: 'Evidence Captured', desc: 'Sensor audio snippet & trajectory breadcrumbs bundled' },
  { num: 14, title: 'SHA-256 Seal Created', desc: 'Cryptographic digital hash generated for tamper resistance' },
  { num: 15, title: 'Evidence Verified', desc: 'Automated cryptographic integrity check confirmed passed' },
  { num: 16, title: 'Guardian Console Synced', desc: 'Incident visible on primary responder map with live distance' },
  { num: 17, title: 'Incident Resolved', desc: 'Safe arrival verified; case closed and audit logged' }
];

export const DemoStepper: React.FC<DemoStepperProps> = ({
  onRunStep,
  onReset,
  currentRiskScore
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && activeStep < 17) {
      timer = setTimeout(async () => {
        const next = activeStep + 1;
        setActiveStep(next);
        await onRunStep(next);
        if (next === 17) {
          setIsRunning(false);
        }
      }, 2200);
    }
    return () => clearTimeout(timer);
  }, [isRunning, activeStep, onRunStep]);

  const handleStartAutoDemo = async () => {
    setIsRunning(true);
    setActiveStep(1);
    await onRunStep(1);
  };

  const handleStopAutoDemo = () => {
    setIsRunning(false);
  };

  const handleManualStep = async (stepNum: number) => {
    setIsRunning(false);
    setActiveStep(stepNum);
    await onRunStep(stepNum);
  };

  const handleFullReset = async () => {
    setIsRunning(false);
    setActiveStep(1);
    await onReset();
  };

  return (
    <div className="rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl p-5 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl shadow-lg">
            🎬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-wide">
                Interactive Hackathon Demo Runner
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                DEMO MODE ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Demonstrate the complete SENSE → ASSESS → RESPOND → PROVE lifecycle in seconds
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {!isRunning ? (
            <button
              onClick={handleStartAutoDemo}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30 transition"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>▶ Run Full 17-Step Demo</span>
            </button>
          ) : (
            <button
              onClick={handleStopAutoDemo}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/30 transition animate-pulse"
            >
              <Pause className="w-4 h-4" />
              <span>Pause Auto-Runner</span>
            </button>
          )}

          <button
            onClick={handleFullReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">
            Demo Progress: Step {activeStep} of {DEMO_STEPS.length}
          </span>
          <span className="font-mono font-bold text-red-400">
            {Math.round((activeStep / DEMO_STEPS.length) * 100)}% Completed
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-[#09090b] border border-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-slate-600 via-red-500 to-red-600 transition-all duration-500"
            style={{ width: `${(activeStep / DEMO_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Active Step Highlight Card */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center shrink-0">
            {activeStep}
          </span>
          <div>
            <h3 className="text-sm font-bold text-white">
              {DEMO_STEPS[activeStep - 1].title}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {DEMO_STEPS[activeStep - 1].desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs">
          <div className="p-2 rounded-lg bg-[#09090b] border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">Risk Score</span>
            <span className="font-mono font-bold text-red-400 text-sm">{currentRiskScore}%</span>
          </div>
          {activeStep < 17 && (
            <button
              onClick={() => handleManualStep(activeStep + 1)}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1 border border-slate-700 transition"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Jump Buttons (Requested 9 standard buttons) */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Manual Stage Triggers (Jump to Scenario)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
          <button
            onClick={() => handleManualStep(1)}
            className="p-2.5 rounded-lg bg-[#09090b] hover:bg-slate-900 border border-slate-800 text-slate-200 font-medium transition text-left"
          >
            1. Normal State (24%)
          </button>
          <button
            onClick={() => handleManualStep(7)}
            className="p-2.5 rounded-lg bg-red-950/20 hover:bg-red-900/30 border border-red-500/30 text-red-200 font-semibold transition text-left"
          >
            2. Simulate Threat (87%)
          </button>
          <button
            onClick={() => handleManualStep(9)}
            className="p-2.5 rounded-lg bg-amber-950/20 hover:bg-amber-900/30 border border-amber-500/30 text-amber-200 font-medium transition text-left"
          >
            3. Verify Threat
          </button>
          <button
            onClick={() => handleManualStep(10)}
            className="p-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg shadow-red-900/30 transition text-left"
          >
            4. Activate Silent SOS
          </button>
          <button
            onClick={() => handleManualStep(13)}
            className="p-2.5 rounded-lg bg-[#09090b] hover:bg-slate-900 border border-slate-800 text-slate-200 font-medium transition text-left"
          >
            5. Capture Evidence
          </button>
          <button
            onClick={() => handleManualStep(15)}
            className="p-2.5 rounded-lg bg-emerald-950/20 hover:bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 font-medium transition text-left"
          >
            6. Verify Evidence
          </button>
          <button
            onClick={() => handleManualStep(16)}
            className="p-2.5 rounded-lg bg-[#09090b] hover:bg-slate-900 border border-slate-800 text-slate-200 font-medium transition text-left"
          >
            7. Guardian View
          </button>
          <button
            onClick={() => handleManualStep(17)}
            className="p-2.5 rounded-lg bg-emerald-950/20 hover:bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 font-bold transition text-left"
          >
            8. Resolve Incident
          </button>
          <button
            onClick={handleFullReset}
            className="p-2.5 rounded-lg bg-[#09090b] hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition text-left col-span-2 sm:col-span-1"
          >
            9. Reset Demo
          </button>
        </div>
      </div>
    </div>
  );
};
