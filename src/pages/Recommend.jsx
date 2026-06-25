import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import SiteLayout from "../components/SiteLayout";
import {
  CATEGORIES,
  MODES,
  BUDGETS,
  DURATIONS,
} from "../data/courses";

export default function Recommend() {
  const navigate = useNavigate();

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