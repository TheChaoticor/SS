import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

function StatCard({
  label,
  value,
  change,
  Icon,
  index = 0,
}) {
  const mv = useMotionValue(0);

  const rounded = useTransform(mv, (v) =>
    Math.floor(v).toLocaleString()
  );

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 1.2,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [value, mv]);

  const up = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
      }}
      whileHover={{ y: -3 }}
      className="glass-card group relative overflow-hidden p-5"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </div>

          <motion.div className="mt-2 text-3xl font-bold tracking-tight">
            {rounded}
          </motion.div>
        </div>

        <div className="grid h-11 w-11 place-items-center rounded-xl brand-gradient shadow-lg shadow-primary/30">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="relative mt-4 flex items-center gap-2 text-xs">
        <span
          className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-semibold ${
            up
              ? "bg-success/15 text-success"
              : "bg-destructive/15 text-destructive"
          }`}
        >
          {up ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}

          {Math.abs(change)}%
        </span>

        <span className="text-muted-foreground">
          vs last month
        </span>
      </div>
    </motion.div>
  );
}

export default StatCard;