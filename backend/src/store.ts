import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import {
  Incident,
  EvidenceRecord,
  GuardianContact,
  ActivityEvent,
  SafetySignals,
  SystemStats,
  PrivacySettings
} from './types.js';
import { calculateRisk } from './riskEngine.js';

export function generateSha256(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

const DATA_FILE = path.join(process.cwd(), 'data', 'database.json');

interface DatabaseSchema {
  signals: SafetySignals;
  locationSharing: boolean;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    accuracy: number;
    lastUpdated: string;
  };
  guardians: GuardianContact[];
  incidents: Incident[];
  evidence: EvidenceRecord[];
  activity: ActivityEvent[];
  stats: SystemStats;
  privacy: PrivacySettings;
}

const defaultSignals: SafetySignals = {
  audioDistress: false,
  movementSuspicious: false,
  locationRisk: 'low',
  stalkingPattern: false,
  timeRisk: false,
  userSos: false
};

const defaultLocation = {
  latitude: 12.9716,
  longitude: 77.5946,
  address: 'Indiranagar 100ft Road, Bengaluru, KA 560038',
  accuracy: 4.8,
  lastUpdated: new Date().toISOString()
};

const defaultGuardians: GuardianContact[] = [
  {
    id: 'GRD-1',
    name: 'Priya Sharma (Mother)',
    relationship: 'Mother',
    phone: '+91 98450 12345',
    email: 'priya.sharma@demo.guardian.org',
    isConnected: true,
    priority: 'Primary'
  },
  {
    id: 'GRD-2',
    name: 'Ananya Sharma (Sister)',
    relationship: 'Sister',
    phone: '+91 98450 67890',
    email: 'ananya.s@demo.guardian.org',
    isConnected: true,
    priority: 'Secondary'
  }
];

const sampleEvidencePayload1 = 'EVD-101|Audio|2026-09-05T08:12:00Z|12.9716,77.5946|Decibel spike: 89dB, acoustic distress markers detected';
const sampleEvidencePayload2 = 'EVD-102|Location|2026-09-05T08:12:05Z|12.9716,77.5946|Continuous GPS waypoint tracking: 4.8m precision';
const sampleEvidencePayload3 = 'EVD-103|System Log|2026-09-05T08:12:08Z|system|Multi-signal corroboration score 87, automatic SOS initiated';

const initialEvidence: EvidenceRecord[] = [
  {
    id: 'EVD-101',
    incidentId: 'INC-2026-001',
    type: 'Audio',
    capturedAt: new Date(Date.now() - 3600000).toISOString(),
    hash: generateSha256(sampleEvidencePayload1),
    isTampered: false,
    status: 'Verified',
    description: 'Acoustic background frequency telemetry recorded during trigger',
    metadata: {
      format: 'WAV 16-bit 44.1kHz',
      fileSize: '482 KB',
      duration: '15 seconds',
      coordinates: '12.9716° N, 77.5946° E',
      dataPayloadSample: sampleEvidencePayload1
    }
  },
  {
    id: 'EVD-102',
    incidentId: 'INC-2026-001',
    type: 'Location',
    capturedAt: new Date(Date.now() - 3590000).toISOString(),
    hash: generateSha256(sampleEvidencePayload2),
    isTampered: false,
    status: 'Verified',
    description: 'Cryptographically signed high-frequency GPS breadcrumb trail',
    metadata: {
      format: 'GeoJSON Waypoint Log',
      fileSize: '64 KB',
      coordinates: '12.9716° N, 77.5946° E',
      dataPayloadSample: sampleEvidencePayload2
    }
  },
  {
    id: 'EVD-103',
    incidentId: 'INC-2026-001',
    type: 'System Log',
    capturedAt: new Date(Date.now() - 3580000).toISOString(),
    hash: generateSha256(sampleEvidencePayload3),
    isTampered: false,
    status: 'Verified',
    description: 'Deterministic risk assessment factor record at time of trigger',
    metadata: {
      format: 'JSON Audit Log',
      fileSize: '12 KB',
      dataPayloadSample: sampleEvidencePayload3
    }
  }
];

const initialIncidents: Incident[] = [
  {
    id: 'INC-2026-001',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    status: 'Resolved',
    riskScore: 78,
    riskLevel: 'HIGH',
    signals: {
      audioDistress: true,
      movementSuspicious: false,
      locationRisk: 'high',
      stalkingPattern: true,
      timeRisk: false,
      userSos: false
    },
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Indiranagar 100ft Road, Bengaluru, KA 560038',
      accuracy: 5.2
    },
    guardianStatus: 'Acknowledged',
    timeline: [
      {
        time: '20:41:02',
        title: 'Threat signal detected',
        description: 'Elevated acoustic frequencies matched distress pattern in subway underpass.',
        type: 'threat'
      },
      {
        time: '20:41:05',
        title: 'Risk score calculated',
        description: 'Multi-signal corroboration generated Risk Score 78% (HIGH).',
        type: 'system'
      },
      {
        time: '20:41:07',
        title: 'Threat verified',
        description: 'Automated prototype trigger initiated verification protocol.',
        type: 'system'
      },
      {
        time: '20:41:08',
        title: 'Silent SOS activated',
        description: 'Emergency beacon established without audible sound or screen flashing.',
        type: 'sos'
      },
      {
        time: '20:41:09',
        title: 'Guardian notified',
        description: 'Priya Sharma (Primary Guardian) received instant SMS & push notification.',
        type: 'guardian'
      },
      {
        time: '20:41:10',
        title: 'Location sharing activated',
        description: 'Real-time telemetry streaming coordinates to guardian console.',
        type: 'system'
      },
      {
        time: '20:41:12',
        title: 'Evidence record created',
        description: 'Audio snippet and sensor metadata cryptographically hashed (SHA-256).',
        type: 'evidence'
      },
      {
        time: '21:10:00',
        title: 'Incident resolved',
        description: 'User confirmed safe arrival with guardian; case status closed.',
        type: 'resolved'
      }
    ],
    evidenceIds: ['EVD-101', 'EVD-102', 'EVD-103'],
    notes: 'Demo historical incident showing complete resolved lifecycle.'
  }
];

const initialActivity: ActivityEvent[] = [
  {
    id: 'ACT-1',
    timestamp: new Date().toLocaleTimeString(),
    message: 'System active: Sensor monitoring online and baseline calibrated',
    category: 'system'
  },
  {
    id: 'ACT-2',
    timestamp: new Date(Date.now() - 1200000).toLocaleTimeString(),
    message: 'Location sharing active (4.8m accuracy)',
    category: 'system'
  },
  {
    id: 'ACT-3',
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
    message: 'Prior Incident INC-2026-001 resolved safely',
    category: 'resolve'
  }
];

class MemoryStore {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch {
      // fallback to defaults if file corrupt or unreadable
    }

    return {
      signals: { ...defaultSignals },
      locationSharing: true,
      location: { ...defaultLocation },
      guardians: [...defaultGuardians],
      incidents: [...initialIncidents],
      evidence: [...initialEvidence],
      activity: [...initialActivity],
      stats: {
        threatsDetected: 1,
        sosAlerts: 1,
        totalIncidents: 1,
        evidenceRecords: 3,
        resolvedIncidents: 1
      },
      privacy: {
        locationMonitoring: true,
        audioMonitoring: true,
        emergencyAlerts: true,
        evidenceCapture: true
      }
    };
  }

  private persist() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch {
      // In-memory continues safely
    }
  }

  getSignals() {
    return this.data.signals;
  }

  updateSignals(newSignals: Partial<SafetySignals>) {
    this.data.signals = { ...this.data.signals, ...newSignals };
    this.persist();
    return this.data.signals;
  }

  getLocation() {
    return {
      ...this.data.location,
      sharing: this.data.locationSharing
    };
  }

  setLocationSharing(enabled: boolean) {
    this.data.locationSharing = enabled;
    this.addActivity(
      enabled ? 'Location sharing activated (live stream enabled)' : 'Location sharing disabled by user',
      'system'
    );
    this.persist();
    return this.data.locationSharing;
  }

  updateLocationCoords(lat: number, lng: number, address?: string, accuracy?: number) {
    this.data.location.latitude = lat;
    this.data.location.longitude = lng;
    if (address) this.data.location.address = address;
    if (accuracy) this.data.location.accuracy = accuracy;
    this.data.location.lastUpdated = new Date().toISOString();
    this.persist();
    return this.data.location;
  }

  getGuardians() {
    return this.data.guardians;
  }

  addGuardian(guardian: Omit<GuardianContact, 'id'>) {
    const newGuardian: GuardianContact = {
      ...guardian,
      id: `GRD-${Date.now().toString().slice(-4)}`
    };
    this.data.guardians.push(newGuardian);
    this.addActivity(`Added emergency guardian: ${newGuardian.name}`, 'guardian');
    this.persist();
    return newGuardian;
  }

  updateGuardian(id: string, updates: Partial<GuardianContact>) {
    const idx = this.data.guardians.findIndex(g => g.id === id);
    if (idx !== -1) {
      this.data.guardians[idx] = { ...this.data.guardians[idx], ...updates };
      this.persist();
      return this.data.guardians[idx];
    }
    return null;
  }

  deleteGuardian(id: string) {
    const idx = this.data.guardians.findIndex(g => g.id === id);
    if (idx !== -1) {
      const removed = this.data.guardians.splice(idx, 1)[0];
      this.addActivity(`Removed guardian contact: ${removed.name}`, 'guardian');
      this.persist();
      return true;
    }
    return false;
  }

  getIncidents() {
    return this.data.incidents;
  }

  getIncident(id: string) {
    return this.data.incidents.find(inc => inc.id === id);
  }

  createIncident(params: {
    signals?: SafetySignals;
    riskScore?: number;
    riskLevel?: Incident['riskLevel'];
    source?: string;
  }) {
    const signals = params.signals || this.data.signals;
    const assessment = calculateRisk(signals);
    const score = params.riskScore !== undefined ? params.riskScore : assessment.riskScore;
    const level = params.riskLevel || assessment.riskLevel;

    const incidentId = `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    const evidenceId1 = `EVD-${Math.floor(200 + Math.random() * 800)}`;
    const evidencePayload = `${evidenceId1}|AudioCapture|${now.toISOString()}|${this.data.location.latitude},${this.data.location.longitude}|Distress acoustic telemetry`;
    const newEvidence: EvidenceRecord = {
      id: evidenceId1,
      incidentId,
      type: 'Audio',
      capturedAt: now.toISOString(),
      hash: generateSha256(evidencePayload),
      isTampered: false,
      status: 'Verified',
      description: 'Prototype high-frequency audio telemetry captured at incident onset',
      metadata: {
        format: 'WAV 16-bit 44.1kHz',
        fileSize: '512 KB',
        duration: '15 seconds',
        coordinates: `${this.data.location.latitude}° N, ${this.data.location.longitude}° E`,
        dataPayloadSample: evidencePayload
      }
    };

    this.data.evidence.unshift(newEvidence);

    const newIncident: Incident = {
      id: incidentId,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      status: 'Active',
      riskScore: score,
      riskLevel: level,
      signals: { ...signals },
      location: {
        latitude: this.data.location.latitude,
        longitude: this.data.location.longitude,
        address: this.data.location.address,
        accuracy: this.data.location.accuracy
      },
      guardianStatus: 'Notified',
      timeline: [
        {
          time: timeStr,
          title: 'Threat signal detected',
          description: assessment.factors.join(', '),
          type: 'threat'
        },
        {
          time: timeStr,
          title: 'Risk score calculated',
          description: `Corroboration risk score reached ${score}% (${level}).`,
          type: 'system'
        },
        {
          time: timeStr,
          title: 'Silent SOS activated',
          description: 'Stealth emergency channel activated. No display alerting perpetrators.',
          type: 'sos'
        },
        {
          time: timeStr,
          title: 'Guardian notified',
          description: `Prototype notification dispatched to ${this.data.guardians.map(g => g.name).join(', ')}.`,
          type: 'guardian'
        },
        {
          time: timeStr,
          title: 'Location sharing locked',
          description: 'Emergency continuous GPS beacon pinned to incident report.',
          type: 'system'
        },
        {
          time: timeStr,
          title: 'Evidence secured & hashed',
          description: `Cryptographic SHA-256 stamp created for Record #${evidenceId1}.`,
          type: 'evidence'
        }
      ],
      evidenceIds: [evidenceId1],
      notes: params.source ? `Triggered via ${params.source}` : 'Active emergency triggered'
    };

    this.data.incidents.unshift(newIncident);
    this.data.locationSharing = true;
    this.data.stats.threatsDetected += 1;
    this.data.stats.sosAlerts += 1;
    this.data.stats.totalIncidents += 1;
    this.data.stats.evidenceRecords += 1;

    this.addActivity(`🚨 Silent SOS activated: Incident ${incidentId} (Risk: ${score}%)`, 'sos');
    this.addActivity(`Guardian notification dispatched for ${incidentId}`, 'guardian');
    this.persist();

    return newIncident;
  }

  resolveIncident(id: string) {
    const inc = this.data.incidents.find(i => i.id === id);
    if (inc) {
      inc.status = 'Resolved';
      inc.updatedAt = new Date().toISOString();
      const timeStr = new Date().toTimeString().split(' ')[0];
      inc.timeline.push({
        time: timeStr,
        title: 'Incident resolved',
        description: 'Incident verified safe and closed by responder.',
        type: 'resolved'
      });
      this.data.stats.resolvedIncidents += 1;
      this.addActivity(`Incident ${id} marked as Resolved`, 'resolve');
      this.persist();
      return inc;
    }
    return null;
  }

  markFalseAlarm(id: string) {
    const inc = this.data.incidents.find(i => i.id === id);
    if (inc) {
      inc.status = 'False Alarm';
      inc.updatedAt = new Date().toISOString();
      const timeStr = new Date().toTimeString().split(' ')[0];
      inc.timeline.push({
        time: timeStr,
        title: 'Marked as false alarm',
        description: 'User initiated cancellation and confirmed safety.',
        type: 'resolved'
      });
      this.addActivity(`Incident ${id} marked as False Alarm by user`, 'system');
      this.persist();
      return inc;
    }
    return null;
  }

  getEvidence() {
    return this.data.evidence;
  }

  getEvidenceRecord(id: string) {
    return this.data.evidence.find(e => e.id === id);
  }

  addEvidence(item: Omit<EvidenceRecord, 'id' | 'hash' | 'status' | 'isTampered'>) {
    const id = `EVD-${Math.floor(200 + Math.random() * 800)}`;
    const hash = generateSha256(item.metadata.dataPayloadSample);
    const newRecord: EvidenceRecord = {
      ...item,
      id,
      hash,
      isTampered: false,
      status: 'Verified'
    };
    this.data.evidence.unshift(newRecord);
    this.data.stats.evidenceRecords += 1;
    this.addActivity(`New evidence record #${id} captured with SHA-256 seal`, 'evidence');
    this.persist();
    return newRecord;
  }

  verifyEvidence(id: string) {
    const ev = this.data.evidence.find(e => e.id === id);
    if (!ev) return null;

    // Recalculate hash on the payload sample
    const expectedHash = generateSha256(ev.metadata.dataPayloadSample);
    const isValid = !ev.isTampered && ev.hash === expectedHash;

    ev.status = isValid ? 'Verified' : 'Compromised';
    this.addActivity(
      isValid
        ? `Evidence #${id} integrity check: VERIFIED (SHA-256 match)`
        : `Evidence #${id} integrity check: COMPROMISED (Tamper detected)`,
      isValid ? 'evidence' : 'threat'
    );
    this.persist();

    return {
      id: ev.id,
      isValid,
      currentHash: ev.hash,
      expectedHash,
      status: ev.status,
      message: isValid
        ? 'Cryptographic integrity check passed. Digital seal matches original payload.'
        : 'Integrity check failed! Cryptographic hash does not match original digital seal.'
    };
  }

  tamperEvidence(id: string) {
    const ev = this.data.evidence.find(e => e.id === id);
    if (!ev) return null;

    ev.isTampered = true;
    ev.tamperedHash = generateSha256(ev.metadata.dataPayloadSample + '||TAMPERED_MODIFICATION_BYTE');
    ev.hash = ev.tamperedHash; // Corrupt stored hash
    ev.status = 'Compromised';

    this.addActivity(`⚠️ Demo simulation: Altered Evidence #${id} payload bytes`, 'threat');
    this.persist();
    return ev;
  }

  restoreEvidence(id: string) {
    const ev = this.data.evidence.find(e => e.id === id);
    if (!ev) return null;

    ev.isTampered = false;
    ev.hash = generateSha256(ev.metadata.dataPayloadSample);
    ev.tamperedHash = undefined;
    ev.status = 'Verified';

    this.addActivity(`Restored Evidence #${id} original cryptographic hash`, 'evidence');
    this.persist();
    return ev;
  }

  getActivity() {
    return this.data.activity;
  }

  addActivity(message: string, category: ActivityEvent['category']) {
    const item: ActivityEvent = {
      id: `ACT-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message,
      category
    };
    this.data.activity.unshift(item);
    if (this.data.activity.length > 50) {
      this.data.activity.pop();
    }
  }

  getStats() {
    return this.data.stats;
  }

  getPrivacy() {
    return this.data.privacy;
  }

  updatePrivacy(updates: Partial<PrivacySettings>) {
    this.data.privacy = { ...this.data.privacy, ...updates };
    this.addActivity('User updated privacy permissions', 'system');
    this.persist();
    return this.data.privacy;
  }

  // Threat simulation
  simulateThreat() {
    this.data.signals = {
      audioDistress: true,
      movementSuspicious: true,
      locationRisk: 'high',
      stalkingPattern: true,
      timeRisk: false,
      userSos: false
    };

    // Calculate risk
    const assessment = calculateRisk(this.data.signals);
    const targetScore = 87;

    const incident = this.createIncident({
      signals: this.data.signals,
      riskScore: targetScore,
      riskLevel: 'HIGH',
      source: 'Threat Simulation'
    });

    this.addActivity('🧪 Threat simulation activated: Multi-signal distress trigger', 'threat');
    this.persist();

    return {
      signals: this.data.signals,
      riskScore: targetScore,
      riskLevel: 'HIGH',
      incident,
      assessment
    };
  }

  resetDemo() {
    this.data.signals = { ...defaultSignals };
    this.data.locationSharing = true;
    this.data.location = { ...defaultLocation };
    this.data.guardians = [...defaultGuardians];
    this.data.incidents = [...initialIncidents];
    this.data.evidence = [...initialEvidence];
    this.data.activity = [
      {
        id: `ACT-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        message: 'System reset to clean prototype baseline state',
        category: 'system'
      },
      ...initialActivity
    ];
    this.data.stats = {
      threatsDetected: 1,
      sosAlerts: 1,
      totalIncidents: 1,
      evidenceRecords: 3,
      resolvedIncidents: 1
    };
    this.persist();
    return { success: true, message: 'Demo state reset successfully' };
  }
}

export const store = new MemoryStore();
