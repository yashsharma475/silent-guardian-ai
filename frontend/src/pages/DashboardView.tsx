import React from 'react';
import {
  ShieldAlert,
  Radio,
  MapPin,
  Users,
  ShieldCheck,
  AlertTriangle,
  Activity,
  ArrowRight,
  Lock,
  Compass,
  Volume2,
  Clock
} from 'lucide-react';
import {
  SafetySignals,
  RiskCalculation,
  Incident,
  GuardianContact,
  SystemStats,
  ActivityEvent
} from '../types.js';

interface DashboardViewProps {
  signals: SafetySignals;
  assessment: RiskCalculation;
  locationSharing: boolean;
  locationAddress: string;
  guardians: GuardianContact[];
  stats: SystemStats;
  activeIncidents: Incident[];
  activityLogs: ActivityEvent[];
  onActivateSOS: () => void;
  onSimulateThreat: () => void;
  onOpenIncidentDetail: (id: string) => void;
  onNavigate: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  signals,
  assessment,
  locationSharing,
  locationAddress,
  guardians,
  stats,
  activeIncidents,
  activityLogs,
  onActivateSOS,
  onSimulateThreat,
  onOpenIncidentDetail,
  onNavigate
}) => {
  const primaryGuardian = guardians.find(g => g.priority === 'Primary') || guardians[0];
  const activeSOS = activeIncidents.find(i => i.status === 'Active');

  const riskBadgeColors = {
    LOW: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    MEDIUM: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    HIGH: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    CRITICAL: 'text-red-300 bg-red-600/20 border-red-500/50'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Active Incident Urgent Banner */}
      {activeSOS && (
        <div className="p-4 sm:p-5 rounded-2xl bg-red-950/40 border border-red-500/60 shadow-xl shadow-red-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-red-900/40 animate-pulse shrink-0">
              🚨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  ACTIVE INCIDENT DETECTED ({activeSOS.id})
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">
                  {activeSOS.riskScore}% {activeSOS.riskLevel}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Silent emergency beacon streaming live coordinates to {primaryGuardian?.name || 'Guardians'}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenIncidentDetail(activeSOS.id)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-red-700 text-xs font-bold shadow transition"
            >
              Inspect Incident
            </button>
            <button
              onClick={() => onNavigate('location')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 transition"
            >
              Track on Map
            </button>
          </div>
        </div>
      )}

      {/* A. Welcome Section */}
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Autonomous Sense → Assess → Respond → Prove Architecture</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Your Safety, Our Priority
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Silent Guardian AI monitors multi-modal safety signals (acoustic distress, abnormal motion deviations, high-risk transit geofences, and trailing trajectory patterns) to detect potentially dangerous situations and empower silent emergency responses.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onActivateSOS}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30 transition transform active:scale-95"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Activate Silent SOS</span>
            </button>

            <button
              onClick={onSimulateThreat}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <span>🧪 Simulate Threat Scenario</span>
            </button>

            <button
              onClick={() => onNavigate('demo')}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-amber-300 hover:text-white transition"
            >
              <span>17-Step Demo Runner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* B. Safety Overview 4 Cards (Requested Specification) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: AI Threat Detection */}
        <div
          onClick={() => onNavigate('intelligence')}
          className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700/80 transition cursor-pointer shadow-lg space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-red-400" />
              AI Threat Detection
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                riskBadgeColors[assessment.riskLevel]
              }`}
            >
              {assessment.riskLevel} RISK
            </span>
          </div>

          <div>
            <div className="text-3xl font-light font-mono tracking-tight text-white flex items-baseline gap-1.5">
              <span>{assessment.riskScore}%</span>
              <span className="text-xs text-slate-500 font-normal font-sans">
                {assessment.riskScore >= 61 ? 'High Risk' : 'Low Risk'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
              {assessment.factors[0]}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
            <span>Inspect Neural Telemetry</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Card 2: Live Location */}
        <div
          onClick={() => onNavigate('location')}
          className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700/80 transition cursor-pointer shadow-lg space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Live Location
            </span>
            <span className="text-[10px] font-mono text-slate-400">GPS Active</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  locationSharing ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'
                }`}
              ></span>
              <span className="text-base font-bold text-white">
                {locationSharing ? 'Sharing Active' : 'Sharing Disabled'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              {locationAddress}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
            <span>Open Tactical Radar</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Card 3: Guardian Status */}
        <div
          onClick={() => onNavigate('guardian')}
          className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700/80 transition cursor-pointer shadow-lg space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-300" />
              Guardian Status
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Connected
            </span>
          </div>

          <div>
            <p className="text-base font-bold text-white truncate">
              {primaryGuardian ? primaryGuardian.name : 'Guardian Configured'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              SMS, Priority Call & Stealth Push Enabled
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
            <span>Manage Trusted Circle</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Card 4: System Status */}
        <div
          onClick={() => onNavigate('privacy')}
          className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700/80 transition cursor-pointer shadow-lg space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              System Status
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Normal 24%</span>
          </div>

          <div>
            <p className="text-base font-bold text-white">Monitoring Active</p>
            <p className="text-[11px] text-slate-400 mt-1">
              {signals.stalkingPattern ? '⚠️ Stalking Pattern Detected' : 'No Anomalies Detected'}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
            <span>Privacy & Sensor Policy</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>

      {/* Stats Counter Bar (Hackathon Requirement #30) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
          <span className="text-slate-500 text-xs block mb-0.5 font-medium uppercase tracking-wider text-[10px]">Threats Detected</span>
          <span className="text-2xl font-light text-red-400 font-mono">{stats.threatsDetected}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
          <span className="text-slate-500 text-xs block mb-0.5 font-medium uppercase tracking-wider text-[10px]">SOS Alerts</span>
          <span className="text-2xl font-light text-amber-400 font-mono">{stats.sosAlerts}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
          <span className="text-slate-500 text-xs block mb-0.5 font-medium uppercase tracking-wider text-[10px]">Total Incidents</span>
          <span className="text-2xl font-light text-slate-200 font-mono">{stats.totalIncidents}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
          <span className="text-slate-500 text-xs block mb-0.5 font-medium uppercase tracking-wider text-[10px]">Evidence Records</span>
          <span className="text-2xl font-light text-emerald-400 font-mono">{stats.evidenceRecords}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 col-span-2 sm:col-span-1">
          <span className="text-slate-500 text-xs block mb-0.5 font-medium uppercase tracking-wider text-[10px]">Resolved Incidents</span>
          <span className="text-2xl font-light text-slate-200 font-mono">{stats.resolvedIncidents}</span>
        </div>
      </div>

      {/* Bottom Section: Signals Corroboration + Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor Signals Matrix */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-slate-400" />
              Live Sensor Telemetry Matrix
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Explainable Scoring Engine
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 font-medium block">Audio Distress Signal</span>
                <span className={`font-bold ${signals.audioDistress ? 'text-red-400' : 'text-emerald-400'}`}>
                  {signals.audioDistress ? 'Distress Detected (+20)' : 'Normal Baseline'}
                </span>
              </div>
              <Volume2 className={`w-4 h-4 ${signals.audioDistress ? 'text-red-400' : 'text-slate-600'}`} />
            </div>

            <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 font-medium block">Movement Dynamics</span>
                <span className={`font-bold ${signals.movementSuspicious ? 'text-red-400' : 'text-emerald-400'}`}>
                  {signals.movementSuspicious ? 'Suspicious Pace (+20)' : 'Normal Gait'}
                </span>
              </div>
              <Activity className={`w-4 h-4 ${signals.movementSuspicious ? 'text-red-400' : 'text-slate-600'}`} />
            </div>

            <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 font-medium block">Location Geofence Risk</span>
                <span className={`font-bold ${signals.locationRisk === 'high' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {signals.locationRisk === 'high' ? 'High Risk Corridor (+20)' : 'Safe Commercial Zone'}
                </span>
              </div>
              <MapPin className={`w-4 h-4 ${signals.locationRisk === 'high' ? 'text-red-400' : 'text-slate-600'}`} />
            </div>

            <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 font-medium block">Trailing / Stalking Pattern</span>
                <span className={`font-bold ${signals.stalkingPattern ? 'text-red-400' : 'text-emerald-400'}`}>
                  {signals.stalkingPattern ? 'Trajectory Match (+25)' : 'Not Detected'}
                </span>
              </div>
              <AlertTriangle className={`w-4 h-4 ${signals.stalkingPattern ? 'text-red-400' : 'text-slate-600'}`} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800 text-xs text-slate-300">
            <p className="font-semibold text-white mb-0.5">Automated Multi-Signal Corroborator:</p>
            <p className="text-[11px] text-slate-400">{assessment.recommendation}</p>
          </div>
        </div>

        {/* Real-time Activity Timeline */}
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Event Timeline
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Live stream</span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {activityLogs.map((log) => (
              <div key={log.id} className="text-xs flex items-start gap-2.5 pb-2 border-b border-slate-800/60 last:border-0">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 leading-snug">{log.message}</p>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                    {log.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
