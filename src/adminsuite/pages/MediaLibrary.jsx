import { motion } from "framer-motion";
import { useState } from "react";
import {
  Upload,
  Search,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

import { PageHeader } from "../components/PageHeader";
import { mediaItems } from "../../lib/admin-mock";

function MediaPage() {
  const [q, setQ] = useState("");
  const [drag, setDrag] = useState(false);

  const items = mediaItems.filter((m) =>
    m.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Media Library"
        subtitle="Manage every visual asset used across the platform."
      />

      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
        }}
        animate={{
          borderColor: drag
            ? "rgba(30,64,175,0.6)"
            : "rgba(255,255,255,0.08)",
        }}
        className="glass-card flex flex-col items-center justify-center gap-2 border-2 border-dashed p-10 text-center"
      >
        <div className="grid h-12 w-12 place-items-center rounded-xl brand-gradient shadow-lg shadow-primary/30">
          <Upload className="h-5 w-5 text-white" />
        </div>

        <div className="mt-2 text-base font-semibold">
          Drag & drop images here
        </div>

        <div className="text-xs text-muted-foreground">
          or click to browse — PNG, JPG, WebP up to 5MB
        </div>

        <button className="mt-3 rounded-lg brand-gradient px-4 py-2 text-sm font-semibold text-white">
          Choose Files
        </button>
      </motion.div>

      <div className="mb-4 mt-6 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">All Assets</h2>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search media..."
            className="h-9 w-full rounded-lg border border-border bg-card/50 pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {items.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ y: -3 }}
            className="glass-card group relative overflow-hidden"
          >
            <div className="aspect-square overflow-hidden bg-background/50">
              <img
                src={m.url}
                alt={m.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/0 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="text-[10px] font-medium text-white">
                <div className="truncate">{m.name}</div>
                <div className="text-white/70">{m.size}</div>
              </div>

              <button className="rounded-md bg-destructive/80 p-1.5 text-white hover:bg-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}

        {items.length === 0 && (
          <div className="col-span-full flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            <p className="text-sm">No assets match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaPage;