import { useState, useMemo } from "react";
import { Search, FileDown, ChevronLeft, ChevronRight, IndianRupee } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { useData } from "../../context/DataContext";

function PurchasesPage() {
  const { purchases, loading } = useData();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    return purchases.filter((p) => {
      return (
        !q ||
        [p.student_name, p.student_email, p.course_title, p.upi_txn_id, p.id].join(" ").toLowerCase().includes(q.toLowerCase())
      );
    });
  }, [purchases, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const view = filtered.slice((page - 1) * pageSize, page * pageSize);

  const exportCSV = () => {
    const headers = ["Transaction ID", "Student Name", "Student Email", "Course Title", "Amount Paid (INR)", "UPI Txn ID", "Date", "Status"];
    const rows = filtered.map((p) => [
      p.id,
      p.student_name,
      p.student_email,
      p.course_title,
      p.amount,
      p.upi_txn_id,
      p.created_at,
      p.status
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `course_transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Purchase Transactions"
        subtitle="Track course purchase intentions, scan-to-pay checkouts, and completed UPI payments."
        actions={
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2 text-sm text-white hover:bg-card hover:border-primary/50 transition cursor-pointer"
          >
            <FileDown className="h-4 w-4" /> Export CSV
          </button>
        }
      />

      <div className="glass-card overflow-hidden">
        {/* Search */}
        <div className="border-b border-border p-4 flex items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search purchases by student name, email, course title, Txn ID..."
              className="h-10 w-full rounded-lg border border-border bg-background/50 pl-10 pr-3 text-sm text-white outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.02] text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Txn ID</th>
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Course Title</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">UPI Txn ID</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {view.map((p) => (
                <tr key={p.id} className="border-t border-border transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-mono font-medium text-xs text-primary">{p.id}</td>
                  <td className="px-5 py-3">
                    <div className="font-medium">{p.student_name}</div>
                    <div className="text-xs text-muted-foreground">{p.student_email}</div>
                  </td>
                  <td className="px-5 py-3 font-medium">{p.course_title}</td>
                  <td className="px-5 py-3 font-semibold text-orange">
                    {p.amount === 0 ? "Free" : `₹${Number(p.amount).toLocaleString()}`}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{p.upi_txn_id}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.created_at}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/25">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
              {view.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-muted-foreground">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
          <div>
            Showing {view.length} of {filtered.length} transactions
          </div>
          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-md border border-border p-1.5 disabled:opacity-40 hover:bg-white/5 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2">
              Page {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md border border-border p-1.5 disabled:opacity-40 hover:bg-white/5 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasesPage;
