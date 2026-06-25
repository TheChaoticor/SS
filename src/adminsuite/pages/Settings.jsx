import { motion } from "framer-motion";
import { useState } from "react";
import {
  Building2,
  Mail,
  Globe,
  Search,
  KeyRound,
  User,
  Save,
} from "lucide-react";

import { PageHeader } from "../components/PageHeader";

const tabs = [
  { id: "company", label: "Company", Icon: Building2 },
  { id: "contact", label: "Contact", Icon: Mail },
  { id: "social", label: "Social Links", Icon: Globe },
  { id: "seo", label: "SEO", Icon: Search },
  { id: "email", label: "Email", Icon: Mail },
  { id: "profile", label: "Admin Profile", Icon: User },
  { id: "password", label: "Password", Icon: KeyRound },
];

function SettingsPage() {
  const [active, setActive] = useState("company");

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure platform-wide preferences and account details."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="glass-card h-fit p-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active === t.id
                  ? "brand-gradient text-white shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <t.Icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </nav>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="glass-card p-6"
        >
          <SettingsContent id={active} />

          <div className="mt-6 flex items-center justify-end gap-2 border-t border-border pt-5">
            <button className="rounded-lg border border-border px-4 py-2 text-sm">
              Cancel
            </button>

            <button className="flex items-center gap-2 rounded-lg brand-gradient px-4 py-2 text-sm font-semibold text-white">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SettingsContent({ id }) {
  const sections = {
    company: { title: "Company Information", fields: [
      { label: "Company Name", value: "SS Pathways" },
      { label: "Tagline", value: "Empowering Careers, Enabling Futures" },
      { label: "Founded Year", value: "2018" },
      { label: "Registration No.", value: "U80904DL2018PTC123456" },
    ]},
    contact: { title: "Contact Information", fields: [
      { label: "Support Email", value: "hello@sspathways.com", type: "email" },
      { label: "Phone", value: "+91 98765 43210" },
      { label: "Address", value: "Connaught Place, New Delhi, India" },
    ]},
    social: { title: "Social Links", fields: [
      { label: "Instagram", value: "https://instagram.com/sspathways" },
      { label: "LinkedIn", value: "https://linkedin.com/company/sspathways" },
      { label: "YouTube", value: "https://youtube.com/@sspathways" },
      { label: "Twitter / X", value: "https://x.com/sspathways" },
    ]},
    seo: { title: "SEO Settings", fields: [
      { label: "Meta Title", value: "SS Pathways — Education Consultancy & EdTech" },
      { label: "Meta Description", value: "Career guidance, courses and counselling for students across India." },
      { label: "Keywords", value: "education, edtech, career, counselling, india" },
    ]},
    email: { title: "Email Settings", fields: [
      { label: "SMTP Host", value: "smtp.sspathways.com" },
      { label: "SMTP Port", value: "587" },
      { label: "From Address", value: "noreply@sspathways.com", type: "email" },
    ]},
    profile: { title: "Admin Profile", fields: [
      { label: "Full Name", value: "Sandeep Sharma" },
      { label: "Role", value: "Super Admin" },
      { label: "Email", value: "sandeep@sspathways.com", type: "email" },
    ]},
    password: { title: "Change Password", fields: [
      { label: "Current Password", value: "", type: "password" },
      { label: "New Password", value: "", type: "password" },
      { label: "Confirm Password", value: "", type: "password" },
    ]},
  };
  const s = sections[id];
  return (
    <>
      <h3 className="text-lg font-semibold">{s.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">Update the information below and click save.</p>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {s.fields.map((f) => (
          <label key={f.label} className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{f.label}</span>
            <input
              type={f.type || "text"} defaultValue={f.value}
              className="h-10 w-full rounded-lg border border-border bg-background/40 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </label>
        ))}
      </div>
    </>
  );
}

export default SettingsPage;