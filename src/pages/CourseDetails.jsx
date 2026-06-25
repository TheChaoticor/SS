import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Clock,
  IndianRupee,
  Monitor,
  ShieldCheck,
} from "lucide-react";

import SiteLayout from "../components/SiteLayout";
import { COURSES } from "../data/courses";

export default function CourseDetails() {
  const { id } = useParams();

  const course = COURSES.find((course) => course.id === id);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <SiteLayout>
      <section className="relative pt-28 pb-12 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-90" />

        <div className="relative mx-auto max-w-7xl px-5">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to courses
          </Link>

          <div className="mt-6 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                {course.category}
              </span>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight"
              >
                {course.title}
              </motion.h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  {course.institution}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Monitor className="h-4 w-4" />
                  {course.mode}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-orange" />
                  Admin verified
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={course.image}
                alt={course.title}
                className="w-full aspect-[16/10] object-cover rounded-2xl shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold">
                Course overview
              </h2>

              <p className="mt-3 text-muted-foreground leading-relaxed">
                {course.overview}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold">
                What you'll get
              </h2>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {course.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 rounded-xl bg-card border border-border p-4 shadow-soft"
                  >
                    <div className="h-9 w-9 rounded-lg bg-primary/10 grid place-items-center text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-medium">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold">
                Eligibility
              </h2>

              <p className="mt-3 text-muted-foreground">
                {course.eligibility}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl bg-card-gradient border border-border shadow-elegant p-6">
              <div className="text-sm text-muted-foreground">
                Total fees
              </div>

              <div className="mt-1 font-display text-4xl font-bold text-foreground flex items-center">
                {course.fees !== "Free" && (
                  <IndianRupee className="h-7 w-7" />
                )}

                <span>
                  {course.fees === "Free"
                    ? "Free"
                    : course.fees.replace("₹", "")}
                </span>
              </div>

              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">
                    Institution
                  </span>

                  <span className="font-medium">
                    {course.institution}
                  </span>
                </li>

                <li className="flex justify-between">
                  <span className="text-muted-foreground">
                    Duration
                  </span>

                  <span className="font-medium">
                    {course.duration}
                  </span>
                </li>

                <li className="flex justify-between">
                  <span className="text-muted-foreground">
                    Mode
                  </span>

                  <span className="font-medium">
                    {course.mode}
                  </span>
                </li>

                <li className="flex justify-between">
                  <span className="text-muted-foreground">
                    Level
                  </span>

                  <span className="font-medium">
                    {course.level}
                  </span>
                </li>
              </ul>

              <button className="mt-6 w-full rounded-xl bg-cta text-white font-semibold py-3.5 shadow-glow hover:scale-[1.02] transition-transform">
                Enroll Now
              </button>

              <Link
                to="/recommend"
                className="mt-3 w-full inline-flex justify-center rounded-xl bg-secondary text-foreground font-semibold py-3 hover:bg-primary/10 transition-colors"
              >
                Get similar recommendations
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}