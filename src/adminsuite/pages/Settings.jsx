import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  Globe,
  Save,
  Info,
} from "lucide-react";

import { PageHeader } from "../components/PageHeader";
import { useData } from "../../context/DataContext";

const tabs = [
  { id: "company", label: "Company", Icon: Building2 },
  { id: "contact", label: "Contact Info", Icon: Mail },
  { id: "social", label: "Social Links", Icon: Globe },
];

function SettingsPage() {
  const { settings, updateSettings, loading } = useData();
  const [activeTab, setActiveTab] = useState("company");
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);

  // Initialize form state once settings are loaded
  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleFieldChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!formData) return;
    setSaving(true);
    const res = await updateSettings(formData);
    setSaving(false);
    if (res.success) {
      alert("Settings saved successfully and updated across the website!");
    } else {
      alert("Failed to save settings preferences.");
    }
  };

  if (loading || !formData) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure platform-wide preferences, branding, and contact details."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        {/* Navigation Sidebar Tabs */}
        <nav className="glass-card h-fit p-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === t.id
                  ? "brand-gradient text-white shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <t.Icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </nav>

        {/* Dynamic Form fields based on tab active */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="glass-card p-6 text-white"
        >
          {activeTab === "company" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="text-orange" size={20} /> Company Information
              </h3>
              <p className="text-xs text-muted-foreground border-b border-border pb-2">
                Configure corporate parameters shown in headers and descriptions.
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Company Name</span>
                  <input
                    type="text"
                    value={formData.company?.name || ""}
                    onChange={(e) => handleFieldChange("company", "name", e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Tagline / Motto</span>
                  <input
                    type="text"
                    value={formData.company?.tagline || ""}
                    onChange={(e) => handleFieldChange("company", "tagline", e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Founded Year</span>
                  <input
                    type="text"
                    value={formData.company?.founded || ""}
                    onChange={(e) => handleFieldChange("company", "founded", e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Registration No.</span>
                  <input
                    type="text"
                    value={formData.company?.regNo || ""}
                    onChange={(e) => handleFieldChange("company", "regNo", e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </label>

                <label className="block col-span-1 md:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Company Description / About</span>
                  <textarea
                    rows={4}
                    value={formData.company?.description || ""}
                    onChange={(e) => handleFieldChange("company", "description", e.target.value)}
                    className="w-full rounded-lg border border-border bg-[#0f172a] p-3 text-sm text-white outline-none focus:border-orange resize-none"
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Mail className="text-orange" size={20} /> Contact Details
              </h3>
              <p className="text-xs text-muted-foreground border-b border-border pb-2">
                Updates here propagate to the Footer and Contact Page immediately.
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block col-span-1 md:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Support Email</span>
                  <input
                    type="email"
                    value={formData.contact?.email || ""}
                    onChange={(e) => handleFieldChange("contact", "email", e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Phone Number</span>
                  <input
                    type="text"
                    value={formData.contact?.phone || ""}
                    onChange={(e) => handleFieldChange("contact", "phone", e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Office Address</span>
                  <input
                    type="text"
                    value={formData.contact?.address || ""}
                    onChange={(e) => handleFieldChange("contact", "address", e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="text-orange" size={20} /> Social Links
              </h3>
              <p className="text-xs text-muted-foreground border-b border-border pb-2">
                Branding social links displayed in footers.
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Instagram URL</span>
                  <input
                    type="text"
                    value={formData.social?.instagram || ""}
                    onChange={(e) => handleFieldChange("social", "instagram", e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">LinkedIn Company URL</span>
                  <input
                    type="text"
                    value={formData.social?.linkedin || ""}
                    onChange={(e) => handleFieldChange("social", "linkedin", e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Twitter / X URL</span>
                  <input
                    type="text"
                    value={formData.social?.twitter || ""}
                    onChange={(e) => handleFieldChange("social", "twitter", e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">WhatsApp Link</span>
                  <input
                    type="text"
                    value={formData.social?.whatsapp || ""}
                    onChange={(e) => handleFieldChange("social", "whatsapp", e.target.value)}
                    placeholder="https://wa.me/91XXXXXXXXXX"
                    className="h-10 w-full rounded-lg border border-border bg-[#0f172a] px-3 text-sm text-white outline-none focus:border-orange"
                  />
                </label>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-end gap-2 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => setFormData(settings)}
              className="rounded-lg border border-border px-4 py-2 text-sm text-white hover:bg-white/5 transition cursor-pointer"
            >
              Reset
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg brand-gradient px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SettingsPage;