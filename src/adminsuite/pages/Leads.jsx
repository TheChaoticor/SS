import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search, Filter, FileDown, Plus, X, Mail, Phone, Calendar, ChevronLeft, ChevronRight,
} from "lucide-react";
import { PageHeader, StatusBadge } from "../components/PageHeader";
import { useData } from "../../context/DataContext";

const STATUSES = ["All", "New", "Contacted", "Converted", "Closed"];

function LeadsPage() {
  const { leads, updateLeadStatus, loading } = useData();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const pageSize = 8;

  const selected = useMemo(() => {
    return leads.find((l) => l.id === selectedId) || null;
  }, [leads, selectedId]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchQ = !q || [l.name, l.email, l.phone, l.service].join(" ").toLowerCase().includes(q.toLowerCase());
      const matchS = status === "All" || l.status === status;
      return matchQ && matchS;
    });
  }, [q, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const view = filtered.slice((page - 1) * pageSize, page * pageSize);

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Email", "Service", "Date", "Status"];
    const rows = filtered.map((l) => [l.name, l.phone, l.email, l.service, l.date, l.status]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url; a.download = "leads.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        title="Leads"
        subtitle="Manage every inbound enquiry from the SS Pathways website."
        actions={
          <>
            <button onClick={exportCSV} className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2 text-sm hover:bg-card">
              <FileDown className="h-4 w-4" /> Export
            </button>
            <button className="flex items-center gap-2 rounded-lg brand-gradient px-3 py-2 text-sm font-semibold text-white">
              <Plus className="h-4 w-4" /> Add Lead
            </button>
          </>
        }
      />

      <div className="glass-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search by name, email, phone..."
              className="h-10 w-full rounded-lg border border-border bg-background/50 pl-10 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
            {STATUSES.map((s) => (
              <button key={s} onClick={() => { setStatus(s); setPage(1); }}
                className={`shrink-0 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  status === s ? "border-primary bg-primary text-white" : "border-border text-muted-foreground hover:text-white"
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02] text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {view.map((l) => (
                <tr key={l.id} onClick={() => setSelectedId(l.id)}
                  className="cursor-pointer border-t border-border transition-colors hover:bg-white/[0.03]">
                  <td className="px-5 py-3 font-medium">{l.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.phone}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.email}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.service}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.date}</td>
                  <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={l.status}
                      onChange={(e) => updateLeadStatus(l.id, e.target.value)}
                      className={`rounded-md border bg-[#0f172a] px-2 py-1 text-xs font-semibold focus:outline-none transition-colors cursor-pointer ${
                        l.status === "New" ? "border-blue-500/30 text-blue-400" :
                        l.status === "Contacted" ? "border-yellow-500/30 text-yellow-400" :
                        l.status === "Converted" ? "border-emerald-500/30 text-emerald-400" :
                        "border-red-500/30 text-red-400"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
              {view.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">No leads found.</td></tr>
              )}
              {loading && (
                <tr><td colSpan={6} className="px-5 py-4 text-center text-sm text-primary">Syncing...</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
          <div>Showing {view.length} of {filtered.length}</div>
          <div className="flex items-center gap-1">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
              className="rounded-md border border-border p-1.5 disabled:opacity-40 hover:bg-white/5">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2">Page {page} / {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
              className="rounded-md border border-border p-1.5 disabled:opacity-40 hover:bg-white/5">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto h-full w-full max-w-md overflow-y-auto bg-card border-l border-border p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{selected.id}</div>
                  <h2 className="mt-1 text-xl font-bold">{selected.name}</h2>
                  <div className="mt-2">
                    <select
                      value={selected.status}
                      onChange={(e) => updateLeadStatus(selected.id, e.target.value)}
                      className={`rounded-md border bg-[#0f172a] px-2 py-1 text-xs font-semibold focus:outline-none transition-colors cursor-pointer ${
                        selected.status === "New" ? "border-blue-500/30 text-blue-400" :
                        selected.status === "Contacted" ? "border-yellow-500/30 text-yellow-400" :
                        selected.status === "Converted" ? "border-emerald-500/30 text-emerald-400" :
                        "border-red-500/30 text-red-400"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => setSelectedId(null)} className="rounded-md p-1.5 hover:bg-white/5">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <Row Icon={Mail} label="Email" value={selected.email} />
                <Row Icon={Phone} label="Phone" value={selected.phone} />
                <Row Icon={Calendar} label="Date" value={selected.date} />
              </div>

              <div className="mt-6 rounded-lg border border-border bg-background/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interested in</div>
                <div className="mt-1 font-medium">{selected.service}</div>
              </div>

              <div className="mt-4 rounded-lg border border-border bg-background/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</div>
                <p className="mt-1 text-sm text-muted-foreground">{selected.notes}</p>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => updateLeadStatus(selected.id, "Contacted")}
                  className="flex-1 rounded-lg brand-gradient py-2 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() => updateLeadStatus(selected.id, "Closed")}
                  className="rounded-lg border border-border px-3 py-2 text-sm text-red-400 border-red-500/20 hover:bg-red-500/5 transition-colors"
                >
                  Close Lead
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3">
      <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/15 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

export default LeadsPage;