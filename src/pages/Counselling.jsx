import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, Clock, Mail, Phone, User, MessageSquare, Sparkles, Heart, Shield, GraduationCap, BookOpen, Lightbulb, Pencil, Atom, Brain } from "lucide-react";

import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";
import SiteLayout from "../components/SiteLayout";
import { useData } from "../context/DataContext";

const ANIMATION_CSS = `
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent) 55%, transparent); }
  50% { box-shadow: 0 0 0 14px color-mix(in oklab, var(--accent) 0%, transparent); }
}
.animate-fade-in-up { animation: fade-in-up 0.6s ease-out both; }
.animate-fade-in { animation: fade-in 0.5s ease-out both; }
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 12s ease infinite;
}
.animate-shimmer { animation: shimmer 2.5s linear infinite; }
.animate-pulse-glow { animation: pulse-glow 2.4s ease-in-out infinite; }
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 40px -18px color-mix(in oklab, var(--primary) 50%, transparent);
}
.bg-royal-gradient {
  background-image: linear-gradient(120deg, var(--royal-deep) 0%, var(--royal) 45%, var(--orange) 100%);
}
`;

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];

const indianPhoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").refine(
    (val) => {
      const cleanVal = val.replace(/[\s\-()]/g, "");
      return indianPhoneRegex.test(cleanVal);
    },
    {
      message: "Please enter a valid 10-digit Indian phone number (starts with 6-9, optionally with +91 or 0)",
    }
  ),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, "Please select a time slot"),
  notes: z.string().max(500, "Notes must be under 500 characters").optional(),
});


export function BookingPage() {
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const { addBooking } = useData();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: undefined,
      time: "",
      notes: "",
    },
  });

  const selectedDate = watch("date");

  const onSubmit = async (data) => {
    const res = await addBooking(data);
    if (res.success) {
      setBookingRef(res.booking.id);
      setSubmitted(true);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setValue("time", time, { shouldValidate: true });
  };

  const handleDateSelect = (date) => {
    if (date) {
      setValue("date", date, { shouldValidate: true });
    }
  };

  const handleNewBooking = () => {
    setSubmitted(false);
    setBookingRef("");
    setSelectedTime("");
    reset();
  };

  return (
    <SiteLayout>
    <div className="min-h-screen bg-background">
      <style>{ANIMATION_CSS}</style>
      {/* Header */}
      <header className="relative overflow-hidden bg-royal-gradient animate-gradient py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-16 -left-10 h-72 w-72 rounded-full bg-white/30 blur-3xl animate-float" />
          <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-[var(--orange)]/50 blur-3xl animate-float" style={{ animationDelay: "1.2s" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18)_0%,transparent_70%)]" />
        </div>
        {/* Floating edutech icons */}
        <div className="pointer-events-none absolute inset-0 hidden md:block text-white/30">
          <GraduationCap className="absolute top-10 left-[8%] h-10 w-10 animate-float" style={{ animationDelay: "0s" }} />
          <BookOpen className="absolute top-20 right-[10%] h-9 w-9 animate-float" style={{ animationDelay: "0.6s" }} />
          <Lightbulb className="absolute bottom-12 left-[14%] h-8 w-8 animate-float text-[var(--orange)]/70" style={{ animationDelay: "1.1s" }} />
          <Pencil className="absolute bottom-16 right-[18%] h-8 w-8 animate-float" style={{ animationDelay: "1.6s" }} />
          <Atom className="absolute top-1/2 left-[4%] h-9 w-9 animate-float" style={{ animationDelay: "2s" }} />
          <Brain className="absolute top-[40%] right-[5%] h-9 w-9 animate-float text-[var(--orange)]/70" style={{ animationDelay: "2.4s" }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/25 mb-6 animate-fade-in-up">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Private & Confidential
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Book a Counseling Session
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-white/85 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            Take the first step toward healing. Schedule a private session with one of our experienced counselors in just a few clicks.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {submitted ? (
          <div className="mx-auto max-w-lg text-center">
            <div className="rounded-2xl bg-card border border-border p-8 md:p-12 shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-50 mb-6">
                <Check className="h-8 w-8 text-sage" />
              </div>
              <h2 className="text-2xl font-bold text-foreground font-display">Booking Confirmed</h2>
              <p className="mt-2 text-muted-foreground">
                Your counseling session has been scheduled. We have sent a confirmation email with all the details.
              </p>
              <div className="mt-6 rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">Booking Reference</p>
                <p className="text-lg font-semibold text-foreground font-mono tracking-wider">{bookingRef}</p>
              </div>
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p><strong>Name:</strong> {watch("name")}</p>
                <p><strong>Date:</strong> {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
              </div>
              <Button
                onClick={handleNewBooking}
                className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Book Another Session
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Details */}
                <section className="rounded-2xl bg-card border border-border p-6 md:p-8 shadow-sm hover-lift animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-50">
                      <User className="h-5 w-5 text-sage" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground font-display">Personal Details</h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-foreground">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Jane Doe"
                          className="pl-10"
                          {...register("name")}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="jane@example.com"
                          className="pl-10"
                          {...register("email")}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-foreground">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="pl-10"
                          {...register("phone")}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Date & Time Selection */}
                <section className="rounded-2xl bg-card border border-border p-6 md:p-8 shadow-sm hover-lift animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-50">
                      <Clock className="h-5 w-5 text-sage" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground font-display">Schedule Your Session</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Date Picker */}
                    <div>
                      <Label className="text-foreground">
                        Select Date <span className="text-destructive">*</span>
                      </Label>
                      <div className="mt-1.5">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                              initialFocus
                              className="pointer-events-auto p-3"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {errors.date && (
                        <p className="mt-1 text-sm text-destructive">{errors.date.message}</p>
                      )}
                    </div>

                    {/* Time Slots */}
                    <div>
                      <Label className="text-foreground">
                        Select Time <span className="text-destructive">*</span>
                      </Label>
                      <div className="mt-1.5 grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {TIME_SLOTS.map((time, i) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => handleTimeSelect(time)}
                            style={{ animationDelay: `${i * 30}ms` }}
                            className={cn(
                              "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-200 animate-fade-in-up hover:-translate-y-0.5 hover:shadow-md active:scale-95",
                              selectedTime === time
                                ? "border-primary bg-primary text-primary-foreground shadow-md ring-2 ring-[var(--orange)]/40"
                                : "border-border bg-background text-foreground hover:border-primary hover:bg-sage-50"
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {errors.time && (
                        <p className="mt-1 text-sm text-destructive">{errors.time.message}</p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Optional Notes */}
                <section className="rounded-2xl bg-card border border-border p-6 md:p-8 shadow-sm hover-lift animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-50">
                      <MessageSquare className="h-5 w-5 text-sage" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground font-display">Additional Notes</h2>
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-muted-foreground">
                      Anything you would like your counselor to know? (Optional)
                    </Label>
                    <textarea
                      id="notes"
                      rows={4}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      placeholder="Share any concerns or topics you would like to discuss..."
                      {...register("notes")}
                    />
                    {errors.notes && (
                      <p className="mt-1 text-sm text-destructive">{errors.notes.message}</p>
                    )}
                  </div>
                </section>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-semibold bg-[var(--orange)] text-white hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all animate-pulse-glow"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Confirming your booking...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </form>
            </div>

            {/* Right Column - Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-card border border-border p-6 md:p-8 shadow-sm hover-lift animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
                <h3 className="text-lg font-semibold text-foreground font-display mb-4">What to Expect</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-50">
                      <Shield className="h-4 w-4 text-sage" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Private & Confidential</p>
                      <p className="text-sm text-muted-foreground">All sessions are strictly confidential. Your privacy is our highest priority.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-50">
                      <Heart className="h-4 w-4 text-sage" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Compassionate Care</p>
                      <p className="text-sm text-muted-foreground">Our counselors provide a safe, judgment-free space for you to share and grow.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-50">
                      <Sparkles className="h-4 w-4 text-sage" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Personalized Approach</p>
                      <p className="text-sm text-muted-foreground">Each session is tailored to your unique needs and goals.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
    </SiteLayout>
  );
}
export default BookingPage;