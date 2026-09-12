import React, { useState } from 'react';
import {
  X,
  Lock,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { EvidenceRecord } from '../types.js';

interface EvidenceTamperModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: EvidenceRecord | null;
  onVerify: (id: string) => Promise<{ isValid: boolean; message: string }>;
  onTamper: (id: string) => Promise<void>;
  onRestore: (id: string) => Promise<void>;
}

export const EvidenceTamperModal: React.FC<EvidenceTamperModalProps> = ({
  isOpen,
  onClose,
  evidence,
  onVerify,
  onTamper,
  onRestore
}) => {
  const [copied, setCopied] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    tested: boolean;
    isValid: boolean;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !evidence) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(evidence.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunVerification = async () => {
    setLoading(true);
    try {
      const res = await onVerify(evidence.id);
      setVerificationResult({
        tested: true,
        isValid: res.isValid,
        message: res.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateTamper = async () => {
    setLoading(true);
    try {
      await onTamper(evidence.id);
      setVerificationResult({
        tested: true,
        isValid: false,
        message: '⚠️ Tamper simulation applied! Modified underlying raw payload bits.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      await onRestore(evidence.id);
      setVerificationResult({
        tested: true,
        isValid: true,
        message: '✓ Original digital payload restored and verified with authoritative seal.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#09090b] border border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900/60 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Cryptographic Evidence Vault</h2>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    evidence.isTampered
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  {evidence.isTampered ? 'Tampered Simulation' : 'Authentic Original'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Record ID: {evidence.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Metadata Card */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-slate-400 block mb-1">Evidence Type</span>
              <span className="font-bold text-slate-200 text-sm">{evidence.type}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-slate-400 block mb-1">Captured At</span>
              <span className="font-mono text-slate-200 text-xs">
                {new Date(evidence.capturedAt).toLocaleString()}
              </span>
            </div>
          </div>

          {/* SHA-256 Digital Hash Stamp */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-red-400" />
                SHA-256 Digital Integrity Hash
              </span>
              <button
                onClick={handleCopyHash}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Hash'}</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800 font-mono text-xs break-all select-all text-slate-200">
              {evidence.hash}
            </div>
            <p className="text-[11px] text-slate-400">
              Off-chain evidence storage with cryptographic on-chain / audit seal. Ensures tamper resistance for judicial review.
            </p>
          </div>

          {/* Payload Sample */}
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs space-y-1">
            <span className="text-slate-400 font-medium block">Raw Payload Sample:</span>
            <code className="text-[11px] font-mono text-slate-300 block bg-[#09090b] p-2 rounded border border-slate-800 break-all">
              {evidence.metadata.dataPayloadSample}
            </code>
          </div>

          {/* Verification Result Callout */}
          {verificationResult && (
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
                verificationResult.isValid
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-red-950/40 border-red-500/50 text-red-200'
              }`}
            >
              {verificationResult.isValid ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-sm">
                  {verificationResult.isValid ? '✓ Evidence Verified' : '⚠️ Integrity Check Failed!'}
                </p>
                <p className="text-xs mt-0.5 opacity-90">{verificationResult.message}</p>
              </div>
            </div>
          )}

          {/* Hackathon Demonstration Controls */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2.5">
            <button
              onClick={handleRunVerification}
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-900/30 transition disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Evidence Hash</span>
            </button>

            {evidence.isTampered ? (
              <button
                onClick={handleRestore}
                disabled={loading}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-700/50 hover:bg-emerald-700 border border-emerald-500/50 text-emerald-200 text-xs font-semibold transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restore Original</span>
              </button>
            ) : (
              <button
                onClick={handleSimulateTamper}
                disabled={loading}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 text-red-300 text-xs font-semibold transition"
                title="Demonstrate cryptographic defense against evidence tampering"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Simulate Tampering</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-900/60 px-6 py-2.5 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Prototype evidence integrity system</span>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-medium">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
