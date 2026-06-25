import { motion } from "framer-motion";

export function PageHeader({
  title,
  subtitle,
  actions,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"
    >
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 items-center gap-2">
          {actions}
        </div>
      )}
    </motion.div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    New: "bg-primary/15 text-primary border-primary/30",
    Contacted: "bg-warning/15 text-warning border-warning/30",
    Converted: "bg-success/15 text-success border-success/30",
    Closed: "bg-muted text-muted-foreground border-border",

    Pending: "bg-warning/15 text-warning border-warning/30",
    Confirmed: "bg-primary/15 text-primary border-primary/30",
    Completed: "bg-success/15 text-success border-success/30",
    Cancelled: "bg-destructive/15 text-destructive border-destructive/30",

    Paid: "bg-success/15 text-success border-success/30",

    Published: "bg-success/15 text-success border-success/30",
    Draft: "bg-muted text-muted-foreground border-border",
    Unpublished: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
        map[status] ||
        "bg-muted text-muted-foreground border-border"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}