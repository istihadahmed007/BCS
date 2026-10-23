'use client';

import { useEffect, useState } from 'react';
import { CreditCard, CheckCircle2, Clock, XCircle, Search, ShieldCheck } from 'lucide-react';
import { AdminAuditRecord, Order } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'audits'>('orders');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
        setAuditLogs(data.auditLogs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.packageName.toLowerCase().includes(search.toLowerCase()) ||
      (o.gatewayTransactionId && o.gatewayTransactionId.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-indigo-600" />
          <span>Orders, Transactions & Audit Logs</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review customer transactions, payment statuses, and administrative access modifications.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2 px-1 border-b-2 transition-all ${
            activeTab === 'orders'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Customer Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('audits')}
          className={`pb-2 px-1 border-b-2 transition-all ${
            activeTab === 'audits'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Audit Trails ({auditLogs.length})
        </button>
      </div>

      {activeTab === 'orders' ? (
        <div className="space-y-4">
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search by Order ID, Package, or Transaction ID..."
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
                    <th className="px-5 py-3.5">Order ID</th>
                    <th className="px-5 py-3.5">Package</th>
                    <th className="px-5 py-3.5">Amount</th>
                    <th className="px-5 py-3.5">Gateway</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                        No orders recorded yet.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="px-5 py-4 font-mono font-bold text-slate-900 dark:text-white">
                          {order.id}
                        </td>
                        <td className="px-5 py-4 font-medium">{order.packageName}</td>
                        <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                          ৳{order.amountBDT} {order.currency}
                        </td>
                        <td className="px-5 py-4 uppercase font-mono text-[11px]">
                          {order.paymentGateway}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              order.status === 'paid'
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                                : order.status === 'pending'
                                ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                                : 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                            }`}
                          >
                            {order.status === 'paid' ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            <span className="capitalize">{order.status}</span>
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-400 text-[11px]">
                          {new Date(order.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Timestamp</th>
                  <th className="px-5 py-3.5">Admin</th>
                  <th className="px-5 py-3.5">Action</th>
                  <th className="px-5 py-3.5">Target</th>
                  <th className="px-5 py-3.5">Reason & Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-slate-400">
                      No administrative audit logs found.
                    </td>
                  </tr>
                ) : (
                  auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="px-5 py-4 font-mono text-[11px] text-slate-400">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                        {log.adminEmail}
                      </td>
                      <td className="px-5 py-4 font-mono text-indigo-600 dark:text-indigo-400">
                        {log.action}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm">
                          {log.targetType}:{log.targetId}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-700 dark:text-slate-300">
                        {log.reason}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
