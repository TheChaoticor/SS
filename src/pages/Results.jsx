import { Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import SiteLayout from "../components/SiteLayout";
import { COURSES } from "../data/courses";

function durationMonths(s) {
  const n = parseInt(s);
  return isNaN(n) ? 0 : n;
}

function scoreCourse(course, query) {
  let score = 40;

  if (
    query.interest &&
    course.category === query.interest
  ) {
    score += 30;
  }

  if (query.mode && course.mode === query.mode) {
    score += 15;
  }

  if (
    query.budget &&
    course.budget === query.budget
  ) {
    score += 10;
  }

  if (query.duration) {
    const months = durationMonths(course.duration);

    if (
      query.duration === "1-3 months" &&
      months <= 3
    ) {
      score += 5;
    }

    if (
      query.duration === "3-6 months" &&
      months >= 3 &&
      months <= 6
    ) {
      score += 5;
    }

    if (
      query.duration === "6+ months" &&
      months >= 6
    ) {
      score += 5;
    }
  }

  return Math.min(
    99,
    score + (course.title.length % 7)
  );
}

export default function Results() {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/recommend" replace />;
  }

  const ranked = [...COURSES]
    .map((course) => ({
      course,
      score: scoreCourse(course, state),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return (
    <SiteLayout>
      <section className="relative bg-hero text-white pt-36 pb-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5">
          <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-orange" />
            Personalized for you
          </span>

          <h1 className="mt-5 font-display text-5xl md:text-6xl font-bold">
            Your matches are ready.
          </h1>

          <p className="mt-3 text-white/75 max-w-xl">
            We curated these courses based on your
            interest
            {state.interest &&
              ` in ${state.interest}`}
            {state.mode &&
              `, ${state.mode.toLowerCase()} learning`}
            {state.budget &&
              `, ${state.budget.toLowerCase()} budget`}
            .
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ranked.map(
            ({ course, score }, index) => (
              <motion.div
                key={course.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.07,
                }}
                className="rounded-2xl bg-card-gradient overflow-hidden border border-border shadow-soft hover:-translate-y-1 transition-transform"
              >
                <div className="relative aspect-[16/10]">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-3 right-3 rounded-full bg-cta text-white text-xs font-bold px-3 py-1.5 shadow-glow">
                    {score}% match
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs text-muted-foreground font-medium">
                    {course.institution}
                  </div>

                  <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                    {course.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                    <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 font-semibold">
                      {course.category}
                    </span>

                    <span className="rounded-full bg-secondary text-foreground/70 px-2 py-0.5">
                      {course.duration}
                    </span>

                    <span className="rounded-full bg-secondary text-foreground/70 px-2 py-0.5">
                      {course.mode}
                    </span>
                  </div>

                  <Link
                    to={`/courses/${course.id}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Explore course

                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/recommend"
            className="inline-flex items-center gap-2 rounded-full bg-secondary text-foreground px-6 py-3 font-semibold hover:bg-primary/10 transition-colors"
          >
            Refine my preferences
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}