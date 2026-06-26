import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

import SiteLayout from "../components/SiteLayout";
import { useData } from "../context/DataContext";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { settings, addLead } = useData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.subject || "Contact Page Inquiry",
      notes: formData.message,
    });
    if (res && res.success) {
      setSent(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSent(false), 5000);
    }
  };

  const contactInfo = settings?.contact || {
    email: "hello@ss-edu.com",
    phone: "+91 98765 43210",
    address: "Bhubaneswar, Odisha, India"
  };

  return (
    <SiteLayout>
      <section className="relative bg-hero text-white pt-36 pb-20 overflow-hidden">
        <div className="absolute -bottom-20 -right-10 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />

        <div className="mx-auto max-w-5xl px-5">
          <span className="text-xs font-semibold tracking-widest uppercase text-orange">
            Contact
          </span>

          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold">
            Let's talk learning.
          </h1>

          <p className="mt-3 text-white/75 max-w-xl">
            Whether you're a learner, an institution, or just curious — we'd
            love to hear from you.
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-5">
            {[
              {
                Icon: Mail,
                t: "Email",
                d: contactInfo.email,
              },
              {
                Icon: Phone,
                t: "Phone",
                d: contactInfo.phone,
              },
              {
                Icon: MapPin,
                t: "Address",
                d: contactInfo.address,
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl bg-card-gradient border border-border shadow-soft p-5 flex items-start gap-4"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 grid place-items-center text-primary">
                  <contact.Icon className="h-5 w-5" />
                </div>

                <div>
                  <div className="font-semibold">{contact.t}</div>

                  <div className="text-sm text-muted-foreground">
                    {contact.d}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="rounded-2xl bg-navy text-white p-6 shadow-elegant">
              <div className="font-display font-semibold text-lg">
                Office hours
              </div>

              <div className="mt-2 text-sm text-white/75">
                Mon – Fri · 10:00 – 18:00 IST
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="md:col-span-3 rounded-2xl bg-card border border-border shadow-elegant p-7"
          >
            <h2 className="font-display text-2xl font-bold">
              Send us a message
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              We typically reply within 24 hours.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Field
                label="Your name"
                placeholder="Ananya R."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <Field
                label="Email"
                type="email"
                placeholder="you@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <Field
                label="Phone Number"
                type="tel"
                placeholder="+91 9999999999"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <Field
                label="Subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">
                Message
              </label>

              <textarea
                required
                rows={5}
                placeholder="Tell us a bit about what you're looking for..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1.5 w-full rounded-xl bg-secondary px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cta text-white px-6 py-3 font-semibold shadow-glow hover:scale-[1.02] transition-transform"
            >
              {sent ? "Message sent" : "Send message"}

              <Send className="h-4 w-4" />
            </button>
          </motion.form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  className = "",
  value,
  onChange,
  required = true,
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full rounded-xl bg-secondary px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}