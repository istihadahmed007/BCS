'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ShieldCheck, Phone, MapPin, Globe } from 'lucide-react';

interface PortalShellProps {
  children: React.ReactNode;
  selectedTrack?: string;
  onTrackChange?: (track: string) => void;
}

export default function PortalShell({
  children,
  selectedTrack,
  onTrackChange,
}: PortalShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#17233F] flex flex-col font-sans antialiased">
      {/* Fixed Left Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0 transition-all">
        {/* Top Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          selectedTrack={selectedTrack}
          onTrackChange={onTrackChange}
        />

        {/* Page Content */}
        <main className="flex-1 pb-12">{children}</main>

        {/* Verification & Accreditation Bottom Strip matching reference widget style */}
        <footer className="bg-white border-t border-[#E3E8F2] text-[#66748B] text-xs py-3.5 px-4 sm:px-6 lg:px-8 mt-auto shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#17233F]">
              <ShieldCheck className="h-4 w-4 text-[#059669]" />
              <span>Official BPSC Syllabus Aligned &bull; Deterministic (-0.50) Negative Marking</span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 text-[11px] text-[#66748B]">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#6538F5]" />
                <span>Agargaon Cadre Zone, Dhaka</span>
              </span>
              <span className="hidden md:inline text-slate-300">|</span>
              <span className="flex items-center gap-1 font-mono">
                <Phone className="h-3.5 w-3.5 text-[#6538F5]" />
                <span>+880 1800 456 280</span>
              </span>
              <span className="hidden md:inline text-slate-300">|</span>
              <span>&copy; {new Date().getFullYear()} BCS Vartual Tutor</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
