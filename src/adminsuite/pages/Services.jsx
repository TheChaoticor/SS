import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Compass,
  Briefcase,
  BookOpen,
  Heart,
  Gift,
} from "lucide-react";

import { PageHeader, StatusBadge } from "../components/PageHeader";
import { services_list } from "../../lib/admin-mock";

const iconMap = {
  Compass,
  Briefcase,
  BookOpen,
  Heart,
  Gift,
};

function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Configure the services SS Pathways markets on the public website."
        actions={
          <button className="flex items-center gap-2 rounded-lg brand-gradient px-3 py-2 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services_list.map((s, i) => {
          const Icon = iconMap[s.icon];

          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="glass-card p-5"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl brand-gradient shadow-lg shadow-primary/30">
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <StatusBadge status={s.status} />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                {s.name}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {s.description}
              </p>

              <div className="mt-5 flex items-center gap-2">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-white/[0.03] py-1.5 text-xs font-semibold hover:bg-white/[0.06]">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>

                <button className="rounded-md border border-border bg-white/[0.03] px-3 py-1.5 text-xs font-semibold hover:bg-white/[0.06]">
                  {s.status === "Published"
                    ? "Unpublish"
                    : "Publish"}
                </button>

                <button className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-destructive hover:bg-destructive/20">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ServicesPage;