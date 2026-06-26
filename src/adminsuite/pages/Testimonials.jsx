import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Quote,
  X,
  MessageSquare,
} from "lucide-react";

import { PageHeader } from "../components/PageHeader";
import { useData } from "../../context/DataContext";

function TestimonialsPage() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, loading } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    review: "",
    rating: 5,
    photo: "",
  });

  const openAddModal = () => {
    setEditingTestimonial(null);
    setFormData({
      name: "",
      course: "",
      review: "",
      rating: 5,
      photo: "",
    });
    setShowModal(true);
  };

  const openEditModal = (t) => {
    setEditingTestimonial(t);
    setFormData({
      name: t.name,
      course: t.course,
      review: t.review,
      rating: t.rating,
      photo: t.photo || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student testimonial?")) {
      await deleteTestimonial(id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.review) {
      alert("Name and review are required");
      return;
    }

    let res;
    if (editingTestimonial) {
      res = await updateTestimonial(editingTestimonial.id, formData);
    } else {
      res = await addTestimonial(formData);
    }

    if (res.success) {
      setShowModal(false);
    } else {
      alert("Failed to save testimonial details");
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
        title="Testimonials"
        subtitle="Curate authentic student stories featured across the platform."
        actions={
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-lg brand-gradient px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 active:scale-95 cursor-pointer"
          >
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
            className="glass-card relative p-5 text-white"
          >
            <Quote className="absolute right-4 top-4 h-7 w-7 text-primary/20" />

            <div className="flex items-center gap-3">
              <img
                src={t.photo || "https://i.pravatar.cc/120?img=1"}
                alt={t.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/30 bg-secondary"
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
                          ? "fill-[#f97316] text-[#f97316]"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-4">
              "{t.review}"
            </p>

            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={() => openEditModal(t)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-white/[0.03] py-1.5 text-xs font-semibold hover:bg-white/[0.06] transition cursor-pointer"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>

              <button
                onClick={() => handleDelete(t.id)}
                className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-destructive hover:bg-destructive/20 transition cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add / Edit Testimonial Modal */}
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
                <MessageSquare className="text-orange h-5 w-5" />
                {editingTestimonial ? "Edit Testimonial" : "Add Student Testimonial"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Student Name *</label>
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Course / Program *</label>
                  <input
                    type="text" required
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    placeholder="e.g. Full Stack Development"
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Photo / Avatar URL</label>
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    placeholder="e.g. https://images.unsplash.com/..."
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Rating (1 to 5 Stars)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">Review / Quote *</label>
                  <textarea
                    rows={4} required
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    placeholder="Enter student review details..."
                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white outline-none focus:border-orange resize-none"
                  />
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
                    {editingTestimonial ? "Save Changes" : "Create Testimonial"}
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

export default TestimonialsPage;