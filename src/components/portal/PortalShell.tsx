'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Globe, Mail, MapPin } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Fixed Left Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0 transition-all">
        {/* Compact Top Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          selectedTrack={selectedTrack}
          onTrackChange={onTrackChange}
        />

        {/* Page Content */}
        <main className="flex-1 pb-12">{children}</main>

        {/* Sleek Dark Blue Footer Bar matching reference image */}
        <footer className="bg-[#0c2461] border-t border-blue-950 text-slate-300 text-xs py-4 px-4 sm:px-6 lg:px-8 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-slate-300">
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Globe className="h-3.5 w-3.5 text-blue-400" />
                <span>www.bcs.vartualtutor.com</span>
              </span>
              <a
                href="mailto:support@vartualtutor.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-emerald-400" />
                <span>support@vartualtutor.com</span>
              </a>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors hidden sm:flex">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                <span>BPSC Cadre Hub, Agargaon, Dhaka</span>
              </span>
            </div>

            <div className="text-slate-400 text-[11px]">
              &copy; {new Date().getFullYear()} BCS Crack • Smart BPSC Exam Preparation. All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
