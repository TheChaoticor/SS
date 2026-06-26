import { motion } from "framer-motion";
import { CalendarCheck, Clock, Plus } from "lucide-react";
import { PageHeader, StatusBadge } from "../components/PageHeader";
import { useData } from "../../context/DataContext";

function BookingsPage() {
  const { bookings, updateBookingStatus, loading } = useData();

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const summary = {
    Pending: bookings.filter((b) => b.status === "Pending").length,
    Confirmed: bookings.filter((b) => b.status === "Confirmed").length,
    Completed: bookings.filter((b) => b.status === "Completed").length,
    Cancelled: bookings.filter((b) => b.status === "Cancelled").length,
  };

  return (
    <div>
      <PageHeader
        title="Counselling Bookings"
        subtitle="Track and schedule student counselling sessions in real time."
        actions={
          <button className="flex items-center gap-2 rounded-lg brand-gradient px-3 py-2 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" /> New Booking
          </button>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {Object.entries(summary).map(([k, v], i) => (
          <motion.div key={k}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card p-4">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{k}</div>
            <div className="mt-1 text-2xl font-bold">{v}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="glass-card overflow-hidden xl:col-span-2">
          <div className="border-b border-border px-5 py-4 text-base font-semibold">All Bookings</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.02] text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Time</th>
                  <th className="px-5 py-3 font-medium">Counsellor</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t border-border transition-colors hover:bg-white/[0.03]">
                    <td className="px-5 py-3 font-medium">{b.student}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.phone}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.date}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.time}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.counsellor}</td>
                    <td className="px-5 py-3">
                    <select
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                      className={`rounded-md border bg-[#0f172a] px-2 py-1 text-xs font-semibold focus:outline-none transition-colors cursor-pointer ${
                        b.status === "Pending" ? "border-yellow-500/30 text-yellow-400" :
                        b.status === "Confirmed" ? "border-blue-500/30 text-blue-400" :
                        b.status === "Completed" ? "border-emerald-500/30 text-emerald-400" :
                        "border-red-500/30 text-red-400"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-2 text-base font-semibold">
            <CalendarCheck className="h-4 w-4 text-primary" /> This Week
          </div>
          <p className="text-xs text-muted-foreground">Upcoming sessions in chronological order</p>
          <ul className="mt-4 space-y-3">
            {bookings.slice(0, 6).map((b) => (
              <li key={b.id} className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md brand-gradient text-white">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{b.student}</div>
                  <div className="text-xs text-muted-foreground">{b.date} · {b.time} · {b.counsellor}</div>
                </div>
                <StatusBadge status={b.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default BookingsPage;