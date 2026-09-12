import React, { useState, useEffect, useCallback } from 'react';
import { api } from './services/api.js';
import {
  SafetySignals,
  RiskCalculation,
  Incident,
  EvidenceRecord,
  GuardianContact,
  ActivityEvent,
  SystemStats,
  PrivacySettings
} from './types.js';
import { Header } from './components/Header.js';
import { ToastContainer, ToastMessage } from './components/Toast.js';
import { SilentSOSModal } from './components/SilentSOSModal.js';
import { ThreatVerificationModal } from './components/ThreatVerificationModal.js';
import { IncidentDetailModal } from './components/IncidentDetailModal.js';
import { DemoStepper } from './components/DemoStepper.js';
import { DashboardView } from './pages/DashboardView.js';
import { AiIntelligenceView } from './pages/AiIntelligenceView.js';
import { LiveLocationView } from './pages/LiveLocationView.js';
import { IncidentsView } from './pages/IncidentsView.js';
import { EvidenceVaultView } from './pages/EvidenceVaultView.js';
import { GuardianHubView } from './pages/GuardianHubView.js';
import { PrivacyAiView } from './pages/PrivacyAiView.js';
import { SettingsView } from './pages/SettingsView.js';
import { AboutView } from './pages/AboutView.js';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [loading, setLoading] = useState<boolean>(true);

  // Core Data States
  const [signals, setSignals] = useState<SafetySignals>({
    audioDistress: false,
    movementSuspicious: false,
    locationRisk: 'low',
    stalkingPattern: false,
    timeRisk: false,
    userSos: false
  });

  const [assessment, setAssessment] = useState<RiskCalculation>({
    riskScore: 24,
    riskLevel: 'LOW',
    factors: ['Nominal sensor signals; no anomalous patterns detected'],
    recommendation: 'Environmental signals within normal baseline thresholds.',
    timestamp: new Date().toISOString()
  });

  const [location, setLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    address: 'Indiranagar 100ft Road, Bengaluru, KA 560038',
    accuracy: 4.8,
    sharing: true,
    lastUpdated: new Date().toISOString()
  });

  const [guardians, setGuardians] = useState<GuardianContact[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [evidence, setEvidence] = useState<EvidenceRecord[]>([]);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    threatsDetected: 1,
    sosAlerts: 1,
    totalIncidents: 1,
    evidenceRecords: 3,
    resolvedIncidents: 1
  });
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    locationMonitoring: true,
    audioMonitoring: true,
    emergencyAlerts: true,
    evidenceCapture: true
  });

  // Modal States
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [activeSOSIncident, setActiveSOSIncident] = useState<Incident | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [detailIncident, setDetailIncident] = useState<Incident | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Load Initial Data from Backend
  const refreshAllData = useCallback(async () => {
    try {
      const [
        sigRes,
        locRes,
        grdRes,
        incRes,
        evdRes,
        actRes,
        statRes,
        privRes
      ] = await Promise.all([
        api.getSignals(),
        api.getLocation(),
        api.getGuardians(),
        api.getIncidents(),
        api.getEvidence(),
        api.getActivity(),
        api.getStats(),
        api.getPrivacy()
      ]);

      setSignals(sigRes.signals);
      setAssessment(sigRes.assessment);
      setLocation(locRes);
      setGuardians(grdRes);
      setIncidents(incRes);
      setEvidence(evdRes);
      setActivity(actRes);
      setStats(statRes);
      setPrivacy(privRes);
    } catch (err) {
      console.warn('Backend loading warning:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Actions
  const handleActivateSilentSOS = async () => {
    try {
      const res = await api.triggerSOS({
        riskScore: assessment.riskScore >= 60 ? assessment.riskScore : 87,
        signals,
        source: 'User Manual SOS Trigger'
      });
      setActiveSOSIncident(res.incident);
      setIsSOSModalOpen(true);
      showToast('🚨 Silent SOS Activated', 'Stealth emergency beacon broadcast to guardians.', 'error');
      await refreshAllData();
    } catch (err) {
      showToast('SOS Error', 'Unable to dispatch emergency beacon.', 'error');
    }
  };

  const handleSimulateThreat = async () => {
    try {
      const res = await api.simulateThreat();
      setSignals(res.signals);
      setAssessment(res.assessment);
      setActiveSOSIncident(res.incident);
      setIsVerificationModalOpen(true);
      showToast('🧪 Threat Scenario Triggered', 'Multi-signal risk score reached 87% (HIGH).', 'warning');
      await refreshAllData();
    } catch (err) {
      showToast('Simulation Error', 'Failed to run threat simulation.', 'error');
    }
  };

  const handleResetDemo = async () => {
    try {
      await api.resetDemo();
      setIsSOSModalOpen(false);
      setIsVerificationModalOpen(false);
      setActiveSOSIncident(null);
      await refreshAllData();
      showToast('↻ System Reset', 'Returned to baseline normal state (24% risk).', 'success');
    } catch (err) {
      showToast('Reset Error', 'Failed to reset demo state.', 'error');
    }
  };

  const handleUpdateSignals = async (partial: Partial<SafetySignals>) => {
    try {
      const res = await api.updateSignals(partial);
      setSignals(res.signals);
      setAssessment(res.assessment);
      showToast('Sensor Calibrated', `Threat score updated to ${res.assessment.riskScore}%.`, 'info');
      await refreshAllData();
    } catch (err) {
      showToast('Update Error', 'Failed to update signals.', 'error');
    }
  };

  const handleToggleLocationSharing = async () => {
    try {
      if (location.sharing) {
        await api.stopLocationSharing();
        setLocation(prev => ({ ...prev, sharing: false }));
        showToast('Location Sharing Disabled', 'Real-time GPS broadcast suspended.', 'info');
      } else {
        await api.startLocationSharing();
        setLocation(prev => ({ ...prev, sharing: true }));
        showToast('Location Sharing Active', 'GPS broadcast streaming to guardians.', 'success');
      }
      await refreshAllData();
    } catch (err) {
      showToast('Location Error', 'Failed to toggle location sharing.', 'error');
    }
  };

  const handleResolveIncident = async (id: string) => {
    try {
      await api.resolveIncident(id);
      showToast('Incident Resolved', `Case #${id} verified safe and closed.`, 'success');
      await refreshAllData();
    } catch (err) {
      showToast('Resolve Error', 'Could not resolve incident.', 'error');
    }
  };

  const handleMarkFalseAlarm = async (id: string) => {
    try {
      await api.markFalseAlarm(id);
      showToast('False Alarm Recorded', `Case #${id} recorded as safe false positive.`, 'info');
      await refreshAllData();
    } catch (err) {
      showToast('Error', 'Failed to update incident.', 'error');
    }
  };

  const handleAddGuardian = async (g: Omit<GuardianContact, 'id'>) => {
    try {
      await api.addGuardian(g);
      showToast('Guardian Added', `${g.name} added to emergency responder circle.`, 'success');
      await refreshAllData();
    } catch (err) {
      showToast('Error', 'Could not save guardian.', 'error');
    }
  };

  const handleDeleteGuardian = async (id: string) => {
    try {
      await api.deleteGuardian(id);
      showToast('Guardian Removed', 'Contact removed from circle.', 'info');
      await refreshAllData();
    } catch (err) {
      showToast('Error', 'Could not delete guardian.', 'error');
    }
  };

  const handleOpenIncidentDetail = (id: string) => {
    const inc = incidents.find(i => i.id === id);
    if (inc) {
      setDetailIncident(inc);
    }
  };

  // Demo 17-Step Runner
  const handleRunDemoStep = async (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        await handleResetDemo();
        break;
      case 2:
        showToast('Step 2: AI Online', 'Multi-modal neural monitors initialized.', 'info');
        break;
      case 3:
        await handleUpdateSignals({ movementSuspicious: true });
        break;
      case 4:
        await handleUpdateSignals({ audioDistress: true });
        break;
      case 5:
        await handleUpdateSignals({ locationRisk: 'high' });
        break;
      case 6:
        await handleUpdateSignals({ stalkingPattern: true });
        break;
      case 7:
        await api.simulateThreat();
        await refreshAllData();
        break;
      case 8:
        setIsVerificationModalOpen(true);
        break;
      case 9:
        setIsVerificationModalOpen(false);
        showToast('Step 9: Threat Verified', 'Autonomous human verification confirmed.', 'warning');
        break;
      case 10:
        await handleActivateSilentSOS();
        break;
      case 11:
        await api.startLocationSharing();
        await refreshAllData();
        break;
      case 12:
        showToast('Step 12: Guardian Alerted', 'Simulated SMS received by Priya Sharma.', 'success');
        break;
      case 13:
        showToast('Step 13: Evidence Captured', 'Audio snippet and sensor log packaged.', 'info');
        break;
      case 14:
        showToast('Step 14: SHA-256 Digest', 'Cryptographic hash stamp created.', 'info');
        break;
      case 15:
        if (evidence[0]) {
          const res = await api.verifyEvidence(evidence[0].id);
          showToast('Step 15: Evidence Verified', res.message, 'success');
        }
        break;
      case 16:
        setActiveTab('guardian');
        showToast('Step 16: Guardian Console', 'Viewing responder dashboard.', 'info');
        break;
      case 17:
        if (activeSOSIncident) {
          await api.resolveIncident(activeSOSIncident.id);
        } else if (incidents[0]) {
          await api.resolveIncident(incidents[0].id);
        }
        await refreshAllData();
        showToast('Step 17: Incident Resolved', 'Complete lifecycle demonstrated successfully!', 'success');
        break;
      default:
        break;
    }
  };

  const isThreatActive = assessment.riskScore >= 61;
  const activeIncidentsCount = incidents.filter(
    i => i.status === 'Active' || i.status === 'Investigating'
  ).length;

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 flex flex-col font-sans">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Main App Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onActivateSOS={handleActivateSilentSOS}
        onSimulateThreat={handleSimulateThreat}
        onResetDemo={handleResetDemo}
        activeIncidentsCount={activeIncidentsCount}
        isThreatActive={isThreatActive}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-10 h-10 border-4 border-slate-800 border-t-red-500 rounded-full animate-spin" />
            <p className="text-xs font-medium">Initializing Silent Guardian Core Telemetry...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                signals={signals}
                assessment={assessment}
                locationSharing={location.sharing}
                locationAddress={location.address}
                guardians={guardians}
                stats={stats}
                activeIncidents={incidents}
                activityLogs={activity}
                onActivateSOS={handleActivateSilentSOS}
                onSimulateThreat={handleSimulateThreat}
                onOpenIncidentDetail={handleOpenIncidentDetail}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'intelligence' && (
              <AiIntelligenceView
                signals={signals}
                assessment={assessment}
                onUpdateSignals={handleUpdateSignals}
                onSimulateThreat={handleSimulateThreat}
                onResetSignals={handleResetDemo}
              />
            )}

            {activeTab === 'location' && (
              <LiveLocationView
                location={location}
                onToggleSharing={handleToggleLocationSharing}
                onLocationUpdate={(lat, lng, addr, acc) => {
                  api.updateLocation(lat, lng, addr, acc).then(res => {
                    setLocation(prev => ({
                      ...prev,
                      latitude: res.latitude,
                      longitude: res.longitude,
                      address: res.address,
                      accuracy: res.accuracy
                    }));
                    showToast('GPS Telemetry Locked', `Coordinates: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`, 'success');
                  });
                }}
                isSosActive={!!activeSOSIncident && activeSOSIncident.status === 'Active'}
              />
            )}

            {activeTab === 'incidents' && (
              <IncidentsView
                incidents={incidents}
                onOpenIncidentDetail={handleOpenIncidentDetail}
                onResolveIncident={handleResolveIncident}
              />
            )}

            {activeTab === 'evidence' && (
              <EvidenceVaultView
                evidenceList={evidence}
                onVerifyEvidence={async id => {
                  const res = await api.verifyEvidence(id);
                  await refreshAllData();
                  return res;
                }}
                onTamperEvidence={async id => {
                  await api.tamperEvidence(id);
                  showToast('Tamper Applied', 'Cryptographic bytes corrupted to simulate evidence tampering.', 'warning');
                  await refreshAllData();
                }}
                onRestoreEvidence={async id => {
                  await api.restoreEvidence(id);
                  showToast('Original Restored', 'Authentic SHA-256 seal verified.', 'success');
                  await refreshAllData();
                }}
              />
            )}

            {activeTab === 'guardian' && (
              <GuardianHubView
                guardians={guardians}
                activeIncidents={incidents}
                onAddGuardian={handleAddGuardian}
                onDeleteGuardian={handleDeleteGuardian}
                onOpenIncidentDetail={handleOpenIncidentDetail}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'demo' && (
              <div className="space-y-6">
                <DemoStepper
                  onRunStep={handleRunDemoStep}
                  onReset={handleResetDemo}
                  currentRiskScore={assessment.riskScore}
                />
              </div>
            )}

            {activeTab === 'privacy' && (
              <PrivacyAiView
                privacy={privacy}
                onUpdatePrivacy={async updates => {
                  const updated = await api.updatePrivacy(updates);
                  setPrivacy(updated);
                  showToast('Privacy Policy Saved', 'User sensor permissions updated.', 'info');
                }}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                privacy={privacy}
                onUpdatePrivacy={async updates => {
                  const updated = await api.updatePrivacy(updates);
                  setPrivacy(updated);
                }}
                onShowToast={(t, m) => showToast(t, m, 'success')}
              />
            )}

            {activeTab === 'about' && <AboutView />}
          </>
        )}
      </main>

      {/* Interactive Modals */}
      <SilentSOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        incident={activeSOSIncident}
        onViewIncident={id => {
          handleOpenIncidentDetail(id);
          setActiveTab('incidents');
        }}
        onCancelSOS={async id => {
          await api.markFalseAlarm(id);
          await refreshAllData();
          showToast('SOS Stand-Down', 'Emergency cancelled and recorded as safe.', 'info');
        }}
      />

      <ThreatVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        assessment={assessment}
        onConfirmSOS={handleActivateSilentSOS}
        onMarkFalseAlarm={async () => {
          if (activeSOSIncident) {
            await api.markFalseAlarm(activeSOSIncident.id);
          }
          await handleResetDemo();
          showToast('Marked as Safe', 'Threat dismissed as false alarm.', 'info');
        }}
        onNotifyGuardianOnly={async () => {
          showToast('Discreet Guardian Alert', 'Guardian notified privately without triggering sirens.', 'info');
          await refreshAllData();
        }}
      />

      <IncidentDetailModal
        isOpen={!!detailIncident}
        onClose={() => setDetailIncident(null)}
        incident={detailIncident}
        onResolve={handleResolveIncident}
        onMarkFalseAlarm={handleMarkFalseAlarm}
        onViewEvidence={evId => {
          setDetailIncident(null);
          setActiveTab('evidence');
        }}
      />

      {/* Footer */}
      <footer className="bg-[#09090b] border-t border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center text-xs font-bold">🛡️</span>
            <span className="font-bold text-slate-300">Silent Guardian AI</span>
            <span>• Hackathon Prototype & Proof of Concept</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>SENSE → ASSESS → RESPOND → PROVE</span>
            <span className="text-emerald-500 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Engine Live
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
