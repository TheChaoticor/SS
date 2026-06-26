import { motion } from "framer-motion";
import {
  Gift,
  IndianRupee,
  Clock,
} from "lucide-react";

import { PageHeader, StatusBadge } from "../components/PageHeader";
import { useData } from "../../context/DataContext";

function ReferralsPage() {
  const { referrals, updateReferralStatus, loading } = useData();

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const total = referrals.length;

  const pending = referrals
    .filter((r) => r.status === "Pending")
    .reduce((a, r) => a + r.reward, 0);

  const paid = referrals
    .filter((r) => r.status === "Paid")
    .reduce((a, r) => a + r.reward, 0);

  const cards = [
    {
      label: "Total Referrals",
      value: total.toString(),
      Icon: Gift,
    },
    {
      label: "Pending Rewards",
      value: `₹${pending.toLocaleString()}`,
      Icon: Clock,
    },
    {
      label: "Completed Rewards",
      value: `₹${paid.toLocaleString()}`,
      Icon: IndianRupee,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Referrals"
        subtitle="Track the Refer & Earn program performance and payouts."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </div>

                <div className="mt-1 text-2xl font-bold">
                  {c.value}
                </div>
              </div>

              <div className="grid h-11 w-11 place-items-center rounded-xl orange-gradient shadow-lg shadow-orange-500/20">
                <c.Icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="border-b border-border px-5 py-4 text-base font-semibold">
          Referral History
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02] text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Referrer</th>
                <th className="px-5 py-3 font-medium">
                  Referred Student
                </th>
                <th className="px-5 py-3 font-medium">Reward</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {referrals.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-border transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-5 py-3 font-medium">
                    {r.referrer}
                  </td>

                  <td className="px-5 py-3 text-muted-foreground">
                    {r.referred}
                  </td>

                  <td className="px-5 py-3 font-semibold">
                    ₹{r.reward.toLocaleString()}
                  </td>

                  <td className="px-5 py-3 text-muted-foreground">
                    {r.date}
                  </td>

                  <td className="px-5 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => updateReferralStatus(r.id, e.target.value)}
                      className={`rounded-md border bg-[#0f172a] px-2 py-1 text-xs font-semibold focus:outline-none transition-colors cursor-pointer ${
                        r.status === "Pending" ? "border-yellow-500/30 text-yellow-400" :
                        "border-emerald-500/30 text-emerald-400"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReferralsPage;