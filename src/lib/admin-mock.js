export const stats = [
  { key: "leads", label: "Total Leads", value: 1248, change: 12.4, icon: "Users" },
  { key: "students", label: "Total Students", value: 786, change: 8.1, icon: "GraduationCap" },
  { key: "courses", label: "Active Courses", value: 42, change: 4.2, icon: "BookOpen" },
  { key: "referrals", label: "Referrals", value: 167, change: 18.9, icon: "Gift" },
];

export const leadAnalytics = [
  { month: "Jan", leads: 120, converted: 42 },
  { month: "Feb", leads: 160, converted: 58 },
  { month: "Mar", leads: 145, converted: 51 },
  { month: "Apr", leads: 198, converted: 74 },
  { month: "May", leads: 220, converted: 89 },
  { month: "Jun", leads: 260, converted: 102 },
  { month: "Jul", leads: 245, converted: 96 },
  { month: "Aug", leads: 290, converted: 118 },
  { month: "Sep", leads: 310, converted: 132 },
  { month: "Oct", leads: 285, converted: 124 },
  { month: "Nov", leads: 330, converted: 148 },
  { month: "Dec", leads: 360, converted: 165 },
];

export const monthlyRegistrations = [
  { month: "Jan", students: 38 },
  { month: "Feb", students: 52 },
  { month: "Mar", students: 47 },
  { month: "Apr", students: 61 },
  { month: "May", students: 74 },
  { month: "Jun", students: 85 },
  { month: "Jul", students: 79 },
  { month: "Aug", students: 96 },
  { month: "Sep", students: 108 },
  { month: "Oct", students: 102 },
  { month: "Nov", students: 121 },
  { month: "Dec", students: 134 },
];

const services = [
  "Career Guidance",
  "Job Support",
  "Academic Support",
  "Counselling",
  "Refer & Earn",
];

const statuses = ["New", "Contacted", "Converted", "Closed"];

// Primary featured leads requested explicitly
const featuredNames = [
  "Rahul Sharma",
  "Priya Das",
  "Aman Singh",
  "Neha Patel",
  "Rohan Verma",
];

const moreNames = [
  "Aarav Sharma",
  "Diya Patel",
  "Vihaan Singh",
  "Anaya Reddy",
  "Arjun Kumar",
  "Saanvi Gupta",
  "Ishaan Verma",
  "Myra Iyer",
  "Reyansh Nair",
  "Aadhya Mehta",
  "Vivaan Kapoor",
  "Anika Joshi",
  "Kabir Rao",
  "Pari Desai",
  "Aryan Malhotra",
  "Kiara Bose",
  "Dhruv Chawla",
  "Riya Bhatt",
  "Krish Sinha",
];

const names = [...featuredNames, ...moreNames];

export const leads = names.map((name, i) => ({
  id: `LD-${(1000 + i).toString()}`,
  name,
  phone: `+91 9${(800000000 + i * 31337).toString().slice(0, 9)}`,
  email: name.toLowerCase().replace(/\s+/g, ".") + "@gmail.com",
  service: services[i % services.length],
  date: new Date(Date.now() - i * 86400000 * 1.4)
    .toISOString()
    .slice(0, 10),
  status: statuses[i % statuses.length],
  notes: "Interested via website form. Prefers callback in evening.",
}));

export const recentLeads = leads.slice(0, 6);

const counsellors = [
  "Dr. Anil Verma",
  "Ms. Priya Shah",
  "Mr. Rohan Das",
  "Dr. Neha Singh",
];

export const bookings = Array.from({ length: 14 }, (_, i) => ({
  id: `BK-${2000 + i}`,
  student: names[i % names.length],
  phone: `+91 98${(7654321 + i).toString().slice(0, 8)}`,
  date: new Date(Date.now() + i * 86400000)
    .toISOString()
    .slice(0, 10),
  time: `${10 + (i % 7)}:${i % 2 === 0 ? "00" : "30"} AM`,
  counsellor: counsellors[i % counsellors.length],
  status: ["Pending", "Confirmed", "Completed", "Cancelled"][i % 4],
}));
const courseSpecs = [
  { title: "Data Science", category: "Technology", duration: "16 weeks", fees: 24999, students: 184, instructor: "Rajesh Kumar", status: "Published" },
  { title: "Full Stack Development", category: "Technology", duration: "20 weeks", fees: 27999, students: 246, instructor: "Sneha Patil", status: "Published" },
  { title: "Digital Marketing", category: "Marketing", duration: "10 weeks", fees: 14999, students: 138, instructor: "Manish Tiwari", status: "Published" },
  { title: "UI/UX Design", category: "Design", duration: "12 weeks", fees: 17999, students: 96, instructor: "Ananya Roy", status: "Published" },
  { title: "Cyber Security", category: "Technology", duration: "14 weeks", fees: 21999, students: 72, instructor: "Vikram Iyer", status: "Draft" },
  { title: "Cloud Computing", category: "Technology", duration: "12 weeks", fees: 19999, students: 110, instructor: "Rajesh Kumar", status: "Published" },
];

const thumbs = [
  "1517694712202-14dd9538aa97",
  "1498050108023-c5249f4df085",
  "1432888622747-4eb9a8efeb07",
  "1503676260728-1c00da094a0b",
  "1555066931-4365d14bab8c",
  "1573164713714-d95e436ab8d6",
];

export const courses = courseSpecs.map((c, i) => ({
  ...c,
  id: `CR-${100 + i}`,
  thumbnail: `https://images.unsplash.com/photo-${thumbs[i]}?auto=format&fit=crop&w=800&q=60`,
  description:
    "Industry-grade curriculum with live projects, mentorship and placement support.",
}));

export const services_list = [
  {
    id: "S1",
    name: "Career Guidance",
    description: "1:1 expert-led career planning sessions tailored to student goals.",
    status: "Published",
    icon: "Compass",
  },
  {
    id: "S2",
    name: "Job Support",
    description: "Resume building, interview prep and direct hiring partner access.",
    status: "Published",
    icon: "Briefcase",
  },
  {
    id: "S3",
    name: "Academic Support",
    description: "Tutoring, doubt-solving and exam strategy across all major boards.",
    status: "Published",
    icon: "BookOpen",
  },
  {
    id: "S4",
    name: "Counselling",
    description: "Mental wellness and study-life balance with certified counsellors.",
    status: "Published",
    icon: "Heart",
  },
  {
    id: "S5",
    name: "Refer & Earn",
    description: "Refer friends and earn rewards on every successful enrollment.",
    status: "Unpublished",
    icon: "Gift",
  },
];

export const referrals = Array.from({ length: 12 }, (_, i) => ({
  id: `RF-${3000 + i}`,
  referrer: names[i % names.length],
  referred: names[(i + 5) % names.length],
  reward: 500 + (i % 5) * 250,
  status: i % 3 === 0 ? "Pending" : "Paid",
  date: new Date(Date.now() - i * 86400000 * 2)
    .toISOString()
    .slice(0, 10),
}));

export const testimonials = [
  {
    id: "T1",
    name: "Rahul Sharma",
    course: "Full Stack Development",
    photo: "https://i.pravatar.cc/120?img=12",
    review:
      "SS Pathways transformed my career. Mentors are world-class and the placement support is outstanding.",
    rating: 5,
  },
  {
    id: "T2",
    name: "Priya Das",
    course: "Data Science",
    photo: "https://i.pravatar.cc/120?img=32",
    review:
      "Got placed in 3 months as a Data Analyst. Worth every rupee.",
    rating: 5,
  },
  {
    id: "T3",
    name: "Aman Singh",
    course: "Digital Marketing",
    photo: "https://i.pravatar.cc/120?img=15",
    review:
      "Practical, industry-relevant curriculum. Already running my own agency.",
    rating: 4,
  },
  {
    id: "T4",
    name: "Neha Patel",
    course: "UI/UX Design",
    photo: "https://i.pravatar.cc/120?img=47",
    review:
      "The design mentorship and portfolio reviews were game-changing.",
    rating: 5,
  },
  {
    id: "T5",
    name: "Rohan Verma",
    course: "Cloud Computing",
    photo: "https://i.pravatar.cc/120?img=8",
    review:
      "Cleared AWS certification on first attempt. Best decision for my upskilling journey.",
    rating: 5,
  },
  {
    id: "T6",
    name: "Anika Joshi",
    course: "Cyber Security",
    photo: "https://i.pravatar.cc/120?img=44",
    review:
      "Hands-on labs and real CTF challenges built my confidence quickly.",
    rating: 4,
  },
];

export const mediaItems = Array.from({ length: 12 }, (_, i) => ({
  id: `M${i}`,
  url: `https://picsum.photos/seed/sspath${i}/600/400`,
  name: `asset-${i + 1}.jpg`,
  size: `${(120 + i * 17) % 900}KB`,
}));

export const activityFeed = [
  {
    id: "A1",
    type: "lead",
    message: "New lead — Rahul Sharma enquired about Full Stack Development",
    time: "2 min ago",
  },
  {
    id: "A2",
    type: "booking",
    message: "Priya Das booked a counselling session with Dr. Anil Verma",
    time: "18 min ago",
  },
  {
    id: "A3",
    type: "referral",
    message: "Aman Singh earned ₹750 referral reward",
    time: "1 hr ago",
  },
  {
    id: "A4",
    type: "course",
    message: "Course “Cyber Security” moved to Draft for content review",
    time: "3 hr ago",
  },
  {
    id: "A5",
    type: "testimonial",
    message: "New 5★ testimonial submitted by Neha Patel",
    time: "5 hr ago",
  },
  {
    id: "A6",
    type: "lead",
    message: "Rohan Verma marked as Converted",
    time: "Yesterday",
  },
];