import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

import SiteLayout from "../components/SiteLayout";
import { useData } from "../context/DataContext";
import { COURSES } from "../data/courses";
import {
  CATEGORIES,
  MODES,
  BUDGETS,
  DURATIONS,
} from "../data/courses";

function getMatchingCourses(courses, stepKey, selectedValue) {
  if (!selectedValue) return [];
  return courses.filter((course) => {
    if (stepKey === "interest") {
      return course.category === selectedValue;
    }
    if (stepKey === "mode") {
      return course.mode === selectedValue;
    }
    if (stepKey === "budget") {
      return course.budget === selectedValue;
    }
    if (stepKey === "duration") {
      const months = parseInt(course.duration);
      if (isNaN(months)) return false;
      if (selectedValue === "1-3 months") {
        return months <= 3;
      }
      if (selectedValue === "3-6 months") {
        return months >= 3 && months <= 6;
      }
      if (selectedValue === "6+ months") {
        return months >= 6;
      }
    }
    return false;
  });
}

export default function Recommend() {
  const navigate = useNavigate();
  const { courses } = useData() || { courses: [] };

  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState({
    interest: "",
    mode: "",
    budget: "",
    duration: "",
  });

  const steps = [
    {
      key: "interest",
      title: "What's your area of interest?",
      subtitle: "Pick a category that excites you most.",
      options: CATEGORIES,
    },
    {
      key: "mode",
      title: "How do you prefer to learn?",
      subtitle: "Choose the format that fits your routine.",
      options: [...MODES],
    },
    {
      key: "budget",
      title: "What's your budget?",
      subtitle: "We'll match courses within your range.",
      options: [...BUDGETS],
    },
    {
      key: "duration",
      title: "How long do you want to study?",
      subtitle: "Pick a comfortable timeline.",
      options: [...DURATIONS],
    },
  ];

  const current = steps[step];

  const value = answers[current.key];

  const isLast = step === steps.length - 1;

  const next = () => {
    if (!value) return;

    if (isLast) {
      navigate("/results", {
        state: answers,
      });
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const allCourses = (courses && courses.length > 0 ? courses : COURSES)
    .filter(c => c.status === "Published" || !c.status);

  const matchingCourses = getMatchingCourses(allCourses, current.key, value);

  return (
    <SiteLayout>
      <section className="relative bg-hero text-white pt-36 pb-20 overflow-hidden min-h-[80vh]">
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-orange/30 blur-3xl" />

        <div className="absolute bottom-0 -left-20 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-5">
          <div className="flex items-center justify-between mb-8 text-sm">
            <span className="font-semibold tracking-widest uppercase text-orange">
              Step {step + 1} of {steps.length}
            </span>

            <span className="text-white/70">
              {Math.round(
                ((step + 1) / steps.length) * 100
              )}
              % complete
            </span>
          </div>

          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cta"
              animate={{
                width: `${
                  ((step + 1) / steps.length) * 100
                }%`,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="mt-12"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                {current.title}
              </h1>

              <p className="mt-3 text-white/75">
                {current.subtitle}
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-3">
                {current.options.map((option) => {
                  const selected = value === option;

                  return (
                    <button
                      key={option}
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [current.key]: option,
                        }))
                      }
                      className={`text-left rounded-2xl px-5 py-4 border transition-all ${
                        selected
                          ? "bg-white text-foreground border-orange shadow-glow"
                          : "glass-dark border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">
                          {option}
                        </span>

                        {selected && (
                          <Check className="h-5 w-5 text-orange" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Tag System for Matched Courses */}
              {value && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 border-t border-white/10 pt-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-4 w-4 text-orange" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                      Courses matching "{value}" ({matchingCourses.length})
                    </h3>
                  </div>
                  {matchingCourses.length > 0 ? (
                    <div className="flex flex-wrap gap-2.5">
                      {matchingCourses.map((c) => (
                        <Link
                          key={c.id}
                          to={`/courses/${c.id}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:border-orange transition-all duration-300 shadow-sm"
                        >
                          <span className="font-medium text-white/90">{c.title}</span>
                          <span className="text-[10px] bg-orange/20 text-orange font-bold px-2 py-0.5 rounded-full">
                            {c.duration}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-white/50">
                      No courses match this preference yet, but continue the quiz to find the closest fits!
                    </p>
                  )}
                </motion.div>
              )}

              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={() =>
                    setStep((prev) =>
                      Math.max(0, prev - 1)
                    )
                  }
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  onClick={next}
                  disabled={!value}
                  className="inline-flex items-center gap-2 rounded-full bg-orange text-white px-6 py-3 font-semibold shadow-glow hover:scale-[1.03] transition-transform disabled:opacity-40 disabled:hover:scale-100"
                >
                  {isLast
                    ? "See My Matches"
                    : "Continue"}

                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </SiteLayout>
  );
}