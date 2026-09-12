import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { store } from './store.js';
import { calculateRisk } from './riskEngine.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS) for Vercel and local frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Root health check
app.get('/', (req: Request, res: Response) => {
  res.json({
    service: 'Silent Guardian AI - REST API Backend',
    status: 'online',
    version: '1.0.0-hackathon',
    docs: '/api/health'
  });
});

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Silent Guardian AI Core API',
    version: '1.0.0-hackathon'
  });
});

// Signals & Risk Calculation
app.get('/api/signals', (req: Request, res: Response) => {
  const signals = store.getSignals();
  const assessment = calculateRisk(signals);
  res.json({
    success: true,
    data: {
      signals,
      assessment
    }
  });
});

app.post('/api/signals', (req: Request, res: Response) => {
  const updated = store.updateSignals(req.body);
  const assessment = calculateRisk(updated);
  res.json({
    success: true,
    data: {
      signals: updated,
      assessment
    }
  });
});

app.post('/api/risk/calculate', (req: Request, res: Response) => {
  const signals = req.body || {};
  const assessment = calculateRisk(signals);
  res.json({
    success: true,
    data: assessment
  });
});

// Incidents
app.get('/api/incidents', (req: Request, res: Response) => {
  const incidents = store.getIncidents();
  res.json({
    success: true,
    data: incidents
  });
});

app.get('/api/incidents/:id', (req: Request, res: Response) => {
  const incident = store.getIncident(req.params.id);
  if (!incident) {
    return res.status(404).json({ success: false, error: 'Incident not found' });
  }
  res.json({
    success: true,
    data: incident
  });
});

app.post('/api/incidents', (req: Request, res: Response) => {
  const incident = store.createIncident(req.body);
  res.status(201).json({
    success: true,
    data: incident
  });
});

app.post('/api/incidents/:id/resolve', (req: Request, res: Response) => {
  const incident = store.resolveIncident(req.params.id);
  if (!incident) {
    return res.status(404).json({ success: false, error: 'Incident not found' });
  }
  res.json({
    success: true,
    data: incident
  });
});

app.post('/api/incidents/:id/false-alarm', (req: Request, res: Response) => {
  const incident = store.markFalseAlarm(req.params.id);
  if (!incident) {
    return res.status(404).json({ success: false, error: 'Incident not found' });
  }
  res.json({
    success: true,
    data: incident
  });
});

// Alerts & SOS
app.get('/api/alerts', (req: Request, res: Response) => {
  const incidents = store.getIncidents();
  const activeAlerts = incidents.filter(i => i.status === 'Active' || i.status === 'Investigating');
  res.json({
    success: true,
    data: activeAlerts
  });
});

app.post('/api/alerts/sos', (req: Request, res: Response) => {
  const { riskScore, signals, source } = req.body;
  const incident = store.createIncident({
    riskScore: riskScore || 87,
    riskLevel: 'HIGH',
    signals,
    source: source || 'User Silent SOS Activation'
  });

  res.json({
    success: true,
    data: {
      alertTriggered: true,
      incident,
      guardianNotified: true,
      locationSharingActive: true,
      message: 'Silent SOS alert broadcast to connected guardians'
    }
  });
});

// Location Sharing
app.get('/api/location', (req: Request, res: Response) => {
  const loc = store.getLocation();
  res.json({
    success: true,
    data: loc
  });
});

app.post('/api/location/start', (req: Request, res: Response) => {
  const status = store.setLocationSharing(true);
  res.json({
    success: true,
    data: { locationSharing: status }
  });
});

app.post('/api/location/stop', (req: Request, res: Response) => {
  const status = store.setLocationSharing(false);
  res.json({
    success: true,
    data: { locationSharing: status }
  });
});

app.post('/api/location/update', (req: Request, res: Response) => {
  const { latitude, longitude, address, accuracy } = req.body;
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ success: false, error: 'Invalid coordinates' });
  }
  const updated = store.updateLocationCoords(latitude, longitude, address, accuracy);
  res.json({
    success: true,
    data: updated
  });
});

// Guardians
app.get('/api/guardian', (req: Request, res: Response) => {
  const guardians = store.getGuardians();
  res.json({
    success: true,
    data: guardians
  });
});

app.post('/api/guardian', (req: Request, res: Response) => {
  const { name, relationship, phone, email, priority } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'Name and phone are required' });
  }
  const created = store.addGuardian({
    name,
    relationship: relationship || 'Guardian',
    phone,
    email: email || '',
    isConnected: true,
    priority: priority || 'Secondary'
  });
  res.status(201).json({
    success: true,
    data: created
  });
});

app.put('/api/guardian/:id', (req: Request, res: Response) => {
  const updated = store.updateGuardian(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Guardian not found' });
  }
  res.json({
    success: true,
    data: updated
  });
});

app.delete('/api/guardian/:id', (req: Request, res: Response) => {
  const deleted = store.deleteGuardian(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Guardian not found' });
  }
  res.json({
    success: true,
    message: 'Guardian deleted'
  });
});

// Evidence Vault
app.get('/api/evidence', (req: Request, res: Response) => {
  const evidence = store.getEvidence();
  res.json({
    success: true,
    data: evidence
  });
});

app.post('/api/evidence', (req: Request, res: Response) => {
  const created = store.addEvidence(req.body);
  res.status(201).json({
    success: true,
    data: created
  });
});

app.post('/api/evidence/:id/verify', (req: Request, res: Response) => {
  const verification = store.verifyEvidence(req.params.id);
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Evidence record not found' });
  }
  res.json({
    success: true,
    data: verification
  });
});

app.post('/api/evidence/:id/tamper', (req: Request, res: Response) => {
  const result = store.tamperEvidence(req.params.id);
  if (!result) {
    return res.status(404).json({ success: false, error: 'Evidence record not found' });
  }
  res.json({
    success: true,
    data: result
  });
});

app.post('/api/evidence/:id/restore', (req: Request, res: Response) => {
  const result = store.restoreEvidence(req.params.id);
  if (!result) {
    return res.status(404).json({ success: false, error: 'Evidence record not found' });
  }
  res.json({
    success: true,
    data: result
  });
});

// Activity, Stats & Privacy
app.get('/api/activity', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: store.getActivity()
  });
});

app.get('/api/stats', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: store.getStats()
  });
});

app.get('/api/privacy', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: store.getPrivacy()
  });
});

app.put('/api/privacy', (req: Request, res: Response) => {
  const updated = store.updatePrivacy(req.body);
  res.json({
    success: true,
    data: updated
  });
});

// Demo Simulation
app.post('/api/demo/threat', (req: Request, res: Response) => {
  const simulation = store.simulateThreat();
  res.json({
    success: true,
    data: simulation
  });
});

app.post('/api/demo/reset', (req: Request, res: Response) => {
  const result = store.resetDemo();
  res.json({
    success: true,
    data: result
  });
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🛡️ Silent Guardian AI Backend API listening on port ${PORT}`);
});
