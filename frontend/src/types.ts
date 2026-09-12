export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface SafetySignals {
  audioDistress: boolean;
  movementSuspicious: boolean;
  locationRisk: 'low' | 'medium' | 'high';
  stalkingPattern: boolean;
  timeRisk: boolean;
  userSos: boolean;
}

export interface RiskCalculation {
  riskScore: number;
  riskLevel: RiskLevel;
  factors: string[];
  recommendation: string;
  timestamp: string;
}

export interface IncidentTimelineEvent {
  time: string;
  title: string;
  description: string;
  type: 'system' | 'threat' | 'sos' | 'guardian' | 'evidence' | 'resolved';
}

export interface IncidentLocation {
  latitude: number;
  longitude: number;
  address: string;
  accuracy: number;
}

export interface Incident {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'Active' | 'Investigating' | 'Resolved' | 'False Alarm';
  riskScore: number;
  riskLevel: RiskLevel;
  signals: SafetySignals;
  location: IncidentLocation;
  guardianStatus: 'Pending' | 'Notified' | 'Acknowledged' | 'En Route';
  timeline: IncidentTimelineEvent[];
  evidenceIds: string[];
  notes?: string;
}

export interface EvidenceRecord {
  id: string;
  incidentId: string;
  type: 'Audio' | 'Image' | 'Video' | 'Location' | 'System Log';
  capturedAt: string;
  hash: string;
  tamperedHash?: string;
  isTampered: boolean;
  status: 'Verified' | 'Compromised' | 'Pending';
  description: string;
  metadata: {
    format: string;
    fileSize: string;
    duration?: string;
    coordinates?: string;
    dataPayloadSample: string;
  };
}

export interface GuardianContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  isConnected: boolean;
  priority: 'Primary' | 'Secondary';
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  message: string;
  category: 'system' | 'threat' | 'sos' | 'guardian' | 'evidence' | 'resolve';
}

export interface SystemStats {
  threatsDetected: number;
  sosAlerts: number;
  totalIncidents: number;
  evidenceRecords: number;
  resolvedIncidents: number;
}

export interface PrivacySettings {
  locationMonitoring: boolean;
  audioMonitoring: boolean;
  emergencyAlerts: boolean;
  evidenceCapture: boolean;
}

export interface SafetyZone {
  id: string;
  name: string;
  risk: 'Low' | 'Medium' | 'High';
  reason: string;
  incidentDensity: string;
  coords: [number, number];
  radiusMeters: number;
}
