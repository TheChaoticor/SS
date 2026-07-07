import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Clock,
  IndianRupee,
  Monitor,
  ShieldCheck,
  X,
  Check,
} from "lucide-react";

import SiteLayout from "../components/SiteLayout";
import { useData } from "../context/DataContext";

export default function CourseDetails() {
  const { id } = useParams();
  const { courses, addPurchase } = useData();

  const course = courses.find((course) => course.id === id);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1 = Details form, 2 = QR payment, 3 = Success
  const [studentDetails, setStudentDetails] = useState({ name: "", email: "", phone: "" });
  const [txnId, setTxnId] = useState("");
  const [modalError, setModalError] = useState("");
  const [isSubmittingPurchase, setIsSubmittingPurchase] = useState(false);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!studentDetails.name || !studentDetails.email || !studentDetails.phone) {
      setModalError("Please fill out all fields.");
      return;
    }
    setModalError("");
    if (course.fees === "Free" || course.fees === "0") {
      handlePurchaseComplete("FREE-" + Math.random().toString(36).substring(2, 8).toUpperCase());
    } else {
      setPaymentStep(2);
    }
  };

  const handlePurchaseComplete = async (finalTxnId) => {
    if (course.fees !== "Free" && course.fees !== "0" && (!finalTxnId || !finalTxnId.trim())) {
      setModalError("Transaction ID / Reference is required to confirm payment.");
      return;
    }
    setModalError("");
    setIsSubmittingPurchase(true);
    const purchaseData = {
      student_name: studentDetails.name,
      student_email: studentDetails.email,
      course_id: course.id,
      course_title: course.title,
      amount: course.fees === "Free" ? 0 : course.fees,
      upi_txn_id: finalTxnId,
    };
    
    const res = await addPurchase(purchaseData);
    setIsSubmittingPurchase(false);
    if (res.success) {
      setPaymentStep(3);
    } else {
      setModalError("Failed to register enrollment. Please try again.");
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentStep(1);
    setStudentDetails({ name: "", email: "", phone: "" });
    setTxnId("");
    setModalError("");
  };

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

              <button
                onClick={() => setShowPaymentModal(true)}
                className="mt-6 w-full rounded-xl bg-cta text-white font-semibold py-3.5 shadow-glow hover:scale-[1.02] transition-transform"
              >
                Buy Course
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

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#071224] p-6 text-white shadow-2xl">
            <button
              onClick={closePaymentModal}
              className="absolute right-5 top-5 rounded-xl p-2 text-white/70 hover:bg-white/10"
            >
              <X size={18} />
            </button>

            {paymentStep === 1 && (
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white">Enroll in {course.title}</h3>
                <p className="text-sm text-white/60">
                  {course.fees === "Free" ? "Register your details to start this free course immediately." : "Provide your details to generate your secure UPI payment."}
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Full Name</label>
                    <input
                      type="text" required
                      value={studentDetails.name}
                      onChange={(e) => setStudentDetails({ ...studentDetails, name: e.target.value })}
                      placeholder="Rahul Sharma"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange focus:ring-2 focus:ring-orange/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Email Address</label>
                    <input
                      type="email" required
                      value={studentDetails.email}
                      onChange={(e) => setStudentDetails({ ...studentDetails, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange focus:ring-2 focus:ring-orange/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Phone Number</label>
                    <input
                      type="tel" required
                      value={studentDetails.phone}
                      onChange={(e) => setStudentDetails({ ...studentDetails, phone: e.target.value })}
                      placeholder="9876543210"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange focus:ring-2 focus:ring-orange/30"
                    />
                  </div>
                </div>

                {modalError && <p className="text-xs text-red-400 font-semibold">{modalError}</p>}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[var(--orange)] py-3 font-semibold text-white transition hover:brightness-110 active:scale-95 shadow-lg"
                >
                  {course.fees === "Free" ? "Start Course" : "Proceed to Pay"}
                </button>
              </form>
            )}

            {paymentStep === 2 && (
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">Scan & Pay</h3>
                <p className="text-sm text-white/60">
                  Scan the QR code below with GPay, PhonePe, Paytm, or any UPI app to complete your payment of <span className="font-bold text-orange">₹{course.fees}</span>.
                </p>

                <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-2xl bg-white p-3 shadow-lg">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      `upi://pay?pa=sspathways@upi&pn=SS Pathways&am=${course.fees.replace(/[^0-9]/g, "")}&tn=${course.id}&cu=INR`
                    )}`}
                    alt="UPI Payment QR Code"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="text-xs text-white/40">
                  UPI ID: <span className="font-mono text-white/80">sspathways@upi</span>
                </div>

                <div className="space-y-3 pt-2 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Transaction ID / Ref (Required)</label>
                    <input
                      type="text"
                      required
                      value={txnId}
                      onChange={(e) => setTxnId(e.target.value)}
                      placeholder="e.g. UPI1234567890"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-orange focus:ring-2 focus:ring-orange/30"
                    />
                  </div>
                </div>

                {modalError && <p className="text-xs text-red-400 font-semibold">{modalError}</p>}

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setPaymentStep(1)}
                    className="flex-1 rounded-xl border border-white/15 bg-white/5 py-3 font-semibold text-white hover:bg-white/10"
                  >
                    Back
                  </button>
                  <button
                    disabled={isSubmittingPurchase}
                    onClick={() => handlePurchaseComplete(txnId)}
                    className="flex-[2] rounded-xl bg-[var(--orange)] py-3 font-semibold text-white hover:brightness-110 active:scale-95 disabled:opacity-50"
                  >
                    {isSubmittingPurchase ? "Processing..." : "Confirm Payment"}
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 3 && (
              <div className="text-center py-6 space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">Enrollment Successful!</h3>
                <p className="text-sm text-white/70">
                  Congratulations, you have successfully enrolled in <span className="font-semibold text-white">{course.title}</span>. Our team will contact you shortly with the onboarding credentials.
                </p>
                <button
                  onClick={closePaymentModal}
                  className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600 active:scale-95"
                >
                  Go to Classroom
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </SiteLayout>
  );
}