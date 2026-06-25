import { motion, useInView, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import SiteLayout from "../components/SiteLayout";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Share2,
  UserPlus,
  Gift,
  Sparkles,
  Trophy,
  Crown,
  Star,
  Target,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Users,
  IndianRupee,
  CheckCircle2,
  Plus,
  Minus,
  Quote,
  Activity,
} from "lucide-react";

{/*Counter Function*/}
function Counter({ to, prefix = "", suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);

  const rounded = useTransform(
    mv,
    (v) => `${prefix}${Math.floor(v).toLocaleString("en-IN")}${suffix}`
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });

      return controls.stop;
    }
  }, [inView, to, duration, mv]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
const EASE = [0.16, 1, 0.3, 1];

{/*Fade Up*/}
const fadeUp = {
  hidden: { opacity: 0, y: 30 },

  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: EASE,
    },
  }),
};

{/*Section Header*/}
function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="mx-auto max-w-2xl text-center"
    >
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-orange">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
      )}

      <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

{/*Hero Visual*/}
function ReferralNetwork() {
  // central node + 6 satellites
  const nodes = [
    { x: 18, y: 22, name: "Ananya", color: "from-orange to-[oklch(0.6_0.2_30)]" },
    { x: 82, y: 18, name: "Rahul", color: "from-[oklch(0.7_0.15_200)] to-[oklch(0.5_0.18_240)]" },
    { x: 90, y: 60, name: "Priya", color: "from-[oklch(0.75_0.15_140)] to-[oklch(0.55_0.18_160)]" },
    { x: 72, y: 88, name: "Aarav", color: "from-orange to-[oklch(0.7_0.2_20)]" },
    { x: 22, y: 82, name: "Neha", color: "from-[oklch(0.7_0.18_300)] to-[oklch(0.5_0.2_280)]" },
    { x: 6, y: 52, name: "Ishan", color: "from-[oklch(0.75_0.15_60)] to-[oklch(0.55_0.18_40)]" },
  ];

  return (
    <div className="relative aspect-square w-full max-w-[520px]">
      {/* glow ring */}
      <div className="absolute inset-8 rounded-full border border-white/5" />
      <div className="absolute inset-16 rounded-full border border-white/5" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-dashed border-white/10"
      />

      {/* connection lines */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.2 55)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.78 0.2 55)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="url(#line)"
            strokeWidth="0.4"
            className="animate-dash"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>

      {/* center node */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-orange to-[oklch(0.6_0.2_30)] shadow-[0_0_60px_oklch(0.74_0.18_50/0.7)]"
      >
        <div className="absolute inset-0 animate-pulse-glow rounded-full bg-orange/40 blur-xl" />
        <span className="relative font-display text-xl font-bold text-[oklch(0.15_0.04_265)]">YOU</span>
      </motion.div>

      {/* satellite nodes */}
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 180 }}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${n.color} shadow-[0_10px_30px_oklch(0_0_0/0.4)]`}
          >
            <span className="text-sm font-bold text-[oklch(0.15_0.04_265)]">
              {n.name.charAt(0)}
            </span>
          </motion.div>
          <div className="mt-1 text-center text-[10px] font-medium text-muted-foreground">
            {n.name}
          </div>
        </motion.div>
      ))}

      {/* floating reward badges */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -right-2 top-1/4 z-20 glass flex items-center gap-2 rounded-2xl px-3 py-2 shadow-[0_10px_40px_oklch(0_0_0/0.4)]"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange/20">
          <Gift className="h-3.5 w-3.5 text-orange" />
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground">Reward</div>
          <div className="text-xs font-bold">+₹500</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute -left-4 bottom-1/4 z-20 glass flex items-center gap-2 rounded-2xl px-3 py-2 shadow-[0_10px_40px_oklch(0_0_0/0.4)]"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[oklch(0.7_0.15_140/0.2)]">
          <CheckCircle2 className="h-3.5 w-3.5 text-[oklch(0.75_0.15_140)]" />
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground">Verified</div>
          <div className="text-xs font-bold">Success</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
        className="absolute -top-2 right-1/3 z-20 glass rounded-2xl px-3 py-2 shadow-[0_10px_40px_oklch(0_0_0/0.4)]"
      >
        <div className="flex items-center gap-1.5">
          <Trophy className="h-3.5 w-3.5 text-orange" />
          <span className="text-xs font-bold">Top Referrer</span>
        </div>
      </motion.div>
    </div>
  );
}

function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-orange/20 blur-[120px]" />
      <div className="absolute right-[-100px] top-40 h-[480px] w-[480px] rounded-full bg-orange/10 blur-[140px]" />
      <div className="absolute left-1/3 bottom-0 h-[400px] w-[400px] rounded-full bg-orange/10 blur-[140px]" />
    </div>
  );
}

function Particles() {
  return null;
}

{/*Hero*/}
function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <Blobs />
      <Particles />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-orange"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Refer & Earn Program
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Refer Friends. <br />
            <span className="text-gradient-orange">Earn Rewards.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Help students discover the right career path while earning exciting rewards for every successful referral.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#cta"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-orange px-6 py-3 text-sm font-semibold text-[oklch(0.15_0.04_265)] shadow-[0_10px_40px_-10px_oklch(0.74_0.18_50/0.8)] transition hover:shadow-[0_15px_50px_-10px_oklch(0.74_0.18_50/1)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Start Referring
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-white/10"
            >
              Learn More
            </a>
          </motion.div>

          {/* stats */}
          <motion.dl
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6"
          >
            {[
              { v: 10000, suffix: "+", label: "Students Guided" },
              { v: 5, prefix: "₹", suffix: "L+", label: "Rewards Distributed" },
              { v: 95, suffix: "%", label: "Success Rate" },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp}>
                <dt className="font-display text-3xl font-bold text-foreground">
                  <Counter to={s.v} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <ReferralNetwork />
        </motion.div>
      </div>
    </section>
  );
}

{/*How It Works*/}
function HowItWorks() {
  const steps = [
    { icon: Share2, title: "Share Your Referral Link", desc: "Get your unique link from the dashboard and share it with friends across any channel." },
    { icon: UserPlus, title: "Friend Joins SS Pathways", desc: "They sign up using your link and start their career discovery journey." },
    { icon: Gift, title: "Earn Exciting Rewards", desc: "Receive instant rewards once your friend completes onboarding successfully." },
  ];

  return (
    <section id="how" className="relative py-24 sm:py-32">
      <SectionHeader eyebrow="Three simple steps" title="How It Works" subtitle="A frictionless flow designed for instant rewards and effortless sharing." />
      <div className="relative mx-auto mt-16 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl glass p-8 transition"
          >
            <div className="mb-6 flex items-center justify-between">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange/20 to-orange/5 ring-1 ring-orange/30"
              >
                <s.icon className="h-6 w-6 text-orange" />
              </motion.div>
              <span className="font-display text-5xl font-bold text-white/5">{i + 1}</span>
            </div>
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="absolute right-[-18px] top-1/2 hidden -translate-y-1/2 md:block">
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy ring-1 ring-white/10"
                >
                  <ArrowRight className="h-4 w-4 text-orange" />
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

{/*Reward Tiers*/}

function RewardTiers() {
  const tiers = [
    { name: "Starter", icon: Star, referrals: 1, reward: "₹500", perks: ["Instant reward credit", "Email confirmation", "Dashboard tracking"] },
    { name: "Growth", icon: Trophy, referrals: 3, reward: "₹2,000", perks: ["All Starter perks", "Priority support", "Exclusive webinars"], featured: true },
    { name: "Champion", icon: Crown, referrals: 5, reward: "₹5,000", perks: ["All Growth perks", "1:1 mentor session", "Champion badge"] },
  ];

  return (
    <section id="rewards" className="relative py-24 sm:py-32">
      <SectionHeader eyebrow="Reward tiers" title="Earn More With Every Referral" subtitle="The more friends you bring, the bigger the rewards. Unlock exclusive benefits as you climb." />
      <div className="mx-auto mt-16 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -10 }}
            className={`group relative overflow-hidden rounded-3xl p-8 transition ${
              t.featured
                ? "bg-gradient-to-b from-orange/15 to-transparent ring-2 ring-orange/40 shadow-[0_30px_80px_-30px_oklch(0.74_0.18_50/0.6)] md:-translate-y-4"
                : "glass"
            }`}
          >
            {/* shine sweep */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            {t.featured && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute right-6 top-6 flex items-center gap-1 rounded-full bg-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[oklch(0.15_0.04_265)] shadow-[0_8px_20px_oklch(0.74_0.18_50/0.5)]"
              >
                <Sparkles className="h-3 w-3" /> Most Popular
              </motion.div>
            )}

            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${t.featured ? "bg-orange text-[oklch(0.15_0.04_265)]" : "bg-white/5 text-orange ring-1 ring-white/10"}`}>
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold">{t.name}</h3>
            </div>

            <div className="mt-6 text-sm text-muted-foreground">{t.referrals} Successful Referral{t.referrals > 1 ? "s" : ""}</div>
            <div className="mt-1 font-display text-5xl font-bold tracking-tight">
              {t.reward}
              {t.featured && <span className="ml-2 align-middle text-xs font-medium text-orange">+ bonus</span>}
            </div>

            <ul className="mt-8 space-y-3">
              {t.perks.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  {p}
                </li>
              ))}
            </ul>

            <a
              href="#cta"
              className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                t.featured
                  ? "bg-orange text-[oklch(0.15_0.04_265)] shadow-[0_10px_30px_-10px_oklch(0.74_0.18_50/0.8)] hover:shadow-[0_15px_40px_-10px_oklch(0.74_0.18_50/1)]"
                  : "border border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              Start Now <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

{/*Why Us?*/}
function WhyUs() {
  const items = [
    { icon: Target, title: "Personalized Guidance", desc: "Tailored career roadmaps based on each student's strengths and aspirations." },
    { icon: Briefcase, title: "Expert Career Support", desc: "Mentors from top universities and industry leaders guide every decision." },
    { icon: TrendingUp, title: "Industry-Relevant Recommendations", desc: "Course and career suggestions aligned with tomorrow's job market." },
    { icon: ShieldCheck, title: "Trusted Learning Pathways", desc: "Curated programs and partners that thousands of students rely on." },
  ];

  return (
    <section className="relative py-24 sm:py-32">
      <SectionHeader eyebrow="Why SS Pathways" title="Why Students Trust SS Pathways" subtitle="A platform built around outcomes, mentorship, and clarity." />
      <div className="mx-auto mt-16 grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group rounded-3xl glass p-6 transition hover:ring-1 hover:ring-orange/30"
          >
            <motion.div
              whileHover={{ rotate: -8, scale: 1.1 }}
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange/20 to-transparent ring-1 ring-orange/20"
            >
              <it.icon className="h-5 w-5 text-orange" />
            </motion.div>
            <h3 className="text-base font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

{/*Dashboard Preview*/}
function DashboardPreview() {
  const activity = [
    { name: "Ananya R.", action: "joined via your link", reward: "+₹500", status: "success" },
    { name: "Rahul S.", action: "completed onboarding", reward: "+₹500", status: "success" },
    { name: "Priya K.", action: "signed up", reward: "Pending", status: "pending" },
    { name: "Aarav M.", action: "joined via your link", reward: "+₹500", status: "success" },
  ];

  return (
    <section id="dashboard" className="relative py-24 sm:py-32">
      <SectionHeader eyebrow="Your dashboard" title="Track Your Progress" subtitle="A clean, real-time view of your referrals, rewards, and activity." />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto mt-16 max-w-5xl px-6"
      >
        <div className="absolute -inset-10 -z-10 rounded-[40px] bg-gradient-to-br from-orange/20 via-transparent to-[oklch(0.4_0.18_280/0.2)] blur-3xl" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[oklch(0.2_0.045_265)] to-[oklch(0.17_0.04_265)] p-1 shadow-[0_40px_100px_-30px_oklch(0_0_0/0.7)]"
        >
          {/* window chrome */}
          <div className="flex items-center justify-between rounded-t-2xl bg-white/[0.02] px-5 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.2_25)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.15_85)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.15_140)]" />
            </div>
            <div className="rounded-md bg-white/5 px-3 py-1 text-[10px] text-muted-foreground">sspathways.app/dashboard</div>
            <div className="w-12" />
          </div>

          <div className="p-6 sm:p-8">
            {/* stat cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Total Referrals", value: 24, icon: Users, suffix: "" },
                { label: "Successful Referrals", value: 18, icon: CheckCircle2, suffix: "" },
                { label: "Rewards Earned", value: 12500, icon: IndianRupee, prefix: "₹", suffix: "" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                    <s.icon className="h-4 w-4 text-orange" />
                  </div>
                  <div className="mt-3 font-display text-3xl font-bold">
                    <Counter to={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: ["55%", "75%", "92%"][i] }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-orange to-[oklch(0.7_0.2_30)]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-5">
              {/* chart */}
              <div className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/5 lg:col-span-3">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Referral Activity</div>
                    <div className="text-xs text-muted-foreground">Last 7 days</div>
                  </div>
                  <Activity className="h-4 w-4 text-orange" />
                </div>
                <div className="flex h-32 items-end gap-2">
                  {[40, 65, 50, 80, 45, 90, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 rounded-md bg-gradient-to-t from-orange/40 to-orange shadow-[0_-5px_20px_oklch(0.74_0.18_50/0.4)]"
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span key={i} className="flex-1 text-center">{d}</span>
                  ))}
                </div>
              </div>

              {/* activity */}
              <div className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/5 lg:col-span-2">
                <div className="mb-4 text-sm font-semibold">Recent Activity</div>
                <ul className="space-y-3">
                  {activity.map((a, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange/30 to-orange/5 text-xs font-bold">
                        {a.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-medium">{a.name}</div>
                        <div className="truncate text-[10px] text-muted-foreground">{a.action}</div>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          a.status === "success"
                            ? "bg-[oklch(0.7_0.15_140/0.15)] text-[oklch(0.78_0.15_140)]"
                            : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        {a.reward}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

{/*Testimonials*/}
function Stories() {
  const stories = [
    {
      name: "Kavya Sharma",
      role: "Engineering Student, Delhi",
      reward: "₹5,000",
      quote: "I shared SS Pathways with my classmates — five of them found their direction within weeks. The rewards were a sweet bonus on top of helping friends.",
    },
    {
      name: "Arjun Verma",
      role: "Pre-University, Bengaluru",
      reward: "₹2,000",
      quote: "The platform's career mapping is genuinely useful. Referring made sense because I knew my friends would actually benefit from it.",
    },
    {
      name: "Meera Iyer",
      role: "Graduate, Mumbai",
      reward: "₹3,500",
      quote: "Smooth tracking, instant rewards, and zero friction. The dashboard kept me motivated to keep referring more people from my batch.",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32">
      <SectionHeader eyebrow="Success stories" title="Referral Success Stories" subtitle="Real students, real rewards, real impact." />
      <div className="mx-auto mt-16 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {stories.map((s, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col rounded-3xl glass p-7 transition"
          >
            <Quote className="h-6 w-6 text-orange/60" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/90">
              "{s.quote}"
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange to-[oklch(0.6_0.2_30)] font-bold text-[oklch(0.15_0.04_265)]">
                {s.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{s.name}</div>
                <div className="text-[11px] text-muted-foreground">{s.role}</div>
              </div>
              <span className="rounded-full bg-orange/15 px-2.5 py-1 text-xs font-bold text-orange">{s.reward}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

{/*FAQ*/}
function FAQ() {
  const items = [
    { q: "When do I receive rewards?", a: "Rewards are credited within 24 hours of your referred friend completing the onboarding process and verifying their account." },
    { q: "Is there a referral limit?", a: "No. You can refer as many friends as you like. The more successful referrals you bring in, the higher the tier and rewards you unlock." },
    { q: "How are successful referrals counted?", a: "A successful referral is a new user who signs up using your unique link and completes the SS Pathways onboarding flow." },
    { q: "Can I refer multiple friends?", a: "Absolutely. There are no caps — share your link freely across messages, social media, and email." },
    { q: "How do I track my referrals?", a: "Every referral, status update, and reward shows up live on your personal dashboard, including detailed activity history." },
  ];
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Everything you need to know about the SS Pathways referral program." />
      <div className="mx-auto mt-12 max-w-3xl px-6">
        <div className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="overflow-hidden rounded-2xl glass"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold sm:text-base">{it.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange"
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{it.a}</div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

{/*Final CTA*/}

function FinalCTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[oklch(0.25_0.06_265)] via-[oklch(0.2_0.05_265)] to-[oklch(0.18_0.04_265)] px-6 py-20 text-center shadow-[0_40px_100px_-30px_oklch(0_0_0/0.7)] sm:px-12 sm:py-24"
        >
          {/* glow */}
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-orange/30 blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[oklch(0.4_0.18_280/0.3)] blur-[120px]" />

          {/* floating icons */}
          {[
            { Icon: Gift, x: "8%", y: "20%", d: 0 },
            { Icon: Trophy, x: "88%", y: "30%", d: 1 },
            { Icon: Sparkles, x: "12%", y: "75%", d: 1.5 },
            { Icon: Star, x: "85%", y: "70%", d: 0.5 },
          ].map(({ Icon, x, y, d }, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: d }}
              className="absolute hidden h-10 w-10 items-center justify-center rounded-2xl glass text-orange sm:flex"
              style={{ left: x, top: y }}
            >
              <Icon className="h-4 w-4" />
            </motion.div>
          ))}

          <div className="relative">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Start Sharing. <span className="text-gradient-orange">Start Earning.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Help others discover the right path while unlocking exciting rewards for yourself.
            </p>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#"
              className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full bg-orange px-8 py-4 text-base font-semibold text-[oklch(0.15_0.04_265)] shadow-[0_20px_60px_-15px_oklch(0.74_0.18_50/0.9)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Refer Now
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

{/*Export*/}
export default function ReferAndEarn() {
  return (
    <SiteLayout>
        <div className="refer-page min-h-screen bg-[oklch(0.16_0.04_265)] text-white overflow-hidden">
            <Hero />
            <HowItWorks />
            <RewardTiers />
            <WhyUs />
            <DashboardPreview />
            <Stories />
            <FAQ />
            <FinalCTA />
        </div>
    </SiteLayout>
  );
}