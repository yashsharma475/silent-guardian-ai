import React, { useState } from 'react';
import {
  Lock,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Layers,
  FileText
} from 'lucide-react';
import { EvidenceRecord } from '../types.js';
import { EvidenceTamperModal } from '../components/EvidenceTamperModal.js';

interface EvidenceVaultViewProps {
  evidenceList: EvidenceRecord[];
  onVerifyEvidence: (id: string) => Promise<{ isValid: boolean; message: string }>;
  onTamperEvidence: (id: string) => Promise<void>;
  onRestoreEvidence: (id: string) => Promise<void>;
}

export const EvidenceVaultView: React.FC<EvidenceVaultViewProps> = ({
  evidenceList,
  onVerifyEvidence,
  onTamperEvidence,
  onRestoreEvidence
}) => {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceRecord | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyHash = (id: string, hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <Lock className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-white">Cryptographic Evidence Vault</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
              SHA-256 Sealed
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Preserves chain-of-custody integrity for judicial admissibility. Raw audio/spatial telemetry is stored off-chain while mathematical cryptographic digital digests prevent unauthorized modification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-xs font-mono font-bold text-slate-200 border border-slate-700">
            {evidenceList.length} Sealed Records
          </span>
        </div>
      </div>

      {/* Architecture Concept Callout Card */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
          <span className="text-slate-300 block mb-1 font-semibold">1. Off-Chain Private Media</span>
          <p className="text-slate-400 text-[11px]">
            Sensitive voice clips and sensor logs remain confidential on user-controlled encrypted storage.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
          <span className="text-slate-300 block mb-1 font-semibold">2. SHA-256 Digest Seal</span>
          <p className="text-slate-400 text-[11px]">
            One-way cryptographic hash computed at capture timestamp. Changing 1 single bit flips the digest.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-[#09090b] border border-slate-800">
          <span className="text-slate-300 block mb-1 font-semibold">3. Tamper Verification</span>
          <p className="text-slate-400 text-[11px]">
            Auditors compare on-chain digest against off-chain source to prove zero falsification.
          </p>
        </div>
      </div>

      {/* Evidence Table */}
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Secured Digital Evidence Manifest
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Prototype Evidence Integrity System
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {evidenceList.map(record => (
            <div
              key={record.id}
              className="p-5 hover:bg-slate-800/20 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono font-bold text-slate-200 text-sm">{record.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    Type: {record.type}
                  </span>
                  <span className="text-xs text-slate-400">
                    Linked Incident: <span className="font-mono text-slate-200">{record.incidentId}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      record.isTampered
                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}
                  >
                    {record.isTampered ? '⚠️ Compromised (Tamper Demo)' : '✓ Verified Authentic'}
                  </span>
                </div>

                <p className="text-xs text-slate-300">{record.description}</p>

                {/* Hash Display */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">SHA-256:</span>
                  <code className="px-2 py-0.5 rounded bg-[#09090b] border border-slate-800 font-mono text-[11px] text-slate-300 truncate max-w-md">
                    {record.hash}
                  </code>
                  <button
                    onClick={() => handleCopyHash(record.id, record.hash)}
                    className="p-1 rounded text-slate-400 hover:text-white transition"
                    title="Copy Hash"
                  >
                    {copiedId === record.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedEvidence(record)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-900/30 transition"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify / Tamper Demo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail & Tamper Testing Modal */}
      {selectedEvidence && (
        <EvidenceTamperModal
          isOpen={!!selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
          evidence={selectedEvidence}
          onVerify={onVerifyEvidence}
          onTamper={async id => {
            await onTamperEvidence(id);
            // Refresh modal state
            const updated = evidenceList.find(e => e.id === id);
            if (updated) setSelectedEvidence({ ...updated, isTampered: true });
          }}
          onRestore={async id => {
            await onRestoreEvidence(id);
            const updated = evidenceList.find(e => e.id === id);
            if (updated) setSelectedEvidence({ ...updated, isTampered: false });
          }}
        />
      )}
    </div>
  );
};
