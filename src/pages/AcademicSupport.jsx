import { useEffect, useRef, useState } from "react";
import SiteLayout from "../components/SiteLayout";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import {
  GraduationCap,
  FileText,
  School,
  RefreshCcw,
  Compass,
  Route as RouteIcon,
  Users,
  Sparkles,
  Zap,
  ShieldCheck,
  HeartHandshake,
  Workflow,
  Phone,
  ArrowRight,
  Plus,
  CheckCircle2,
  BookOpen,
  Award,
} from "lucide-react";

/* Reusable Bits */
function Section({
  children,
  id,
  className = "",
}) {
  return (
    <section id={id} className={`relative px-6 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#CBD5E1]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] shadow-[0_0_8px_#F97316]" />
      {children}
    </div>
  );
}

function MagneticButton({
  children,
  variant = "primary",
  className = "",
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, {
    stiffness: 220,
    damping: 18,
  });

  const sy = useSpring(y, {
    stiffness: 220,
    damping: 18,
  });

  const handleMove = (e) => {
    const r = ref.current?.getBoundingClientRect();

    if (!r) return;

    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors";

  const styles =
    variant === "primary"
      ? "bg-[#1E40AF] text-white hover:bg-[#1736a0] shadow-[0_10px_40px_-12px_rgba(30,64,175,0.6)]"
      : "border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {variant === "primary" && (
        <span className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-[#1E40AF] via-[#F97316] to-[#1E40AF] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60" />
      )}
    </motion.button>
  );
}

/* Particles */
function Particles({ count = 24 }) {
  const items = Array.from({ length: count });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const size = 2 + Math.random() * 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 8 + Math.random() * 10;
        const delay = Math.random() * 6;

        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#F97316]"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              boxShadow: "0 0 12px rgba(6,182,212,0.7)",
              opacity: 0.5,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

/* Hero */
function Hero() {
  return (
    <Section className="!pt-28 md:!pt-36">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <Particles count={28} />
      {/* glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#1E40AF]/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-[380px] w-[380px] rounded-full bg-[#F97316]/15 blur-[120px]" />

      <div className="relative grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-7"
        >
          <SectionLabel>SS Pathways · Academic Support</SectionLabel>

          <h1 className="text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Academic Support for{" "}
            <span className="relative inline-block">
              <span className="text-[#F97316]">
                10th &amp; 12th
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-[#1E40AF] to-[#F97316]"
              />
            </span>{" "}
            Students
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[#CBD5E1] md:text-lg">
            Get expert guidance, academic assistance, documentation support, and
            personalized pathways to help you continue your education
            confidently.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton variant="primary">
              Get Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton variant="ghost">
              <Phone className="h-4 w-4" />
              Talk to an Expert
            </MagneticButton>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-[#CBD5E1]">
            {[
              { icon: ShieldCheck, t: "Verified guidance" },
              { icon: Users, t: "500+ students helped" },
              { icon: Award, t: "Trusted by parents" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-[#22C55E]" />
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        <HeroVisual />
      </div>
    </Section>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto aspect-square w-full max-w-[560px]"
    >
      {/* rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-white/10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 rounded-full border border-white/5"
      />

      {/* center core */}
      <div className="absolute inset-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl glass-card p-5 backdrop-blur-xl glow-primary">
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <GraduationCap className="h-10 w-10 text-[#F97316]" />
          <p className="text-center text-xs font-semibold text-white">
            SS Pathways
          </p>
        </div>
      </div>

      {/* floating chips */}
      {[
        {
          icon: FileText,
          label: "Documents",
          pos: "left-2 top-10",
          delay: 0,
          color: "#1E40AF",
        },
        {
          icon: Award,
          label: "Certificates",
          pos: "right-2 top-20",
          delay: 0.5,
          color: "#22C55E",
        },
        {
          icon: BookOpen,
          label: "Curriculum",
          pos: "left-6 bottom-20",
          delay: 1,
          color: "#F97316",
        },
        {
          icon: Compass,
          label: "Pathways",
          pos: "right-6 bottom-10",
          delay: 1.5,
          color: "#1E40AF",
        },
      ].map(({ icon: Icon, label, pos, delay, color }) => (
        <motion.div
          key={label}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute ${pos} glass-card flex items-center gap-2 px-3 py-2`}
        >
          <Icon className="h-4 w-4" style={{ color }} />
          <span className="text-xs font-medium text-white">{label}</span>
        </motion.div>
      ))}

      {/* orbiting dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#F97316] shadow-[0_0_16px_#F97316]" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8"
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#22C55E] shadow-[0_0_12px_#22C55E]" />
      </motion.div>
    </motion.div>
  );
}

/*Services*/
const services = [
  {
    icon: GraduationCap,
    title: "Academic Guidance",
    desc: "Subject-wise mentoring, learning plans and exam strategy tailored to 10th and 12th students.",
  },
  {
    icon: FileText,
    title: "Documentation Assistance",
    desc: "Marksheets, migration, bonafide and verification — handled end-to-end with care.",
  },
  {
    icon: School,
    title: "School & Board Support",
    desc: "Coordination with schools and education boards for affiliations, transfers and approvals.",
  },
  {
    icon: RefreshCcw,
    title: "Re-Admission Guidance",
    desc: "Structured help for students rejoining studies after a gap or change of board.",
  },
  {
    icon: Compass,
    title: "Education Counseling",
    desc: "1-on-1 counseling to align streams, ambitions and the right academic direction.",
  },
  {
    icon: RouteIcon,
    title: "Future Pathway Planning",
    desc: "Map the road from school to college and career with clear, achievable milestones.",
  },
];

function Services() {
  return (
    <Section id="services">
      <div className="mb-16 flex flex-col items-center text-center">
        <FadeUp>
          <SectionLabel>What we offer</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Complete academic support, designed for{" "}
            <span className="text-[#F97316]">every step</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-5 max-w-2xl text-base text-[#CBD5E1]">
            From documentation to long-term planning — six focused services that
            cover everything 10th and 12th students need.
          </p>
        </FadeUp>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.title} index={i} {...s} />
        ))}
      </div>
    </Section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1E293B]/60 p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#1E40AF]/40"
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#1E40AF]/0 via-[#F97316]/0 to-[#1E40AF]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#1E40AF]/15 group-hover:via-[#F97316]/10 group-hover:to-transparent group-hover:opacity-100" />

      <motion.div
        whileHover={{ rotate: -6, scale: 1.05 }}
        className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#1E40AF]/20 to-[#F97316]/10"
      >
        <Icon className="h-6 w-6 text-[#F97316]" />
      </motion.div>

      <h3 className="relative mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="relative text-sm leading-relaxed text-[#CBD5E1]">{desc}</p>

      <div className="relative mt-5 flex items-center gap-2 text-sm font-medium text-[#1E40AF] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Learn more <ArrowRight className="h-4 w-4" />
      </div>
    </motion.div>
  );
}

/* Why Choose us */
const reasons = [
  { icon: Users, title: "Experienced Counselors", desc: "Mentors who have guided hundreds of students through 10th and 12th transitions." },
  { icon: Sparkles, title: "Personalized Support", desc: "Plans built around each student's situation, goals and learning pace." },
  { icon: Zap, title: "Quick Assistance", desc: "Fast turnarounds on documents, queries and consultations — no waiting around." },
  { icon: ShieldCheck, title: "Trusted Guidance", desc: "Transparent advice you can rely on, backed by years of academic experience." },
  { icon: HeartHandshake, title: "Student-Centric Approach", desc: "Every recommendation puts the student's wellbeing and future first." },
  { icon: Workflow, title: "End-to-End Help", desc: "From the first call to the final admission, we stay with you throughout." },
];

function WhyChooseUs() {
  return (
    <Section id="why">
      <div className="mb-16 flex flex-col items-center text-center">
        <FadeUp>
          <SectionLabel>Why SS Pathways</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Built on trust, delivered with{" "}
            <span className="text-[#1E40AF]">care</span>
          </h2>
        </FadeUp>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className="group flex gap-4 rounded-2xl border border-white/10 bg-[#1E293B]/50 p-6 backdrop-blur-xl transition-colors hover:border-[#F97316]/40"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] ring-1 ring-white/10 transition-colors group-hover:ring-[#F97316]/40">
              <r.icon className="h-5 w-5 text-[#22C55E]" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-white">{r.title}</h3>
              <p className="mt-1 text-sm text-[#CBD5E1]">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* Process Timeline */
const steps = [
  { title: "Consultation", desc: "Share your situation — we listen and understand your academic goals." },
  { title: "Assessment", desc: "We assess your current standing, academic records and requirements." },
  { title: "Documentation Review", desc: "Every certificate, marksheet and form is reviewed and prepared." },
  { title: "Guidance & Support", desc: "Personalized roadmap, mentor calls and continuous follow-ups." },
  { title: "Next Academic Step", desc: "You move ahead — re-admission, board exam or the next academic level." },
];

function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="process">
      <div className="mb-20 flex flex-col items-center text-center">
        <FadeUp>
          <SectionLabel>Our process</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            A clear path from{" "}
            <span className="text-[#22C55E]">first call</span> to next step
          </h2>
        </FadeUp>
      </div>

      <div ref={ref} className="relative mx-auto max-w-4xl">
        {/* spine */}
        <div className="absolute left-5 top-0 h-full w-px bg-white/8 md:left-1/2" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-5 top-0 w-px bg-gradient-to-b from-[#1E40AF] to-[#F97316] md:left-1/2"
        />

        <div className="flex flex-col gap-14">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <TimelineNode key={step.title} step={step} index={i} isLeft={isLeft} />
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function TimelineNode({
  step,
  index,
  isLeft,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:items-center ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* node dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute left-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0F172A] md:left-1/2"
      >
        <div className="h-3 w-3 rounded-full bg-[#F97316] shadow-[0_0_14px_#F97316]" />
      </motion.div>

      {/* card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`ml-14 w-full rounded-2xl border border-white/10 bg-[#1E293B]/60 p-6 backdrop-blur-xl md:ml-0 md:w-[calc(50%-2.5rem)]`}
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#1E40AF]">
          Step {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
        <p className="mt-2 text-sm text-[#CBD5E1]">{step.desc}</p>
      </motion.div>

      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
    </div>
  );
}

/* Metrics */
function Counter({
  to,
  suffix = "",
  duration = 1.8,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const metrics = [
  { to: 500, suffix: "+", label: "Students Guided" },
  { to: 95, suffix: "%", label: "Satisfaction Rate" },
  { to: 100, suffix: "+", label: "Academic Cases Supported" },
  { to: 50, suffix: "+", label: "Partner Institutions" },
];

function Metrics() {
  return (
    <Section id="metrics">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-10 md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1E40AF]/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#F97316]/15 blur-[100px]" />

        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-[#1E40AF] to-[#F97316] bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl">
                <Counter to={m.to} suffix={m.suffix} />
              </div>
              <p className="mt-3 text-sm font-medium text-[#CBD5E1]">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* FAQ */

const faqs = [
  {
    q: "Who is eligible for 10th & 12th academic support?",
    a: "Any student currently in or returning to 10th or 12th — whether through a school board, open schooling, or after an academic break — can avail our support.",
  },
  {
    q: "What documents do I need to get started?",
    a: "Typically a previous marksheet, ID proof and (if applicable) a school leaving or transfer certificate. We'll guide you on anything else specific to your case.",
  },
  {
    q: "How does the support process work?",
    a: "It begins with a free consultation, followed by an assessment, document review, a personalized roadmap and continuous follow-up until your next academic step.",
  },
  {
    q: "Do you provide one-on-one counseling?",
    a: "Yes. Every student receives dedicated 1-on-1 counseling sessions with an experienced counselor — never generic group advice.",
  },
  {
    q: "Will I get academic guidance beyond documentation?",
    a: "Absolutely. We help with subject planning, exam preparation strategy, stream selection and long-term pathway planning for college and career.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <FadeUp>
          <SectionLabel>FAQs</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Answers to common questions
          </h2>
          <p className="mt-5 text-[#CBD5E1]">
            Can't find what you're looking for? Reach out and our team will get
            back to you within a day.
          </p>
          <div className="mt-8">
            <MagneticButton variant="ghost">
              <Phone className="h-4 w-4" />
              Talk to us
            </MagneticButton>
          </div>
        </FadeUp>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`overflow-hidden rounded-2xl border bg-[#1E293B]/60 backdrop-blur-xl transition-colors ${
                  isOpen ? "border-[#1E40AF]/40" : "border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-white">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0F172A]"
                  >
                    <Plus className="h-4 w-4 text-[#F97316]" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-[#CBD5E1]">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* FINAL CTA */

function FinalCTA() {
  return (
    <Section id="cta" className="!pb-32">
      <FadeUp>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1E293B]/60 p-10 text-center backdrop-blur-xl md:p-16">
          {/* gradient ring */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1E40AF]/20 via-transparent to-[#F97316]/20" />
          <div className="pointer-events-none absolute -inset-px rounded-3xl">
            <div className="absolute -top-32 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-[#1E40AF]/30 blur-[100px]" />
          </div>
          <Particles count={14} />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0F172A]">
              <CheckCircle2 className="h-7 w-7 text-[#22C55E]" />
            </div>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Take the Next Step in Your{" "}
              <span className="bg-gradient-to-r from-[#1E40AF] to-[#F97316] bg-clip-text text-transparent">
                Academic Journey
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[#CBD5E1]">
              Connect with our experts and receive personalized support today.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton variant="primary">
                Book Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton variant="ghost">
                <Phone className="h-4 w-4" />
                Contact Us
              </MagneticButton>
            </div>
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}

function AcademicSupportPage() {
  return (
    <SiteLayout>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-screen overflow-hidden bg-[#0F172A] text-white"
      >
        <Hero />
        <Services />
        <WhyChooseUs />
        <Timeline />
        <Metrics />
        <FAQ />
        <FinalCTA />
      </motion.main>
    </SiteLayout>
  );
}
export default AcademicSupportPage;