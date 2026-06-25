import { Bell, Plus, Search, Menu } from "lucide-react";
import { motion } from "framer-motion";

function Topbar({ onMenu }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/70 backdrop-blur-xl px-4 py-3 lg:px-6">
      <button
        onClick={onMenu}
        className="rounded-md p-2 hover:bg-white/5 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          placeholder="Search leads, courses, students..."
          className="h-10 w-full rounded-lg border border-border bg-card/50 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2 text-xs text-muted-foreground">
          {today}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-lg orange-gradient px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20"
        >
          <Plus className="h-4 w-4" />
          Quick Add
        </motion.button>

        <button className="relative rounded-lg border border-border bg-card/50 p-2.5 hover:bg-card">
          <Bell className="h-4 w-4" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary ring-2 ring-background" />
        </button>

        <div className="flex items-center gap-3 rounded-lg border border-border bg-card/50 py-1.5 pl-1.5 pr-3">
          <img
            src="https://i.pravatar.cc/64?img=22"
            alt="Admin"
            className="h-7 w-7 rounded-md object-cover"
          />

          <div className="hidden text-left sm:block">
            <div className="text-xs font-semibold leading-tight">
              Sandeep Sharma
            </div>

            <div className="text-[10px] text-muted-foreground leading-tight">
              Super Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;