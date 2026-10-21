'use client';

import { useEffect, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Filter,
  Globe2,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { SourceRegistryItem } from '@/types';

export default function AdminSourcesPage() {
  const [sources, setSources] = useState<SourceRegistryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filters
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Syncing state
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [syncNotification, setSyncNotification] = useState<string | null>(null);

  // Add Source Form State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newSource, setNewSource] = useState<{
    sourceCode: string;
    name: string;
    priority: 1 | 2 | 3 | 4;
    category: 'official_bpsc' | 'previous_year_archive' | 'authorized_book' | 'expert_authored';
    baseUrl: string;
    termsSummary: string;
    rightsStatus: 'public_domain' | 'metadata_only' | 'licensed' | 'restricted';
    syncSchedule: 'manual' | 'daily' | 'weekly';
    notes: string;
  }>({
    sourceCode: '',
    name: '',
    priority: 1,
    category: 'official_bpsc',
    baseUrl: '',
    termsSummary: '',
    rightsStatus: 'public_domain',
    syncSchedule: 'manual',
    notes: '',
  });

  const fetchSources = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/sources');
      const json = await res.json();
      if (json.success) {
        setSources(json.data);
      } else {
        setErrorMsg(json.error || 'Failed to load source registry');
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error fetching sources');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const handleSyncSource = async (sourceId: string) => {
    setSyncingId(sourceId);
    setSyncNotification(null);
    try {
      const res = await fetch('/api/sources/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId }),
      });
      const json = await res.json();
      if (json.success) {
        setSyncNotification(json.message);
        // Refresh sources list
        await fetchSources();
      } else {
        setSyncNotification(`Sync notice: ${json.error}`);
      }
    } catch (err: unknown) {
      setSyncNotification(err instanceof Error ? err.message : 'Sync failed');
    } finally {
      setSyncingId(null);
    }
  };

  const handleCreateSource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSource),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setNewSource({
          sourceCode: '',
          name: '',
          priority: 1,
          category: 'official_bpsc',
          baseUrl: '',
          termsSummary: '',
          rightsStatus: 'public_domain',
          syncSchedule: 'manual',
          notes: '',
        });
        await fetchSources();
      } else {
        alert(json.error || 'Failed to create source');
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Creation failed');
    }
  };

  // Filter logic
  const filteredSources = sources.filter((s) => {
    if (selectedPriority !== 'all' && s.priority.toString() !== selectedPriority) return false;
    if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.sourceCode.toLowerCase().includes(q) ||
        s.baseUrl.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const p1Count = sources.filter((s) => s.priority === 1).length;
  const p2Count = sources.filter((s) => s.priority === 2).length;
  const p3Count = sources.filter((s) => s.priority === 3).length;
  const p4Count = sources.filter((s) => s.priority === 4).length;
  const syncedCount = sources.filter((s) => s.lastSyncStatus === 'synced').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest">
            <Globe2 className="h-4 w-4" />
            <span>Traceable Authority Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Source Registry & Provenance Manager
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Manage legitimate, verified sources across 4 distinct priorities: BPSC official notices (P1), secondary question archives (P2), authorized reference books (P3), and expert practice questions (P4).
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Register New Source</span>
        </button>
      </div>

      {syncNotification && (
        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>{syncNotification}</span>
          </div>
          <button
            onClick={() => setSyncNotification(null)}
            className="text-xs text-indigo-500 hover:text-indigo-800 font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Registered</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{sources.length}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">P1: Official BPSC</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{p1Count}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">P2: Past Archives</span>
            <span className="h-2 w-2 rounded-full bg-sky-500" />
          </div>
          <p className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">{p2Count}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">P3: Books (B01-B19)</span>
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{p3Count}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">P4: Verified Practice</span>
            <span className="h-2 w-2 rounded-full bg-purple-500" />
          </div>
          <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">{p4Count}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by source code, title, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <option value="all">All Priorities</option>
            <option value="1">Priority 1 (Official BPSC)</option>
            <option value="2">Priority 2 (Past Archives)</option>
            <option value="3">Priority 3 (Authorized Books)</option>
            <option value="4">Priority 4 (Verified Practice)</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <option value="all">All Categories</option>
            <option value="official_bpsc">Official BPSC</option>
            <option value="previous_year_archive">Past Year Archive</option>
            <option value="authorized_book">Authorized Book</option>
            <option value="expert_authored">Expert Practice</option>
          </select>
        </div>

        <button
          onClick={fetchSources}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 text-xs flex items-center gap-1.5"
          title="Refresh Registry"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Sources List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Priority / Code</th>
                <th className="py-3 px-4">Source Title & URL</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Content Rights</th>
                <th className="py-3 px-4">Sync Status</th>
                <th className="py-3 px-4">Last Checked</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSources.map((source) => {
                const isSyncing = syncingId === source.id;

                let priorityBadge = 'bg-slate-100 text-slate-700';
                if (source.priority === 1) priorityBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
                if (source.priority === 2) priorityBadge = 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300';
                if (source.priority === 3) priorityBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
                if (source.priority === 4) priorityBadge = 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';

                return (
                  <tr key={source.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${priorityBadge}`}>
                          P{source.priority}
                        </span>
                        <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                          {source.sourceCode}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                      <div className="font-semibold text-slate-900 dark:text-white truncate">
                        {source.name}
                      </div>
                      <a
                        href={source.baseUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 mt-0.5 truncate max-w-xs"
                      >
                        <span>{source.baseUrl}</span>
                        <ArrowUpRight className="h-3 w-3 shrink-0" />
                      </a>
                      {source.termsSummary && (
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 italic">
                          Terms: {source.termsSummary}
                        </p>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap capitalize text-slate-600 dark:text-slate-400 font-medium">
                      {source.category.replace(/_/g, ' ')}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                          source.rightsStatus === 'public_domain'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : source.rightsStatus === 'metadata_only'
                            ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400'
                            : source.rightsStatus === 'licensed'
                            ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400'
                            : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                        }`}
                      >
                        {source.rightsStatus.replace(/_/g, ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {source.lastSyncStatus === 'synced' && (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Synced</span>
                          </span>
                        )}
                        {source.lastSyncStatus === 'pending' && (
                          <span className="inline-flex items-center gap-1 text-amber-500 font-medium">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>Pending</span>
                          </span>
                        )}
                        {source.lastSyncStatus === 'blocked_terms' && (
                          <span className="inline-flex items-center gap-1 text-rose-600 font-medium" title={source.errorLog}>
                            <ShieldAlert className="h-3.5 w-3.5" />
                            <span>Terms Blocked</span>
                          </span>
                        )}
                        {source.lastSyncStatus === 'failed' && (
                          <span className="inline-flex items-center gap-1 text-rose-600 font-medium" title={source.errorLog}>
                            <XCircle className="h-3.5 w-3.5" />
                            <span>Failed</span>
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {source.lastCheckedAt
                        ? new Date(source.lastCheckedAt).toLocaleDateString()
                        : 'Never'}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <button
                        disabled={isSyncing}
                        onClick={() => handleSyncSource(source.id)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px] inline-flex items-center gap-1 disabled:opacity-50"
                      >
                        <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>{isSyncing ? 'Checking...' : 'Check & Sync'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Source Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Register Legitimate Source
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSource} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Source Code</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. src-bpsc-51st-notice-02"
                  value={newSource.sourceCode}
                  onChange={(e) => setNewSource({ ...newSource, sourceCode: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Source Name / Document Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. BPSC 51st Special BCS Official Notice"
                  value={newSource.name}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Priority</label>
                  <select
                    value={newSource.priority}
                    onChange={(e) => setNewSource({ ...newSource, priority: Number(e.target.value) as 1 | 2 | 3 | 4 })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value={1}>1: Official BPSC</option>
                    <option value={2}>2: Past Archive</option>
                    <option value={3}>3: Authorized Book</option>
                    <option value={4}>4: Verified Practice</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Content Rights</label>
                  <select
                    value={newSource.rightsStatus}
                    onChange={(e) => setNewSource({ ...newSource, rightsStatus: e.target.value as any })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="public_domain">Public Domain</option>
                    <option value="metadata_only">Metadata Only (No Scraping)</option>
                    <option value="licensed">Licensed / Authorized</option>
                    <option value="restricted">Restricted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Base / Document URL</label>
                <input
                  required
                  type="url"
                  placeholder="https://bpsc.gov.bd/..."
                  value={newSource.baseUrl}
                  onChange={(e) => setNewSource({ ...newSource, baseUrl: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Terms / Provenance Summary</label>
                <textarea
                  rows={2}
                  placeholder="Summarize permitted usage, robots policy, license terms..."
                  value={newSource.termsSummary}
                  onChange={(e) => setNewSource({ ...newSource, termsSummary: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-xs"
                >
                  Save Source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
