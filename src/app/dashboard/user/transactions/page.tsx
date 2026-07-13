"use client";

import { CreditCard, Calendar, DollarSign, CheckCircle } from "lucide-react";

const transactions = [
  {
    id: "TXN-1001",
    date: "12 Jul 2026",
    stay: "Ocean View Resort",
    amount: 120,
    status: "Paid",
  },
  {
    id: "TXN-1002",
    date: "05 Jul 2026",
    stay: "Mountain Cabin",
    amount: 85,
    status: "Paid",
  },
  {
    id: "TXN-1003",
    date: "28 Jun 2026",
    stay: "City Hotel",
    amount: 150,
    status: "Paid",
  },
];

export default function TransactionsPage() {
  const totalSpent = transactions.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="space-y-8 mt-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Transaction History
        </h1>
        <p className="mt-2 text-gray-500">
          View all your completed payments.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <h2 className="mt-2 text-3xl font-bold">
                {transactions.length}
              </h2>
            </div>
            <CreditCard className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <h2 className="mt-2 text-3xl font-bold">
                ${totalSpent}
              </h2>
            </div>
            <DollarSign className="h-10 w-10 text-green-600" />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Successful</p>
              <h2 className="mt-2 text-3xl font-bold">
                {transactions.length}
              </h2>
            </div>
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm font-semibold text-gray-600">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Stay</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {transaction.id}
                  </td>

                  <td className="px-6 py-4">
                    {transaction.stay}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      {transaction.date}
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ${transaction.amount}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {transactions.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
}