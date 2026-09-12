import React from 'react';
import { MapPin, Navigation, Compass, AlertTriangle, Shield, Layers, Radio } from 'lucide-react';
import { TacticalMap } from '../components/TacticalMap.js';

interface LiveLocationViewProps {
  location: {
    latitude: number;
    longitude: number;
    address: string;
    accuracy: number;
    sharing: boolean;
    lastUpdated: string;
  };
  onToggleSharing: () => void;
  onLocationUpdate?: (lat: number, lng: number, address: string, accuracy: number) => void;
  isSosActive: boolean;
}

export const LiveLocationView: React.FC<LiveLocationViewProps> = ({
  location,
  onToggleSharing,
  onLocationUpdate,
  isSosActive
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MapPin className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-white">Live Location & Tactical Radar</h1>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                location.sharing
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {location.sharing ? '● Sharing Active' : '○ Location Sharing Disabled'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time GPS coordinate telemetry streamed securely to authenticated guardians and emergency responders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSharing}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
              location.sharing
                ? 'bg-red-950/40 hover:bg-red-900/60 text-red-300 border-red-800/50'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-600/30'
            }`}
          >
            {location.sharing ? 'Stop Sharing' : 'Start Sharing'}
          </button>
        </div>
      </div>

      {/* Geolocation Status Cards (Section 12 requirement) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-1 font-medium">Location Sharing</span>
          <span
            className={`font-bold flex items-center gap-1.5 ${
              location.sharing ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                location.sharing ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'
              }`}
            />
            {location.sharing ? 'Active' : 'Disabled'}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-1 font-medium">GPS Sensor Status</span>
          <span className="font-bold text-slate-200 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            Hardware Lock
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-1 font-medium">GPS Accuracy</span>
          <span className="font-bold font-mono text-slate-200">±{location.accuracy} meters</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-1 font-medium">Latitude</span>
          <span className="font-bold font-mono text-slate-200">
            {location.latitude.toFixed(4)}° N
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-1 font-medium">Longitude</span>
          <span className="font-bold font-mono text-slate-200">
            {location.longitude.toFixed(4)}° E
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-1 font-medium">Last Telemetry</span>
          <span className="font-mono text-slate-400 text-[11px] truncate block">
            {new Date(location.lastUpdated).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Interactive Tactical Map Component */}
      <TacticalMap
        latitude={location.latitude}
        longitude={location.longitude}
        accuracy={location.accuracy}
        address={location.address}
        isSharing={location.sharing}
        onToggleSharing={onToggleSharing}
        onLocationUpdate={onLocationUpdate}
        isSosActive={isSosActive}
      />

      {/* Hackathon Requirement #15: Unsafe Area Heatmap Disclaimers */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-300">
            Demo Risk Visualization Notice
          </p>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            The risk overlays, incident heatmaps, and designated zones displayed in this prototype represent synthetic hackathon simulation data for testing spatial threat correlation. They do not constitute official municipal crime statistics or governmental safety guarantees.
          </p>
        </div>
      </div>
    </div>
  );
};
