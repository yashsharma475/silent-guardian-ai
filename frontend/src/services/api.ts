import {
  SafetySignals,
  RiskCalculation,
  Incident,
  EvidenceRecord,
  GuardianContact,
  ActivityEvent,
  SystemStats,
  PrivacySettings
} from '../types.js';

// In production (Vercel), VITE_API_URL points to the deployed backend (e.g. Render).
// In development, it defaults to '/api' which is proxied by Vite to the local backend.
const API_BASE = ((import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')) + '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || `HTTP error ${res.status}`);
  }
  return json.data !== undefined ? json.data : json;
}

export const api = {
  getHealth: () => request<{ status: string }>('/health'),

  getSignals: () =>
    request<{ signals: SafetySignals; assessment: RiskCalculation }>('/signals'),

  updateSignals: (signals: Partial<SafetySignals>) =>
    request<{ signals: SafetySignals; assessment: RiskCalculation }>('/signals', {
      method: 'POST',
      body: JSON.stringify(signals)
    }),

  calculateRisk: (signals: Partial<SafetySignals>) =>
    request<RiskCalculation>('/risk/calculate', {
      method: 'POST',
      body: JSON.stringify(signals)
    }),

  getIncidents: () => request<Incident[]>('/incidents'),

  getIncident: (id: string) => request<Incident>(`/incidents/${id}`),

  createIncident: (params: { riskScore?: number; signals?: SafetySignals; source?: string }) =>
    request<Incident>('/incidents', {
      method: 'POST',
      body: JSON.stringify(params)
    }),

  resolveIncident: (id: string) =>
    request<Incident>(`/incidents/${id}/resolve`, { method: 'POST' }),

  markFalseAlarm: (id: string) =>
    request<Incident>(`/incidents/${id}/false-alarm`, { method: 'POST' }),

  triggerSOS: (params?: { riskScore?: number; signals?: SafetySignals; source?: string }) =>
    request<{ alertTriggered: boolean; incident: Incident; guardianNotified: boolean }>(
      '/alerts/sos',
      {
        method: 'POST',
        body: JSON.stringify(params || {})
      }
    ),

  getLocation: () =>
    request<{
      latitude: number;
      longitude: number;
      address: string;
      accuracy: number;
      sharing: boolean;
      lastUpdated: string;
    }>('/location'),

  startLocationSharing: () =>
    request<{ locationSharing: boolean }>('/location/start', { method: 'POST' }),

  stopLocationSharing: () =>
    request<{ locationSharing: boolean }>('/location/stop', { method: 'POST' }),

  updateLocation: (lat: number, lng: number, address?: string, accuracy?: number) =>
    request<{
      latitude: number;
      longitude: number;
      address: string;
      accuracy: number;
    }>('/location/update', {
      method: 'POST',
      body: JSON.stringify({ latitude: lat, longitude: lng, address, accuracy })
    }),

  getGuardians: () => request<GuardianContact[]>('/guardian'),

  addGuardian: (guardian: Omit<GuardianContact, 'id'>) =>
    request<GuardianContact>('/guardian', {
      method: 'POST',
      body: JSON.stringify(guardian)
    }),

  updateGuardian: (id: string, updates: Partial<GuardianContact>) =>
    request<GuardianContact>(`/guardian/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }),

  deleteGuardian: (id: string) =>
    request<{ success: boolean }>(`/guardian/${id}`, { method: 'DELETE' }),

  getEvidence: () => request<EvidenceRecord[]>('/evidence'),

  verifyEvidence: (id: string) =>
    request<{
      id: string;
      isValid: boolean;
      currentHash: string;
      expectedHash: string;
      status: 'Verified' | 'Compromised';
      message: string;
    }>(`/evidence/${id}/verify`, { method: 'POST' }),

  tamperEvidence: (id: string) =>
    request<EvidenceRecord>(`/evidence/${id}/tamper`, { method: 'POST' }),

  restoreEvidence: (id: string) =>
    request<EvidenceRecord>(`/evidence/${id}/restore`, { method: 'POST' }),

  getActivity: () => request<ActivityEvent[]>('/activity'),

  getStats: () => request<SystemStats>('/stats'),

  getPrivacy: () => request<PrivacySettings>('/privacy'),

  updatePrivacy: (privacy: Partial<PrivacySettings>) =>
    request<PrivacySettings>('/privacy', {
      method: 'PUT',
      body: JSON.stringify(privacy)
    }),

  simulateThreat: () =>
    request<{
      signals: SafetySignals;
      riskScore: number;
      riskLevel: string;
      incident: Incident;
      assessment: RiskCalculation;
    }>('/demo/threat', { method: 'POST' }),

  resetDemo: () => request<{ success: boolean; message: string }>('/demo/reset', { method: 'POST' })
};
