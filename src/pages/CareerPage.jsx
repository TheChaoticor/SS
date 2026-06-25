import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Clock, MapPin, Search } from "lucide-react";
import { useState } from "react";
import SiteLayout from "../components/SiteLayout";

const JOBS = [
  {
    id: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Bengaluru, India / Remote",
    type: "Full-time",
    experience: "4-7 years",
    salary: "₹24-38 LPA",
    description:
      "Build delightful, performant interfaces for millions of learners using React, TypeScript, and modern web tooling.",
    skills: ["React", "TypeScript", "Tailwind", "Next.js"],
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer (Node.js)",
    department: "Engineering",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "3-6 years",
    salary: "₹20-32 LPA",
    description:
      "Design scalable APIs and data pipelines that power our recommendation engine and student experience.",
    skills: ["Node.js", "PostgreSQL", "AWS", "GraphQL"],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₹18-28 LPA",
    description:
      "Craft thoughtful, premium experiences across web and mobile. Own end-to-end design for major product surfaces.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist — Recommendations",
    department: "Data & AI",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "2-5 years",
    salary: "₹22-35 LPA",
    description:
      "Improve our course recommendation models using ML, ranking algorithms, and personalization techniques.",
    skills: ["Python", "PyTorch", "SQL", "ML Ops"],
  },
  {
    id: "career-counselor",
    title: "Senior Career Counselor",
    department: "Student Success",
    location: "Delhi, India",
    type: "Full-time",
    experience: "5+ years",
    salary: "₹12-18 LPA",
    description:
      "Guide students one-on-one through course selection, applications, and long-term career planning.",
    skills: ["Counseling", "Education Industry", "Communication"],
  },
  {
    id: "content-marketer",
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    experience: "3-6 years",
    salary: "₹14-22 LPA",
    description:
      "Own our content strategy — blogs, social, video — and grow organic reach across India's student community.",
    skills: ["SEO", "Content Strategy", "Copywriting", "Analytics"],
  },
  {
    id: "growth-intern",
    title: "Growth Intern",
    department: "Marketing",
    location: "Bengaluru, India",
    type: "Internship",
    experience: "0-1 years",
    salary: "₹25-40k / month",
    description:
      "Work directly with the growth team on experiments, campaigns, and student outreach initiatives.",
    skills: ["Excel", "Analytics", "Communication"],
  },
  {
    id: "partnerships-lead",
    title: "University Partnerships Lead",
    department: "Business Development",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "5-8 years",
    salary: "₹20-30 LPA",
    description:
      "Build and grow our network of university and institutional partnerships across India.",
    skills: ["B2B Sales", "Negotiation", "EdTech"],
  },
];

function CareersPage() {
  const [query, setQuery] = useState("");

  const filtered = JOBS.filter((j) => {
    const matchQuery =
      !query ||
      j.title.toLowerCase().includes(query.toLowerCase()) ||
      j.skills.some((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      ) ||
      j.department.toLowerCase().includes(query.toLowerCase());

    return matchQuery;
  });

  return (
    <SiteLayout>
      <section className="relative bg-hero text-white pt-36 pb-24 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-orange/20 blur-3xl" />

        <div className="mx-auto max-w-5xl px-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-widest uppercase text-orange"
          >
            We're Hiring
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[1.05]"
          >
            Build the future of
            <br />
            <span className="bg-gradient-to-r from-orange to-white bg-clip-text text-transparent">
              education with us.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-white/80 max-w-2xl"
          >
            Join a team obsessed with helping every student find their
            right path. Explore our open positions below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-6 text-sm"
          >
            <div>
              <div className="font-display text-3xl font-bold text-orange">
                {JOBS.length}
              </div>
              <div className="text-white/60">Open Positions</div>
            </div>

            <div>
              <div className="font-display text-3xl font-bold text-orange">
                6
              </div>
              <div className="text-white/60">Departments</div>
            </div>

            <div>
              <div className="font-display text-3xl font-bold text-orange">
                5
              </div>
              <div className="text-white/60">Cities + Remote</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              Open Roles
            </span>

            <h2 className="mt-3 font-display text-4xl font-bold text-foreground">
              Find your next role.
            </h2>

            <p className="mt-4 text-muted-foreground">
              Filter by department or search by role and skills.
            </p>
          </div>

          <div className="mt-10 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roles or skills..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                No roles match your filters. Try a different search.
              </div>
            )}

            {filtered.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group bg-card rounded-2xl p-6 md:p-7 border border-border shadow-soft hover:shadow-elegant hover:border-primary/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold tracking-wide uppercase text-orange">
                        {job.department}
                      </span>

                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {job.experience}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" />
                        {job.salary}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2.5 py-1 rounded-md bg-secondary text-foreground/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:shrink-0">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-soft hover:shadow-glow transition-all"
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="relative overflow-hidden bg-navy text-white py-20">
        <div className="absolute inset-0 bg-hero opacity-90" />

        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Don't see your role?
          </h2>

          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            We're always looking for exceptional people. Send us your
            resume and tell us how you can contribute.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-4 font-semibold shadow-glow hover:scale-[1.03] transition-transform"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

export default CareersPage;