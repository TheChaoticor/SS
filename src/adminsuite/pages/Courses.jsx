import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  Users,
  User,
} from "lucide-react";

import { PageHeader, StatusBadge } from "../components/PageHeader";
import { courses } from "../../lib/admin-mock";

function CoursesPage() {
  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle="Curate the catalog of EdTech programs offered on the platform."
        actions={
          <button className="flex items-center gap-2 rounded-lg brand-gradient px-3 py-2 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" /> Add Course
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="glass-card group overflow-hidden"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={c.thumbnail}
                alt={c.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

              <div className="absolute left-3 top-3">
                <span className="rounded-md border border-white/15 bg-black/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                  {c.category}
                </span>
              </div>

              <div className="absolute right-3 top-3">
                <StatusBadge status={c.status} />
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-base font-semibold">{c.title}</h3>

              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {c.description}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <Meta Icon={Clock} value={c.duration} />
                <Meta Icon={Users} value={`${c.students} enrolled`} />
                <Meta Icon={User} value={c.instructor.split(" ")[0]} />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-white/[0.03] py-1.5 text-xs font-semibold hover:bg-white/[0.06]">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>

                <button className="flex items-center justify-center gap-1.5 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/20">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Meta({ Icon, value }) {
  return (
    <div className="flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2 py-1.5">
      <Icon className="h-3.5 w-3.5 text-primary" />
      <span className="truncate font-medium">{value}</span>
    </div>
  );
}

export default CoursesPage;