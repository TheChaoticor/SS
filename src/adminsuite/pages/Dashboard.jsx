import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  Gift,
  Plus,
  Phone,
  Mail,
  CalendarPlus,
  FileDown,
  UserPlus,
  Activity as ActivityIcon,
  UserCheck,
  CalendarCheck,
  MessageSquareQuote,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

import StatCard from "../components/StatCard";
import { PageHeader, StatusBadge } from "../components/PageHeader";
import { useData } from "../../context/DataContext";

const iconMap = {
  Users,
  GraduationCap,
  BookOpen,
  Gift,
};

function Dashboard() {
  const { dashboardStats, loading } = useData();

  if (loading || !dashboardStats) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const { stats, leadAnalytics, monthlyRegistrations, recentLeads, bookings, activityFeed } = dashboardStats;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Sandeep — here's what's happening today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard
            key={s.key} index={i}
            label={s.label} value={s.value} change={s.change}
            Icon={iconMap[s.icon]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card p-5 xl:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">Lead Analytics</h3>
              <p className="text-xs text-muted-foreground">Leads vs conversions over the year</p>
            </div>
            <div className="flex gap-4 text-xs">
              <Legend dot="#1E40AF" label="Leads" />
              <Legend dot="#F97316" label="Converted" />
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={leadAnalytics}>
                <defs>
                  <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E40AF" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#1E40AF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gConv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F97316" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="leads" stroke="#1E40AF" strokeWidth={2} fill="url(#gLeads)" />
                <Area type="monotone" dataKey="converted" stroke="#F97316" strokeWidth={2} fill="url(#gConv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="glass-card p-5"
        >
          <div className="mb-4">
            <h3 className="text-base font-semibold">Monthly Registrations</h3>
            <p className="text-xs text-muted-foreground">Active student onboarding</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={monthlyRegistrations}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(30,64,175,0.1)" }} />
                <Bar dataKey="students" fill="#1E40AF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="glass-card overflow-hidden xl:col-span-2"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-base font-semibold">Recent Leads</h3>
            <button className="text-xs font-semibold text-primary hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.02] text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((l) => (
                  <tr key={l.id} className="border-t border-border transition-colors hover:bg-white/[0.03]">
                    <td className="px-5 py-3">
                      <div className="font-medium">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.email}</div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{l.service}</td>
                    <td className="px-5 py-3 text-muted-foreground">{l.date}</td>
                    <td className="px-5 py-3"><StatusBadge status={l.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
          className="glass-card p-5"
        >
          <h3 className="text-base font-semibold">Quick Actions</h3>
          <p className="text-xs text-muted-foreground">Common admin tasks</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <QuickAction Icon={UserPlus} label="Add Lead" />
            <QuickAction Icon={BookOpen} label="New Course" />
            <QuickAction Icon={CalendarPlus} label="Schedule" />
            <QuickAction Icon={FileDown} label="Export" />
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Upcoming Bookings
            </div>
            <ul className="space-y-3">
              {bookings.slice(0, 4).map((b) => (
                <li key={b.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{b.student}</div>
                    <div className="text-xs text-muted-foreground">{b.date} · {b.time}</div>
                  </div>
                  <StatusBadge status={b.status} />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-base font-semibold">
              <ActivityIcon className="h-4 w-4 text-primary" /> Recent Activity
            </h3>
            <p className="text-xs text-muted-foreground">Live feed across the platform</p>
          </div>
          <button className="text-xs font-semibold text-primary hover:underline">View all</button>
        </div>
        <ul className="space-y-3">
          {activityFeed.map((a, i) => {
            const Icon = activityIconMap[a.type];
            return (
              <motion.li key={a.id}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.04 }}
                className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-3"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md brand-gradient text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm">{a.message}</div>
                  <div className="text-xs text-muted-foreground">{a.time}</div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}

const activityIconMap = {
  lead: UserPlus,
  booking: CalendarCheck,
  referral: Gift,
  course: BookOpen,
  testimonial: MessageSquareQuote,
  login: UserCheck,
};

const tooltipStyle = {
  background: "#0F172A",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  fontSize: 12,
  color: "#fff",
};

function Legend({ dot, label }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: dot }}
      />
      {label}
    </div>
  );
}

function QuickAction({ Icon, label }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex flex-col items-start gap-3 rounded-lg border border-border bg-white/[0.02] p-3 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"
    >
      <div className="grid h-9 w-9 place-items-center rounded-lg brand-gradient">
        <Icon className="h-4 w-4 text-white" />
      </div>

      <span className="text-xs font-semibold">
        {label}
      </span>
    </motion.button>
  );
}

export default Dashboard;