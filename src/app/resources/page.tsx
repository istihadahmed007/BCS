'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  Filter,
  Library,
  Search,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { ALL_RESOURCES, OFFICIAL_SOURCES, REFERENCE_CATALOG } from '@/data/catalog';
import { CatalogResource } from '@/types';

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'official' | 'books'>('all');
  const [selectedResource, setSelectedResource] = useState<CatalogResource | null>(null);

  const filtered = ALL_RESOURCES.filter((r) => {
    if (selectedFilter === 'official' && r.type !== 'official_source') return false;
    if (selectedFilter === 'books' && r.type !== 'book') return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchCode = r.code.toLowerCase().includes(q);
      const matchPublisher = r.publisher?.toLowerCase().includes(q);
      const matchAuthor = r.authorEditor?.toLowerCase().includes(q);
      const matchCoverage = r.coverage?.toLowerCase().includes(q);
      return matchTitle || matchCode || matchPublisher || matchAuthor || matchCoverage;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-6">
      {/* Header */}
      <div className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-semibold">
          <Library className="h-3.5 w-3.5" />
          <span>Verified Source Registry & Bibliographic Catalog</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          BCS Crack Research Inventory & Official Sources
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 bangla-font max-w-3xl leading-relaxed">
          ৫১তম বিশেষ বিসিএস (স্বাস্থ্য) ও সাধারণ বিসিএস প্রস্তুতির ৩টি অফিসিয়াল সরকারি দলিল (S01–S03) এবং ১৯টি স্বীকৃত রেফারেন্স বই ও ডাইজেস্টের (B01–B19) যাচাইকৃত তালিকা।
        </p>
      </div>

      {/* Provenance Callout */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 text-xs flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold">Strict Distinction: Catalog Metadata vs Content Rights</span>
          <p className="leading-relaxed">
            This inventory documents available physical books, guides, and question banks with observed retail pricing and syllabus alignment. In accordance with copyright law, cataloging secondary commercial books does NOT claim ownership or permit unauthorized digitization without written licensing.
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search title, publisher, author, or code (e.g. B01, Matrix)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            All ({ALL_RESOURCES.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('official')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'official'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Official BPSC ({OFFICIAL_SOURCES.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('books')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'books'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Guides & Digest ({REFERENCE_CATALOG.length})
          </button>
        </div>
      </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const isOfficial = item.type === 'official_source';
            return (
              <div
                key={item.id}
                className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-all ${
                  isOfficial ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-mono font-bold px-2.5 py-0.5 rounded-lg ${
                        isOfficial
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {item.code}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.priority.toLowerCase().includes('highest')
                          ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      Priority: {item.priority}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug bangla-font">
                    {item.title}
                  </h3>

                  <div className="space-y-1 text-xs text-slate-500">
                    {item.authorEditor && (
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Author/Editor: </span>
                        {item.authorEditor}
                      </div>
                    )}
                    {item.publisher && (
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Publisher: </span>
                        {item.publisher}
                      </div>
                    )}
                    {item.editionDate && (
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Edition / Date: </span>
                        {item.editionDate}
                      </div>
                    )}
                    {item.pageCount && (
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Pages / Format: </span>
                        {item.pageCount}
                      </div>
                    )}
                    {item.retailPriceObs && (
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Observed Price: </span>
                        <span className="font-mono text-emerald-600 font-bold">{item.retailPriceObs}</span>
                      </div>
                    )}
                  </div>

                  {item.recommendedUse && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="font-bold block text-slate-800 dark:text-slate-200 mb-0.5">App Use:</span>
                      {item.recommendedUse}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    Confidence: {item.metadataConfidence}
                  </span>

                  {item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                    >
                      <span>{isOfficial ? 'Official PDF' : 'Merchant Page'}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-slate-400 italic">No external link</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
}
