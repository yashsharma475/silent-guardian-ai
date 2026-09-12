import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Users,
  Eye,
  ShieldCheck,
  XCircle
} from 'lucide-react';
import { Incident } from '../types.js';

interface IncidentsViewProps {
  incidents: Incident[];
  onOpenIncidentDetail: (id: string) => void;
  onResolveIncident: (id: string) => void;
}

export const IncidentsView: React.FC<IncidentsViewProps> = ({
  incidents,
  onOpenIncidentDetail,
  onResolveIncident
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredIncidents = incidents.filter(inc => {
    const matchesFilter = filterStatus === 'All' || inc.status === filterStatus;
    const matchesSearch =
      inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.riskLevel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusColors = {
    Active: 'bg-red-500/10 text-red-400 border-red-500/20',
    Investigating: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Resolved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'False Alarm': 'bg-slate-800 text-slate-400 border-slate-700'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-white">Incident Management & Case Audit</h1>
          </div>
          <p className="text-xs text-slate-400">
            Immutable log of automated threat detections, user silent SOS triggers, and response timelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-mono font-bold text-slate-200 border border-slate-700">
            {incidents.length} Total Records
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, location, or risk..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#09090b] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 transition"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {['All', 'Active', 'Resolved', 'False Alarm'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                filterStatus === status
                  ? 'bg-red-600 text-white font-semibold shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Incident Cards / Table */}
      {filteredIncidents.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-2">
          <FileText className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">No Incidents Found</p>
          <p className="text-xs text-slate-500">
            No incident reports match your current filter criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredIncidents.map(inc => (
            <div
              key={inc.id}
              className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono font-bold text-slate-200 text-sm">{inc.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      statusColors[inc.status]
                    }`}
                  >
                    {inc.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-red-400">
                    {inc.riskScore}% {inc.riskLevel} Risk
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {new Date(inc.createdAt).toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 truncate max-w-xs">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {inc.location.address}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    Guardian: {inc.guardianStatus}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => onOpenIncidentDetail(inc.id)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Timeline</span>
                </button>

                {inc.status !== 'Resolved' && (
                  <button
                    onClick={() => onResolveIncident(inc.id)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-semibold transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Resolve</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
