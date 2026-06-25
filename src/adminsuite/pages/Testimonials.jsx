import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Quote,
} from "lucide-react";

import { PageHeader } from "../components/PageHeader";
import { testimonials } from "../../lib/admin-mock";

function TestimonialsPage() {
  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle="Curate authentic student stories featured across the platform."
        actions={
          <button className="flex items-center gap-2 rounded-lg brand-gradient px-3 py-2 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" />
            Add Testimonial
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="glass-card relative p-5"
          >
            <Quote className="absolute right-4 top-4 h-7 w-7 text-primary/20" />

            <div className="flex items-center gap-3">
              <img
                src={t.photo}
                alt={t.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/30"
              />

              <div className="min-w-0">
                <div className="truncate font-semibold">
                  {t.name}
                </div>

                <div className="truncate text-xs text-muted-foreground">
                  {t.course}
                </div>

                <div className="mt-1 flex">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-3.5 w-3.5 ${
                        j < t.rating
                          ? "fill-warning text-warning"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              "{t.review}"
            </p>

            <div className="mt-5 flex items-center gap-2">
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-white/[0.03] py-1.5 text-xs font-semibold hover:bg-white/[0.06]">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>

              <button className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-destructive hover:bg-destructive/20">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialsPage;