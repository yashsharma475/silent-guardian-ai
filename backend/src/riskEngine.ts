import { SafetySignals, RiskCalculation, RiskLevel } from './types.js';

/**
 * Prototype Explainable Risk Engine
 * Rules-based weighted scoring system that combines multi-sensor inputs into a normalized risk score.
 */
export function calculateRisk(signals: Partial<SafetySignals>): RiskCalculation {
  let score = 10; // Baseline ambient environmental score
  const factors: string[] = [];

  if (signals.audioDistress) {
    score += 20;
    factors.push('Distress acoustic frequency signature detected');
  }

  if (signals.movementSuspicious) {
    score += 20;
    factors.push('Abnormal velocity/rapid pace deviation detected');
  }

  if (signals.locationRisk === 'high') {
    score += 20;
    factors.push('Location risk: low-lit / isolated municipal zone');
  } else if (signals.locationRisk === 'medium') {
    score += 10;
    factors.push('Location risk: moderate historical report density');
  }

  if (signals.stalkingPattern) {
    score += 25;
    factors.push('Repeated trajectory proximity & trailing detected');
  }

  if (signals.timeRisk) {
    score += 9;
    factors.push('Off-hours transit window (late night/isolated hours)');
  }

  if (signals.userSos) {
    score += 35;
    factors.push('Explicit manual SOS trigger activated by user');
  }

  // Ensure bounds
  score = Math.min(100, Math.max(0, score));

  let riskLevel: RiskLevel = 'LOW';
  let recommendation = 'Environmental signals within normal baseline thresholds.';

  if (score >= 81) {
    riskLevel = 'CRITICAL';
    recommendation = 'Critical danger suspected. Silent SOS triggered and immediate guardian dispatch recommended.';
  } else if (score >= 61) {
    riskLevel = 'HIGH';
    recommendation = 'High threat probability. Human verification prompt initiated; prepare silent escalation.';
  } else if (score >= 31) {
    riskLevel = 'MEDIUM';
    recommendation = 'Elevated ambient risk. Heightened sensor telemetry and background location tracking activated.';
  }

  if (factors.length === 0) {
    factors.push('Nominal sensor signals; no anomalous patterns detected');
  }

  return {
    riskScore: score,
    riskLevel,
    factors,
    recommendation,
    timestamp: new Date().toISOString()
  };
}
