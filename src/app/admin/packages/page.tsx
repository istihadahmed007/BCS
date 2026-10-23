'use client';

import { useEffect, useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  Save,
  X,
} from 'lucide-react';
import { PackagePlan, PackageStatus, PackageTier } from '@/types';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackagePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal / Form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Partial<PackagePlan> | null>(null);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/packages?all=true');
      const data = await res.json();
      if (data.success) {
        setPackages(data.packages || []);
      } else {
        setError(data.error);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingPkg({
      name: '',
      nameBn: '',
      description: '',
      descriptionBn: '',
      priceBDT: 0,
      durationDays: 90,
      status: 'active',
      tier: 'standard',
      eligibleTracks: ['general_bcs'],
      eligibleStreams: ['general'],
      includedPracticeModes: ['daily_mixed'],
      includedMockTests: ['diagnostic'],
      features: ['Full access to general question bank'],
      featuresBn: ['সাধারণ প্রশ্ন ব্যাংকে অ্যাক্সেস'],
    });
    setIsEditing(true);
  };

  const handleEdit = (pkg: PackagePlan) => {
    setEditingPkg({ ...pkg });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingPkg?.name || !editingPkg?.nameBn) {
      alert('Package name and Bengali title are required.');
      return;
    }

    try {
      const isNew = !editingPkg.id;
      const url = isNew ? '/api/packages' : `/api/packages/${editingPkg.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPkg),
      });

      const data = await res.json();
      if (data.success) {
        setIsEditing(false);
        setEditingPkg(null);
        loadPackages();
      } else {
        alert(data.error || 'Failed to save package');
      }
    } catch (e: any) {
      alert('Error saving package: ' + e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate or remove this package?')) return;

    try {
      const res = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        loadPackages();
      } else {
        alert(data.error || 'Failed to remove package');
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="h-6 w-6 text-indigo-600" />
            <span>Package Catalog Management</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create, configure, publish, and retire subscription tiers and pricing.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Package</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 text-xs">
          {error}
        </div>
      )}

      {/* Packages Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Package Name</th>
                <th className="px-5 py-3.5">Tier</th>
                <th className="px-5 py-3.5">Price (BDT)</th>
                <th className="px-5 py-3.5">Duration</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {pkg.name}
                    </div>
                    <div className="text-[11px] text-slate-500 bangla-font">
                      {pkg.nameBn}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {pkg.tier}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                    {pkg.priceBDT === 0 ? 'Free' : `৳${pkg.priceBDT}`}
                  </td>
                  <td className="px-5 py-4">
                    {pkg.durationDays === 0 ? 'Lifetime' : `${pkg.durationDays} Days`}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        pkg.status === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {pkg.status === 'active' ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      <span>{pkg.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Edit Package"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    {pkg.id !== 'pkg_free_preview' && (
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Deactivate / Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {isEditing && editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingPkg.id ? 'Edit Package' : 'Create New Package'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Package Name (EN)</label>
                <input
                  type="text"
                  value={editingPkg.name || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Package Name (BN)</label>
                <input
                  type="text"
                  value={editingPkg.nameBn || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, nameBn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 bangla-font"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Price in BDT</label>
                <input
                  type="number"
                  value={editingPkg.priceBDT ?? 0}
                  onChange={(e) => setEditingPkg({ ...editingPkg, priceBDT: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Duration (Days)</label>
                <input
                  type="number"
                  value={editingPkg.durationDays ?? 90}
                  onChange={(e) => setEditingPkg({ ...editingPkg, durationDays: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Access Tier</label>
                <select
                  value={editingPkg.tier || 'standard'}
                  onChange={(e) => setEditingPkg({ ...editingPkg, tier: e.target.value as PackageTier })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="free">Free</option>
                  <option value="standard">Standard BCS</option>
                  <option value="complete">Complete Master BCS</option>
                  <option value="medical">Medical (51st Special Health)</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">Status</label>
                <select
                  value={editingPkg.status || 'active'}
                  onChange={(e) => setEditingPkg({ ...editingPkg, status: e.target.value as PackageStatus })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-xs block mb-1">Description (BN)</label>
              <textarea
                rows={2}
                value={editingPkg.descriptionBn || ''}
                onChange={(e) => setEditingPkg({ ...editingPkg, descriptionBn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs bangla-font"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
              >
                <Save className="h-4 w-4" />
                <span>Save Package</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
