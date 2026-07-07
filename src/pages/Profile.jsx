import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import SiteLayout from "../components/SiteLayout";

import {
  Bell,
  Settings,
  Mail,
  Phone,
  MapPin,
  User,
  Target,
  Pencil,
  BookOpen,
  Calendar,
  Bookmark,
  ShieldCheck,
  Crown,
  Sparkles,
  Compass,
  CheckCircle2,
  ArrowUpRight,
  GraduationCap,
  MessageSquareHeart,
  LifeBuoy,
  X,
  Play,
  KeyRound,
  Smartphone,
  Lock,
  BellRing,
  LogOut,
} from "lucide-react";

const activityIcons = {
  calendar: Calendar,
  book: BookOpen,
  check: CheckCircle2,
  bookmark: Bookmark,
  compass: Compass,
};

const savedCourses = [
  {
    title: "Quantity Surveying Masterclass",
    provider: "SS Pathways",
    hue: "from-[#2563EB] to-[#F97316]",
  },
];

function ProfilePage() {
  const { currentUser, updateAccount, bookings, purchases } = useData();
  const navigate = useNavigate();

  // Redirect to login if not logged in or session is broken
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("ss_logged_in") === "true";
    const savedUser = localStorage.getItem("ss_user");
    if (!isLoggedIn || !savedUser) {
      localStorage.removeItem("ss_logged_in");
      localStorage.removeItem("ss_user");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    goals: "",
    location: "",
    avatar: "",
  });
  const [editError, setEditError] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  const handleStartEdit = () => {
    setEditForm({
      name: currentUser?.name || currentUser?.email?.split("@")[0] || "",
      phone: currentUser?.phone || "",
      goals: currentUser?.goals || "",
      location: currentUser?.location || "Bhubaneswar, India",
      avatar: currentUser?.avatar || "https://i.pravatar.cc/200",
    });
    setIsEditing(false);
    setEditError("");
    setIsEditing(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setEditError("");
    setEditLoading(true);

    if (!editForm.name.trim() || !editForm.phone.trim()) {
      setEditError("Name and Phone are required");
      setEditLoading(false);
      return;
    }

    try {
      const res = await updateAccount(currentUser.id, editForm);
      if (res.success) {
        setIsEditing(false);
      } else {
        setEditError(res.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      setEditError("An error occurred while saving.");
    } finally {
      setEditLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <SiteLayout>
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
          <p className="text-lg">Loading profile details...</p>
        </div>
      </SiteLayout>
    );
  }

  // Derive dynamic user details
  const userDisplayName = currentUser.name || currentUser.email.split("@")[0];
  const userRole = currentUser.role || "Student";
  const userEmail = currentUser.email || "";
  const userPhone = currentUser.phone || "Not provided";
  const userLocation = currentUser.location || "Bhubaneswar, India";
  const userGoals = currentUser.goals || "Not specified";
  const userAvatar = currentUser.avatar || "https://i.pravatar.cc/200";
  const memberSince = currentUser.created_at ? new Date(currentUser.created_at).getFullYear() : "2026";

  // Calculate dynamic stats
  const myPurchases = purchases.filter(p => p.student_email?.toLowerCase() === userEmail.toLowerCase());
  const myBookings = bookings.filter(b => b.phone === userPhone || b.student?.toLowerCase() === userDisplayName.toLowerCase());
  const exploredCount = myPurchases.length;
  const sessionsCount = myBookings.length;
  const savedCount = userRole === "Admin" ? 0 : 1;

  return (
    <SiteLayout>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-orange-50/30">
        {/* Ambient backdrop */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#F97316]/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between"
          >
            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs font-semibold text-[#2563EB] backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> SS Pathways
              </div>
              <h1 className="truncate bg-gradient-to-r from-slate-900 via-[#2563EB] to-[#1d4ed8] bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                My Profile
              </h1>
              <p className="mt-1.5 text-sm text-slate-600 sm:text-base">
                Manage your account, personal details and learning journey.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <IconBtn><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#F97316] ring-2 ring-white" /></IconBtn>
              <IconBtn><Settings className="h-5 w-5" /></IconBtn>
            </div>
          </motion.header>

          <div className="mt-8 grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
            {/* SIDEBAR */}
            <aside className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-7 shadow-xl backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-[#2563EB] via-[#3b6df0] to-[#F97316] opacity-90" />
                <div className="relative flex flex-col items-center pt-8 text-center">
                  <div className="relative">
                    <img
                      src={userAvatar}
                      alt="Profile"
                      className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl"
                    />

                    <button
                      onClick={handleStartEdit}
                      className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg transition hover:bg-blue-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                  <h2 className="mt-5 text-xl font-bold text-slate-900">{userDisplayName}</h2>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#2563EB]/10 to-[#F97316]/10 px-3 py-1 text-xs font-semibold text-[#2563EB]">
                    <GraduationCap className="h-3.5 w-3.5" /> {userRole}
                  </span>
                  
                  <div className="mt-5 w-full space-y-2.5 text-left">
                    <Detail icon={<Mail className="h-4 w-4" />} value={userEmail} />
                    <Detail icon={<Phone className="h-4 w-4" />} value={userPhone} />
                    <Detail icon={<Calendar className="h-4 w-4" />} value={`Member since ${memberSince}`} />
                  </div>

                  <div className="mt-6 grid w-full grid-cols-3 gap-2">
                    <Stat icon={<BookOpen className="h-4 w-4" />} value={exploredCount} label="Courses" />
                    <Stat icon={<MessageSquareHeart className="h-4 w-4" />} value={sessionsCount} label="Sessions" />
                    <Stat icon={<Bookmark className="h-4 w-4" />} value={savedCount} label="Saved" />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartEdit}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#3b6df0] to-[#F97316] px-5 py-3 text-sm font-semibold text-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.6)] transition hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.5)]"
                  >
                    <Pencil className="h-4 w-4" /> Edit Profile
                  </motion.button>

                  {userRole === "Admin" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/admin/dashboard")}
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition"
                    >
                      <ShieldCheck className="h-4 w-4" /> Admin Dashboard
                    </motion.button>
                  )}
                </div>
              </div>
            </aside>

            {/* RIGHT CONTENT */}
            <main className="space-y-6">
              {/* Personal Info */}
              <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-[#2563EB]" />
                    <h2 className="text-lg font-bold text-slate-900">
                      Personal Information
                    </h2>
                  </div>

                  <button
                    onClick={handleStartEdit}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    icon={<User className="h-4 w-4" />}
                    label="Full Name"
                    value={userDisplayName}
                  />

                  <Field
                    icon={<Mail className="h-4 w-4" />}
                    label="Email"
                    value={userEmail}
                  />

                  <Field
                    icon={<Phone className="h-4 w-4" />}
                    label="Phone Number"
                    value={userPhone}
                  />

                  <Field
                    icon={<GraduationCap className="h-4 w-4" />}
                    label="Role"
                    value={userRole}
                  />

                  <Field
                    icon={<Target className="h-4 w-4" />}
                    label="Career Goals"
                    value={userGoals}
                    full
                  />

                  <Field
                    icon={<MapPin className="h-4 w-4" />}
                    label="Location"
                    value={userLocation}
                  />
                </div>
              </div>

              {/* Account Status */}
              <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#2563EB]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Account Status
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <Badge
                    icon={<Mail className="h-3.5 w-3.5" />}
                    label="Email Verified"
                    tone="emerald"
                  />

                  <Badge
                    icon={<Phone className="h-3.5 w-3.5" />}
                    label="Phone Verified"
                    tone="emerald"
                  />

                  <Badge
                    icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                    label="Active Member"
                    tone="blue"
                  />

                  <Badge
                    icon={<Crown className="h-3.5 w-3.5" />}
                    label="Premium Guidance"
                    tone="orange"
                  />
                </div>
              </div>

              {/* Learning Journey */}
              <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-[#2563EB]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Learning Journey
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Counselling Sessions */}
                  <JourneyCard
                    title="Counselling"
                    subtitle={`${myBookings.length} session(s)`}
                    hue="from-orange-500 to-rose-500"
                    icon={<MessageSquareHeart className="h-5 w-5" />}
                  >
                    {myBookings.length > 0 ? (
                      myBookings.map((b) => (
                        <div
                          key={b.id}
                          className="rounded-xl border border-slate-100 bg-white/60 p-2.5"
                        >
                          <p className="truncate text-xs font-semibold text-slate-800">
                            Counselling Session
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            {b.date} at {b.time}
                          </p>
                          <p className="text-[11px] text-[#2563EB]">
                            Status: {b.status}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400">No counselling sessions booked.</p>
                    )}
                  </JourneyCard>

                  {/* Purchased Courses Progress */}
                  <JourneyCard
                    title="Active Courses"
                    subtitle={`${myPurchases.length} program(s)`}
                    hue="from-emerald-500 to-teal-600"
                    icon={<CheckCircle2 className="h-5 w-5" />}
                  >
                    {myPurchases.length > 0 ? (
                      myPurchases.map((p) => (
                        <ProgressRow
                          key={p.id}
                          title={p.course_title}
                          provider="SS Pathways"
                          progress={100}
                        />
                      ))
                    ) : (
                      <p className="text-xs text-slate-400">No courses purchased yet.</p>
                    )}
                  </JourneyCard>
                </div>
              </div>

              {/* Saved Courses */}
              <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-[#2563EB]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Saved Courses
                  </h2>
                </div>

                <div className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2">
                  {savedCourses.map((c, i) => (
                    <motion.div
                      key={c.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -4 }}
                      className="group w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-sm transition hover:shadow-xl"
                    >
                      <div className={`relative h-32 bg-gradient-to-br ${c.hue}`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
                        <Play className="absolute bottom-3 right-3 h-7 w-7 rounded-full bg-white/30 p-1.5 text-white backdrop-blur" />
                      </div>

                      <div className="p-3.5">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {c.title}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {c.provider}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <button className="flex-1 rounded-lg bg-[#2563EB] py-1.5 text-xs font-semibold text-white transition hover:bg-[#1d4ed8]">
                            Continue
                          </button>
                          <button className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-rose-300 hover:text-rose-500">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>



              {/* Logout */}
              <div className="rounded-3xl border border-rose-100/80 bg-gradient-to-br from-white/80 to-rose-50/60 p-6 shadow-xl backdrop-blur-xl">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900">
                      Sign out of SS Pathways
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      You can securely log out of your account at any time.
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex shrink-0 items-center gap-2 rounded-2xl border border-rose-200 bg-white px-5 py-2.5 text-sm font-semibold text-rose-600 shadow-sm transition hover:border-[#F97316] hover:bg-[#F97316] hover:text-white hover:shadow-lg"
                    onClick={() => {
                      localStorage.removeItem("ss_logged_in");
                      localStorage.removeItem("ss_user");
                      window.location.href = "/";
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </motion.button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            >
              <button
                onClick={() => setIsEditing(false)}
                className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>

              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" /> Edit Profile
              </h2>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Avatar URL
                  </label>
                  <input
                    type="text"
                    value={editForm.avatar}
                    onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Career Goals
                  </label>
                  <textarea
                    rows={3}
                    value={editForm.goals}
                    onChange={(e) => setEditForm({ ...editForm, goals: e.target.value })}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                {editError && (
                  <p className="text-xs text-red-500 text-center font-semibold">{editError}</p>
                )}

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="rounded-xl bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {editLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}

/* ---------- atoms ---------- */

function IconBtn({ children }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/60 bg-white/70 text-slate-700 shadow-sm backdrop-blur-xl transition hover:text-[#2563EB] hover:shadow-md"
    >
      {children}
    </motion.button>
  );
}

function Detail({ icon, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-white/60 px-3 py-2 text-xs text-slate-600">
      <span className="text-[#2563EB]">{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-gradient-to-br from-white to-blue-50/60 p-3 text-center shadow-sm">
      <div className="mx-auto grid h-7 w-7 place-items-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">{icon}</div>
      <p className="mt-1.5 text-lg font-extrabold text-slate-900">{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  );
}

function Field({ icon, label, value, full }) {
  return (
    <div className={`group rounded-2xl border border-slate-100 bg-white/70 p-3.5 transition hover:border-[#2563EB]/40 hover:shadow-sm ${full ? "sm:col-span-2" : ""}`}>
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <span className="text-[#2563EB]">{icon}</span> {label}
      </div>
      <p className="mt-1.5 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

function Badge({ icon, label, tone }) {
  const tones = {
    emerald: "from-emerald-500/15 to-emerald-500/5 text-emerald-700 ring-emerald-200",
    blue: "from-[#2563EB]/15 to-[#2563EB]/5 text-[#2563EB] ring-blue-200",
    orange: "from-[#F97316]/15 to-[#F97316]/5 text-[#c2410c] ring-orange-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r px-3.5 py-1.5 text-xs font-semibold ring-1 ${tones[tone]}`}>
      <CheckCircle2 className="h-3.5 w-3.5" /> {icon} {label}
    </span>
  );
}

function JourneyCard({ title, subtitle, hue, icon, children }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm transition hover:shadow-lg flex flex-col h-full">
      <div className="mb-3 flex items-center gap-3">
        <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${hue} text-white shadow`}>{icon}</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900">{title}</p>
          <p className="text-[11px] text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-2.5 flex-1 overflow-y-auto max-h-48 scrollbar-thin pr-1">{children}</div>
    </motion.div>
  );
}

function ProgressRow({ title, provider, progress }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="min-w-0 truncate font-semibold text-slate-800">{title}</span>
        <span className="shrink-0 text-[10px] text-slate-400">{progress}%</span>
      </div>
      <p className="text-[10px] text-slate-400">{provider}</p>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#F97316]"
        />
      </div>
    </div>
  );
}

function Action({ icon, title, desc, hue }) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-4 text-left shadow-sm transition hover:shadow-xl"
    >
      <div className={`mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${hue} text-white shadow-md`}>{icon}</div>
      <p className="text-sm font-bold text-slate-900">{title}</p>
      <p className="mt-0.5 text-[11px] text-slate-500">{desc}</p>
      <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2563EB]" />
    </motion.button>
  );
}

function SecBtn({ icon, label }) {
  return (
    <motion.button
      whileHover={{ x: 3 }}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#2563EB]/40 hover:bg-white w-full text-left"
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">{icon}</span>
        <span className="truncate">{label}</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-[#2563EB]" />
    </motion.button>
  );
}

export default ProfilePage;