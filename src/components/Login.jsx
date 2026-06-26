import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Search,
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

export default function OnboardingModal({ onClose }) {
  const { addAccount, login } = useData();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
    phone: "",
    goals: "",
  });

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const prevStep = () => {
    if (step > 0) {
      setError("");
      setStep((prev) => prev - 1);
    }
  };

  const validateCurrentStep = () => {
    setError("");

    switch (step) {
      case 1:
        if (!formData.email.trim()) {
          setError("Email is required");
          return false;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError("Enter a valid email address");
          return false;
        }

        return true;

      case 2:
        if (!formData.password.trim()) {
          setError("Password is required");
          return false;
        }

        if (formData.password.length < 6) {
          setError(
            "Password must be at least 6 characters"
          );
          return false;
        }

        return true;

      case 3:
        if (!formData.phone.trim()) {
          setError("Phone number is required");
          return false;
        }

        if (!/^[0-9]{10}$/.test(formData.phone)) {
          setError(
            "Enter a valid 10 digit phone number"
          );
          return false;
        }

        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;

    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.goals.trim()) {
      setError(
        "Please tell us what you're looking for"
      );
      return;
    }

    await addAccount(formData);

    localStorage.setItem(
      "ss_onboarding",
      "true"
    );

    if (onClose) {
      onClose();
    }
  };

  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoginError("");
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      setLoginError("Email and password are required");
      return;
    }
    setLoading(true);
    const res = await login(loginForm.email, loginForm.password);
    setLoading(false);
    if (res.success) {
      if (res.user.role === "Admin") {
        navigate("/admin/dashboard");
      }
      if (onClose) {
        onClose();
      }
    } else {
      setLoginError(res.error || "Invalid email or password");
    }
  };

  const cardClass =
    "w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-orange hover:bg-white/10";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#071224] shadow-2xl"
      >
              {/* HEADER */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-xl p-2 text-white/70 hover:bg-white/10"
          >
            <X size={18} />
          </button>

          <h2 className="text-2xl font-bold text-white">
            {isLoginMode ? "Welcome Back" : "Welcome to SS Pathways"}
          </h2>

          <p className="mt-2 text-sm text-white/70">
            {isLoginMode ? "Log in to access your dashboard and courses." : "Create your account and start your journey."}
          </p>

          {!isLoginMode && (
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs text-white/60">
                <span>
                  Step {step + 1} of {totalSteps}
                </span>

                <span>
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="h-full rounded-full bg-orange"
                />
              </div>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="min-h-[340px] px-6 pb-6">
          <AnimatePresence mode="wait">
            {isLoginMode ? (
              <motion.div
                key="loginForm"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full space-y-4"
              >
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-[#0c1b30] p-4 text-white outline-none focus:border-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-[#0c1b30] p-4 text-white outline-none focus:border-orange"
                    />
                  </div>
                  {loginError && (
                    <p className="text-sm text-red-400 font-medium">{loginError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-orange py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? "Logging in..." : "Log In"}
                  </button>
                </form>
                <div className="text-center mt-6 text-sm text-white/60">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setLoginError("");
                      setIsLoginMode(false);
                    }}
                    className="text-orange hover:underline font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* STEP 1 */}
                {step === 0 && (
              <motion.div
                key="step1"
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -30,
                }}
              >
                <h3 className="mb-6 text-xl font-semibold text-white">
                  Who are you?
                </h3>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cardClass}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        role: "Student",
                      });

                      nextStep();
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <GraduationCap className="text-orange" />
                      <span className="text-white">
                        Student
                      </span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cardClass}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        role: "Working Professional",
                      });

                      nextStep();
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase className="text-orange" />
                      <span className="text-white">
                        Working Professional
                      </span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cardClass}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        role: "Job Seeker",
                      });

                      nextStep();
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Search className="text-orange" />
                      <span className="text-white">
                        Job Seeker
                      </span>
                    </div>
                  </motion.button>
                </div>
                <div className="mt-8 text-center text-sm text-white/60">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setLoginError("");
                      setIsLoginMode(true);
                    }}
                    className="text-orange hover:underline font-semibold"
                  >
                    Log In
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <motion.div
                key="step2"
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -30,
                }}
              >
                <h3 className="mb-6 text-xl font-semibold text-white">
                  What's your email?
                </h3>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none"
                />

                {error && (
                  <p className="mt-3 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={prevStep}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-white"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <button
                    onClick={nextStep}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange py-4 font-semibold text-white"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}
                        {/* STEP 3 */}
            {step === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <h3 className="mb-6 text-xl font-semibold text-white">
                  Create a password
                </h3>

                <input
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none"
                />

                {error && (
                  <p className="mt-3 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={prevStep}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-white"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <button
                    onClick={nextStep}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange py-4 font-semibold text-white"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4 */}
            {step === 3 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <h3 className="mb-6 text-xl font-semibold text-white">
                  Phone Number
                </h3>

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none"
                />

                {error && (
                  <p className="mt-3 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={prevStep}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-white"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <button
                    onClick={nextStep}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange py-4 font-semibold text-white"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5 */}
            {step === 4 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <h3 className="mb-2 text-xl font-semibold text-white">
                  What are you looking for?
                </h3>

                <p className="mb-5 text-sm text-white/60">
                  Help our team understand your goals.
                </p>

                <textarea
                  rows={5}
                  placeholder="Example: Quantity Surveying, Tendering, Placement Support, Weekend Classes..."
                  value={formData.goals}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      goals: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none"
                />

                {error && (
                  <p className="mt-3 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={prevStep}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-white"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="flex-1 rounded-2xl bg-primary py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                  >
                    Complete Registration 🚀
                  </button>
                </div>
              </motion.div>
            )}
            </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}