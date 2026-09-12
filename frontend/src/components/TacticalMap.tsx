import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Shield,
  AlertTriangle,
  Layers,
  Crosshair,
  Maximize2,
  Minimize2,
  RefreshCw,
  Info
} from 'lucide-react';
import { SafetyZone } from '../types.js';

interface TacticalMapProps {
  latitude: number;
  longitude: number;
  accuracy: number;
  address: string;
  isSharing: boolean;
  onToggleSharing: () => void;
  onLocationUpdate?: (lat: number, lng: number, address: string, accuracy: number) => void;
  isSosActive?: boolean;
}

const DEMO_ZONES: SafetyZone[] = [
  {
    id: 'ZONE-A',
    name: 'Sector 4 Metro Concourse & Plaza',
    risk: 'Low',
    reason: 'Active CCTV coverage, bright street lighting, constant foot traffic',
    incidentDensity: '0.2 / km²',
    coords: [12.973, 77.597],
    radiusMeters: 300
  },
  {
    id: 'ZONE-B',
    name: '8th Cross Commercial Alley',
    risk: 'Medium',
    reason: 'Intermittent illumination after 22:00, mixed commercial storage',
    incidentDensity: '1.4 / km²',
    coords: [12.969, 77.592],
    radiusMeters: 250
  },
  {
    id: 'ZONE-C',
    name: 'Subway Underpass Transit Corridor',
    risk: 'High',
    reason: 'Zero pedestrian surveillance, blind corners, isolated transit exit',
    incidentDensity: '4.8 / km²',
    coords: [12.9716, 77.5946],
    radiusMeters: 350
  }
];

export const TacticalMap: React.FC<TacticalMapProps> = ({
  latitude,
  longitude,
  accuracy,
  address,
  isSharing,
  onToggleSharing,
  onLocationUpdate,
  isSosActive
}) => {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedZone, setSelectedZone] = useState<SafetyZone | null>(DEMO_ZONES[2]); // Default high risk underpass selected
  const [gpsLoading, setGpsLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(16);

  // Allow browser real GPS lookup if available
  const handleAcquireRealGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setGpsLoading(false);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = pos.coords.accuracy || 5.0;
        if (onLocationUpdate) {
          onLocationUpdate(lat, lng, `Device Browser GPS Position (±${acc.toFixed(1)}m)`, acc);
        }
      },
      err => {
        setGpsLoading(false);
        alert(`Could not acquire hardware GPS (${err.message}). Using calibrated hackathon demo coordinates.`);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="rounded-2xl bg-[#09090b] border border-slate-800 shadow-xl overflow-hidden flex flex-col">
      {/* Map Control Bar */}
      <div className="bg-slate-900/40 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 text-xs font-semibold text-slate-200 border border-slate-700">
            <span
              className={`w-2 h-2 rounded-full ${
                isSharing ? 'bg-emerald-400 animate-ping' : 'bg-red-500'
              }`}
            ></span>
            <span>{isSharing ? 'Sharing Active' : 'Sharing Disabled'}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <span>GPS:</span>
            <span className="text-slate-200 font-bold">±{accuracy}m</span>
          </div>
        </div>

        {/* Map Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
              showHeatmap
                ? 'bg-red-600/20 text-red-300 border-red-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Heatmap Overlay</span>
          </button>

          <button
            onClick={handleAcquireRealGPS}
            disabled={gpsLoading}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Attempt browser hardware GPS acquisition"
          >
            <Crosshair className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin text-red-400' : ''}`} />
            <span>{gpsLoading ? 'Locating...' : 'Use My GPS'}</span>
          </button>

          <button
            onClick={onToggleSharing}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
              isSharing
                ? 'bg-red-950/40 hover:bg-red-900/50 text-red-300 border-red-800/50'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
            }`}
          >
            {isSharing ? 'Stop Sharing' : 'Start Sharing'}
          </button>
        </div>
      </div>

      {/* Main Tactical Map Viewport */}
      <div className="relative h-80 sm:h-96 w-full bg-[#09090b] overflow-hidden select-none">
        {/* Stylized Tactical Cartography Grid Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 60%),
              linear-gradient(to right, #1e293b 1px, transparent 1px),
              linear-gradient(to bottom, #1e293b 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 36px 36px, 36px 36px'
          }}
        />

        {/* Tactical Map Streets & Roads Vector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-700/40">
          <line x1="0" y1="35%" x2="100%" y2="35%" strokeWidth="4" className="stroke-slate-800" />
          <line x1="0" y1="65%" x2="100%" y2="65%" strokeWidth="6" className="stroke-slate-800/80" />
          <line x1="25%" y1="0" x2="25%" y2="100%" strokeWidth="3" className="stroke-slate-800/70" />
          <line x1="70%" y1="0" x2="70%" y2="100%" strokeWidth="5" className="stroke-slate-800" />
          <path
            d="M 10% 80% Q 40% 60% 70% 30% T 95% 15%"
            fill="none"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="stroke-red-500/30"
          />
        </svg>

        {/* Heatmap Overlay Zones */}
        {showHeatmap && (
          <div className="absolute inset-0 pointer-events-none">
            {/* High Risk Zone (Underpass corridor) */}
            <div
              className="absolute left-[48%] top-[46%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-red-600/20 border border-red-500/40 animate-pulse blur-[1px] cursor-pointer pointer-events-auto"
              onClick={() => setSelectedZone(DEMO_ZONES[2])}
              title="Zone C: High Risk (Click for details)"
            />
            {/* Medium Risk Zone */}
            <div
              className="absolute left-[28%] top-[60%] -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-amber-500/15 border border-amber-500/30 cursor-pointer pointer-events-auto"
              onClick={() => setSelectedZone(DEMO_ZONES[1])}
              title="Zone B: Medium Risk"
            />
            {/* Low Risk Safe Zone */}
            <div
              className="absolute left-[75%] top-[25%] -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-emerald-500/15 border border-emerald-500/30 cursor-pointer pointer-events-auto"
              onClick={() => setSelectedZone(DEMO_ZONES[0])}
              title="Zone A: Low Risk / Safe Concourse"
            />
          </div>
        )}

        {/* Guardian Marker */}
        <div
          className="absolute left-[72%] top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-10"
          title="Guardian: Priya Sharma (1.2 km away)"
        >
          <div className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-bold text-slate-200 shadow mb-1 whitespace-nowrap group-hover:scale-105 transition">
            🛡️ Guardian: Priya (1.2km)
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-lg ring-2 ring-slate-600">
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Current User Marker (Center) */}
        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
          <div
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-lg mb-1 whitespace-nowrap border ${
              isSosActive
                ? 'bg-red-600 text-white border-red-300 animate-bounce'
                : 'bg-[#09090b]/95 text-emerald-300 border-emerald-500/60'
            }`}
          >
            {isSosActive ? '🚨 SOS EMERGENCY BEACON' : '📍 YOU (Live Coordinates)'}
          </div>

          <div className="relative flex items-center justify-center">
            {/* Pulsing Beacon Waves */}
            <div
              className={`absolute w-12 h-12 rounded-full animate-ping opacity-75 ${
                isSosActive ? 'bg-red-500' : 'bg-emerald-500'
              }`}
            />
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-white ring-4 shadow-xl ${
                isSosActive
                  ? 'bg-red-600 ring-red-400/60'
                  : 'bg-emerald-500 ring-emerald-400/40'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
        </div>

        {/* Map Controls (Zoom In / Out) */}
        <div className="absolute right-3 bottom-3 flex flex-col gap-1 z-20">
          <button
            onClick={() => setZoomLevel(prev => Math.min(18, prev + 1))}
            className="w-7 h-7 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center border border-slate-700 shadow"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(12, prev - 1))}
            className="w-7 h-7 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center border border-slate-700 shadow"
            title="Zoom Out"
          >
            -
          </button>
        </div>

        {/* Map Legend Overlay */}
        <div className="absolute left-3 bottom-3 p-2 rounded-xl bg-[#09090b]/90 backdrop-blur-sm border border-slate-800 text-[10px] space-y-1 z-20">
          <div className="font-semibold text-slate-400 mb-1 flex items-center gap-1">
            <span>Risk Heatmap Legend:</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Low
            </span>
            <span className="flex items-center gap-1 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Medium
            </span>
            <span className="flex items-center gap-1 text-red-300">
              <span className="w-2 h-2 rounded-full bg-red-400"></span> High
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Selected Area / Zone Detail Drawer */}
      {selectedZone && (
        <div className="p-4 bg-slate-900/60 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">{selectedZone.name}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  selectedZone.risk === 'High'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : selectedZone.risk === 'Medium'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {selectedZone.risk} Risk Area
              </span>
            </div>
            <p className="text-slate-300 text-[11px]">{selectedZone.reason}</p>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <div>
              <span>Report Density: </span>
              <span className="font-mono font-bold text-slate-200">
                {selectedZone.incidentDensity}
              </span>
            </div>
            <button
              onClick={() => setSelectedZone(null)}
              className="text-xs text-slate-400 hover:text-slate-200 font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Geolocation Details Bar */}
      <div className="bg-[#09090b] px-4 py-2.5 border-t border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">{address}</span>
        </div>
        <div className="font-mono text-[11px] text-slate-400 whitespace-nowrap">
          {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E • {isSharing ? 'Stream Locked' : 'Offline'}
        </div>
      </div>
    </div>
  );
};
