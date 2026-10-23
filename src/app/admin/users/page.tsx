'use client';

import { useEffect, useState } from 'react';
import { Users, Shield, PlusCircle, Ban, Clock, Search, X } from 'lucide-react';
import { AuthUser, PackagePlan, UserSubscription } from '@/types';

export default function AdminUsersPage() {
  const [userItems, setUserItems] = useState<
    Array<{
      user: AuthUser;
      subscription: UserSubscription & { remainingDays: number };
      freeUsage: any;
    }>
  >([]);
  const [packages, setPackages] = useState<PackagePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Grant / Revoke Modal State
  const [selectedUserItem, setSelectedUserItem] = useState<any | null>(null);
  const [modalAction, setModalAction] = useState<'grant' | 'revoke' | null>(null);
  const [targetPackageId, setTargetPackageId] = useState('pkg_bcs_standard');
  const [durationDays, setDurationDays] = useState(90);
  const [auditReason, setAuditReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [uRes, pRes] = await Promise.all([
        fetch('/api/admin/subscriptions'),
        fetch('/api/packages?all=true'),
      ]);

      const uData = await uRes.json();
      const pData = await pRes.json();

      if (uData.success) setUserItems(uData.users || []);
      if (pData.success) setPackages(pData.packages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleActionSubmit = async () => {
    if (!auditReason || auditReason.trim().length < 3) {
      alert('Please enter a valid reason for this administrative access action.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: any = {
        action: modalAction,
        reason: auditReason.trim(),
      };

      if (modalAction === 'grant') {
        payload.userId = selectedUserItem.user.id;
        payload.packageId = targetPackageId;
        payload.durationDays = Number(durationDays);
      } else if (modalAction === 'revoke') {
        payload.subscriptionId = selectedUserItem.subscription.id;
      }

      const res = await fetch('/api/admin/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setModalAction(null);
        setSelectedUserItem(null);
        setAuditReason('');
        loadData();
      } else {
        alert(data.error || 'Failed to execute subscription action');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = userItems.filter(
    (item) =>
      item.user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.user.email.toLowerCase().includes(search.toLowerCase()) ||
      item.user.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600" />
          <span>User Accounts & Subscription Entitlements</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Search registered users, view subscription validity, and grant or revoke access with mandatory audit trails.
        </p>
      </div>

      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search by name, email, or user ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Active Package</th>
                <th className="px-5 py-3.5">Validity</th>
                <th className="px-5 py-3.5">Today Free Usage</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((item) => (
                <tr key={item.user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {item.user.fullName}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {item.user.email}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold">
                      {item.user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.subscription.tier === 'free'
                          ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-bold'
                      }`}
                    >
                      {item.subscription.packageName}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {item.subscription.tier === 'free' ? (
                      <span className="text-slate-400">Free Preview</span>
                    ) : (
                      <div className="space-y-0.5">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {item.subscription.remainingDays} days remaining
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Expires: {new Date(item.subscription.expiresAt).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px]">
                    {item.freeUsage?.questionsAttempted || 0} / {item.freeUsage?.dailyLimit || 20}
                  </td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUserItem(item);
                        setModalAction('grant');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 text-[11px] font-semibold transition-colors"
                    >
                      Grant / Extend
                    </button>
                    {item.subscription.tier !== 'free' && item.subscription.status === 'active' && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUserItem(item);
                          setModalAction('revoke');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 text-[11px] font-semibold transition-colors"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grant / Revoke Action Modal */}
      {modalAction && selectedUserItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {modalAction === 'grant' ? 'Grant / Extend Package Access' : 'Revoke Subscription Access'}
              </h3>
              <button onClick={() => setModalAction(null)} className="text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs text-slate-500">
              User: <span className="font-bold text-slate-900 dark:text-white">{selectedUserItem.user.fullName}</span> ({selectedUserItem.user.email})
            </div>

            {modalAction === 'grant' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Select Package</label>
                  <select
                    value={targetPackageId}
                    onChange={(e) => setTargetPackageId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    {packages
                      .filter((p) => p.tier !== 'free')
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.tier.toUpperCase()})
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Validity (Days)</label>
                  <input
                    type="number"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            )}

            <div className="text-xs">
              <label className="font-semibold block mb-1 text-red-600 dark:text-red-400">
                Administrative Reason (Required for Audit Trail)*
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Scholarship recipient / Manual offline payment verification / Dispute resolution"
                value={auditReason}
                onChange={(e) => setAuditReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalAction(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleActionSubmit}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-xl text-white text-xs font-semibold ${
                  modalAction === 'grant'
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isSubmitting ? 'Processing...' : modalAction === 'grant' ? 'Confirm Grant' : 'Confirm Revoke'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
