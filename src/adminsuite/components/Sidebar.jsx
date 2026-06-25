import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase,
  CalendarCheck,
  Gift,
  MessageSquareQuote,
  Images,
  Settings,
  LogOut,
  GraduationCap,
  X,
} from "lucide-react";

const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/bookings", label: "Counselling Bookings", icon: CalendarCheck },
  { to: "/admin/referrals", label: "Referrals", icon: Gift },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/media", label: "Media Library", icon: Images },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function Sidebar({ onClose }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="flex h-full w-72 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-sidebar-border">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 group"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl brand-gradient shadow-lg shadow-primary/30">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>

          <div className="leading-tight">
            <div className="text-base font-bold tracking-tight">
              SS Pathways
            </div>

            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Admin Suite
            </div>
          </div>
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            className="rounded-md p-1.5 hover:bg-white/5 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Workspace
        </div>

        <ul className="space-y-1">
          {items.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;

            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onClose}
                  className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-white hover:bg-white/5"
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-lg brand-gradient shadow-lg shadow-primary/30"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}

                  <Icon
                    className={`relative h-[18px] w-[18px] ${
                      active ? "text-white" : ""
                    }`}
                  />

                  <span
                    className={`relative ${
                      active ? "text-white" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-[18px] w-[18px]" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;