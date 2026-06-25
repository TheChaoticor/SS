import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  FileText,
  MessageSquare,
  Users,
  Video,
} from "lucide-react";
import SiteLayout from "../components/SiteLayout";

function JobSupportPage() {
  return (
    <SiteLayout>
      <section className="relative bg-hero text-white pt-36 pb-24 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-orange/30 blur-3xl" />

        <div className="mx-auto max-w-5xl px-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-widest uppercase text-orange"
          >
            Career Services
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[1.05]"
          >
            Land your dream
            <br />
            job with{" "}
            <span className="bg-gradient-to-r from-orange to-white bg-clip-text text-transparent">
              expert support.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-white/80 max-w-2xl"
          >
            From polishing your resume to acing the interview — our
            job support ecosystem gives you the edge in a competitive
            market.
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              What we offer
            </span>

            <h2 className="mt-3 font-display text-4xl font-bold text-foreground">
              End-to-end job support.
            </h2>

            <p className="mt-4 text-muted-foreground">
              A complete toolkit designed to take you from applicant
              to employee.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                Icon: FileText,
                t: "Resume Review",
                d: "Get your resume professionally reviewed and optimized for ATS and recruiters.",
              },
              {
                Icon: Video,
                t: "Mock Interviews",
                d: "Practice with industry experts through live video mock interviews with real feedback.",
              },
              {
                Icon: Briefcase,
                t: "Job Placement",
                d: "Access curated job openings and get referred to top companies in your domain.",
              },
              {
                Icon: MessageSquare,
                t: "1-on-1 Mentorship",
                d: "Connect with professionals who have walked the path you want to take.",
              },
              {
                Icon: Users,
                t: "Networking Events",
                d: "Join exclusive webinars and networking sessions with hiring managers.",
              },
              {
                Icon: CheckCircle,
                t: "Career Roadmap",
                d: "Receive a personalized step-by-step plan to reach your career goals faster.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-elegant transition-shadow"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 grid place-items-center text-primary">
                  <s.Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold">
                  {s.t}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-orange">
              Success stories
            </span>

            <h2 className="mt-3 font-display text-4xl font-bold text-foreground">
              Thousands have already made the leap.
            </h2>

            <p className="mt-5 text-muted-foreground leading-relaxed">
              Our job support program has helped students land roles
              at leading companies across tech, finance, healthcare,
              and design. We do not just prepare you — we advocate
              for you.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-card rounded-xl px-6 py-4 border border-border shadow-soft text-center">
                <div className="font-display text-2xl font-bold text-primary">
                  2,400+
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Placements
                </div>
              </div>

              <div className="bg-card rounded-xl px-6 py-4 border border-border shadow-soft text-center">
                <div className="font-display text-2xl font-bold text-primary">
                  180+
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Partner Companies
                </div>
              </div>

              <div className="bg-card rounded-xl px-6 py-4 border border-border shadow-soft text-center">
                <div className="font-display text-2xl font-bold text-primary">
                  94%
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Success Rate
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-orange rounded-3xl blur-2xl opacity-25" />

            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80"
              alt="Team celebrating success"
              className="relative rounded-3xl shadow-elegant w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy text-white py-20">
        <div className="absolute inset-0 bg-hero opacity-90" />

        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Ready to get hired?
          </h2>

          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Join our job support program and start building the career
            you deserve today.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-4 font-semibold shadow-glow hover:scale-[1.03] transition-transform"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

export default JobSupportPage;