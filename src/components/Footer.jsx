import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Rocket,
  BookOpen,
  Laptop,
  Sparkles,
} from "lucide-react";

import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import { useData } from "../context/DataContext";

export default function Footer() {
  const { settings } = useData();
  const company = settings?.company || {
    name: "SS",
    tagline: "Education For All",
    description: "We help students discover the right learning path through curated, admin-approved courses tailored to their ambitions."
  };
  const contact = settings?.contact || {
    email: "hello@ss-edu.com",
    phone: "+91 98765 43210",
    address: "Bhubaneswar, India"
  };
  const social = settings?.social || {
    instagram: "https://instagram.com/sspathways",
    linkedin: "https://linkedin.com/company/sspathways",
    twitter: "https://x.com/sspathways",
    whatsapp: "https://wa.me/919876543210"
  };

  return (
    <footer className="bg-[#021238] text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                {company.name}
              </h2>

              <p className="text-xs uppercase tracking-widest text-gray-400">
                {company.tagline}
              </p>
            </div>
          </div>

          <p className="mt-6 text-gray-300 leading-relaxed">
            {company.description}
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-8">
            <a
              href={social.twitter || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaTwitter size={18} />
            </a>

            <a
              href={social.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href={social.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href={social.whatsapp || `https://wa.me/91${contact.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-6">
            Quick Links
          </h3>

          <ul className="space-y-4 text-gray-300">
            <li>
              <Link
                to="/"
                className="hover:text-orange-400 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/courses"
                className="hover:text-orange-400 transition"
              >
                Explore Courses
              </Link>
            </li>

            <li>
              <Link
                to="/recommend"
                className="hover:text-orange-400 transition"
              >
                Get Recommendations
              </Link>
            </li>

            <li>
              <Link
                to="/job-support"
                className="hover:text-orange-400 transition"
              >
                Job Support
              </Link>
            </li>

            <li>
              <Link
                to="/career"
                className="hover:text-orange-400 transition"
              >
                Career
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-orange-400 transition"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-orange-400 transition"
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                to="/blog"
                className="hover:text-orange-400 transition"
              >
                Blog
              </Link>
            </li>

            <li>
              <Link
                to="/refer-earn"
                className="hover:text-orange-400 transition"
              >
                Refer & Earn
              </Link>
            </li>
            <li>
              <Link
                to="/academic-support"
                className="hover:text-orange-400 transition"
              >
                Academic Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-xl font-semibold mb-6">
            Contact
          </h3>

          <ul className="space-y-5 text-gray-300">
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-orange-400" />
              {contact.email}
            </li>

            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-orange-400" />
              {contact.phone}
            </li>

            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-orange-400" />
              {contact.address}
            </li>
          </ul>

          <div className="mt-10">
            <h4 className="text-lg font-semibold">
              Subscribe to Our Blog
            </h4>

            <p className="mt-2 text-sm text-gray-400">
              Get the latest learning tips, career insights,
              and educational resources delivered to your inbox.
            </p>

            <form className="mt-5 space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-orange-400"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold hover:bg-orange-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>


        {/* Animation */}
        <div className="relative h-[250px] flex items-center justify-center overflow-hidden">

          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-5 left-8"
          >
            <GraduationCap className="w-10 h-10 text-orange-400" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-10 right-8"
          >
            <Rocket className="w-10 h-10 text-blue-400" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute bottom-8 left-12"
          >
            <BookOpen className="w-10 h-10 text-green-400" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 18, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity }}
            className="absolute bottom-10 right-10"
          >
            <Laptop className="w-10 h-10 text-purple-400" />
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
          >
            <Sparkles className="w-16 h-16 text-yellow-300" />
          </motion.div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">

          <p>
            © {new Date().getFullYear()} {company.name} – {company.tagline}.
            All rights reserved.
          </p>

          <p>
            Crafted with care for curious learners.
          </p>

        </div>
      </div>
    </footer>
  );
}