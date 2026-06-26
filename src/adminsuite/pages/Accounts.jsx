import { useState, useMemo } from "react";
import { Search, FileDown, User, Calendar, Phone, Mail, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { useData } from "../../context/DataContext";

function AccountsPage() {
  const { accounts, loading } = useData();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    return accounts.filter((u) => {
      return (
        !q ||
        [u.email, u.phone, u.role, u.goals].join(" ").toLowerCase().includes(q.toLowerCase())
      );
    });
  }, [accounts, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const view = filtered.slice((page - 1) * pageSize, page * pageSize);

  const exportCSV = () => {
    const headers = ["Account ID", "Role", "Email Address", "Phone Number", "Goals", "Date Onboarded"];
    const rows = filtered.map((u) => [
      u.id,
      u.role,
      u.email,
      u.phone,
      `"${(u.goals || "").replace(/"/g, '""')}"`,
      u.created_at || u.date || ""
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `user_accounts_${new Date().toISOString().slice(0, 10)}.csv`;
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
        title="User Accounts"
        subtitle="Monitor student and working professional profiles onboarded on the platform."
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
              placeholder="Search accounts by email, phone, role, goals..."
              className="h-10 w-full rounded-lg border border-border bg-background/50 pl-10 pr-3 text-sm text-white outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.02] text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Account ID</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Goals / Interests</th>
                <th className="px-5 py-3 font-medium">Created At</th>
              </tr>
            </thead>
            <tbody>
              {view.map((u) => (
                <tr key={u.id} className="border-t border-border transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-mono font-medium text-xs text-primary">{u.id}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      u.role.includes("Student") ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      u.role.includes("Professional") ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                      "bg-purple-500/10 text-purple-400 border-purple-500/20"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-medium">{u.email}</td>
                  <td className="px-5 py-3 text-muted-foreground">{u.phone}</td>
                  <td className="px-5 py-3 text-muted-foreground max-w-xs truncate" title={u.goals}>
                    {u.goals}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{u.created_at || u.date || ""}</td>
                </tr>
              ))}
              {view.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                    No accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
          <div>
            Showing {view.length} of {filtered.length} users
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

export default AccountsPage;
