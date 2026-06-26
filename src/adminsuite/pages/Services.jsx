import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Compass,
  Briefcase,
  BookOpen,
  Heart,
  Gift,
  X,
  Plus,
} from "lucide-react";

import { PageHeader, StatusBadge } from "../components/PageHeader";
import { useData } from "../../context/DataContext";

const iconMap = {
  Compass,
  Briefcase,
  BookOpen,
  Heart,
  Gift,
};

function ServicesPage() {
  const { services, updateService, loading } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Draft",
    icon: "Compass",
  });

  const openEditModal = (s) => {
    setEditingService(s);
    setFormData({
      name: s.name,
      description: s.description,
      status: s.status,
      icon: s.icon || "Compass",
    });
    setShowModal(true);
  };

  const handleTogglePublish = async (s) => {
    const nextStatus = s.status === "Published" ? "Draft" : "Published";
    await updateService(s.id, { status: nextStatus });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Name is required");
      return;
    }
    const res = await updateService(editingService.id, formData);
    if (res.success) {
      setShowModal(false);
    } else {
      alert("Failed to update service details");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Configure the services SS Pathways markets on the public website."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s, i) => {
          const Icon = iconMap[s.icon] || Compass;

          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="glass-card p-5 text-white"
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
                <button
                  onClick={() => openEditModal(s)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-white/[0.03] py-1.5 text-xs font-semibold hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>

                <button
                  onClick={() => handleTogglePublish(s)}
                  className="rounded-md border border-border bg-white/[0.03] px-4 py-1.5 text-xs font-semibold hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  {s.status === "Published" ? "Unpublish" : "Publish"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit Service Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#071224] p-6 text-white shadow-2xl"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-5 rounded-xl p-2 text-white/70 hover:bg-white/10"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Briefcase className="text-orange h-5 w-5" />
                Edit Service
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Service Name *</label>
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Description *</label>
                  <textarea
                    rows={4} required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white outline-none focus:border-orange resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Icon Type</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  >
                    <option value="Compass">Compass (Career Guidance)</option>
                    <option value="Briefcase">Briefcase (Job Support)</option>
                    <option value="BookOpen">BookOpen (Academic Support)</option>
                    <option value="Heart">Heart (Counselling)</option>
                    <option value="Gift">Gift (Refer & Earn)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl border border-white/15 bg-white/5 py-3 font-semibold text-white hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-orange py-3 font-semibold text-white hover:brightness-110 active:scale-95 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ServicesPage;