import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  Heart,
  Lightbulb,
  Users,
  Sparkles,
  Target,
  Eye,
} from "lucide-react";

import SiteLayout from "../components/SiteLayout";

export default function About() {
  return (
    <SiteLayout>
      <section className="relative bg-hero text-white pt-36 pb-24 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-orange/30 blur-3xl" />

        <div className="mx-auto max-w-5xl px-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-widest uppercase text-orange"
          >
            About us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[1.05]"
          >
            Education should feel like
            <br />
            a{" "}
            <span className="bg-gradient-to-r from-orange to-white bg-clip-text text-transparent">
              confident choice.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-white/80 max-w-2xl"
          >
            SS is on a mission to make quality learning accessible to every
            curious student — by curating, verifying, and recommending the
            best opportunities the world has to offer.
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              Our story
            </span>

            <h2 className="mt-3 font-display text-4xl font-bold text-foreground">
              Born from one simple question.
            </h2>

            <p className="mt-5 text-muted-foreground leading-relaxed">
              "Why is choosing the right course harder than the course
              itself?" That question sparked SS. We built a platform that
              combines human curation with intelligent matching, so students
              never have to feel lost again.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Today, SS guides thousands of learners across India and beyond
              toward programs that genuinely fit who they are and where they
              want to go.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-cta rounded-3xl blur-2xl opacity-30" />

            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
              alt="Students collaborating"
              className="relative rounded-3xl shadow-elegant w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-background py-24 border-t border-border">
  <div className="mx-auto max-w-7xl px-5">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto"
    >
      <span className="text-xs font-semibold tracking-widest uppercase text-orange">
        Purpose & Vision
      </span>

      <h2 className="mt-3 font-display text-4xl font-bold text-foreground">
        Driven by purpose, built for learners.
      </h2>

      <p className="mt-5 text-muted-foreground">
        We believe every student deserves clarity when making important
        educational and career decisions. Our goal is to remove confusion,
        simplify choices, and help learners move forward with confidence.
      </p>
    </motion.div>

    <div className="mt-14 grid md:grid-cols-3 gap-6">
      {[
        {
          title: "Our Motto",
          icon: Sparkles,
          text: "Guiding every learner toward a future built on clarity, confidence, and opportunity.",
        },
        {
          title: "Our Mission",
          icon: Target,
          text: "To make quality learning opportunities accessible by connecting students with courses, skills, and career paths that align with their goals and potential.",
        },
        {
          title: "Our Vision",
          icon: Eye,
          text: "To become a trusted platform that empowers learners worldwide to make informed educational choices and build meaningful careers.",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group bg-card rounded-2xl p-8 border border-border shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant hover:border-primary/30"
        >
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
            <item.icon className="h-6 w-6" />
          </div>

          <h3 className="font-display text-2xl font-semibold text-primary transition-colors duration-300 group-hover:text-orange">
            {item.title}
          </h3>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            {item.text}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-orange">
              Our values
            </span>

            <h2 className="mt-3 font-display text-4xl font-bold text-foreground">
              What we stand for.
            </h2>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                Icon: Heart,
                t: "Learner-first",
                d: "Every decision starts with the student's growth.",
              },
              {
                Icon: Lightbulb,
                t: "Clarity",
                d: "Cut through noise. Show only what matters.",
              },
              {
                Icon: Compass,
                t: "Guidance",
                d: "Recommend, don't just list. Direction matters.",
              },
              {
                Icon: Users,
                t: "Inclusion",
                d: "Quality learning belongs to everyone.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-soft"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 grid place-items-center text-primary">
                  <value.Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold">
                  {value.t}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {value.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
  <div className="mx-auto max-w-7xl px-5">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto"
    >
      <span className="text-xs font-semibold tracking-widest uppercase text-orange">
        Meet the team
      </span>

      <h2 className="mt-3 font-display text-4xl font-bold text-foreground">
        The people behind SS Pathways.
      </h2>

      <p className="mt-4 text-muted-foreground">
        A passionate team committed to helping students discover better
        learning opportunities and make confident career decisions.
      </p>
    </motion.div>

    <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          name: "Team Member",
          role: "Founder & Career Strategist",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
        },
        {
          name: "Team Member",
          role: "Student Success Advisor",
          image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
        },
        {
          name: "Team Member",
          role: "Learning Specialist",
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
        },
        {
          name: "Team Member",
          role: "Career Counsellor",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
        },
      ].map((member, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group bg-card rounded-2xl border border-border p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant hover:border-primary/30"
        >
          <div className="overflow-hidden rounded-2xl">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <h3 className="mt-5 font-display text-lg font-semibold">
            {member.name}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
            {member.role}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      <section className="relative overflow-hidden bg-navy text-white py-20">
        <div className="absolute inset-0 bg-hero opacity-90" />

        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Ready to find your next step?
          </h2>

          <Link
            to="/recommend"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-4 font-semibold shadow-glow hover:scale-[1.03] transition-transform"
          >
            Get Recommendations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}