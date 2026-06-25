import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Monitor, ArrowUpRight } from "lucide-react";

export default function CourseCard({ course, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 6) * 0.05,
      }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-semibold text-blue-600">
          {course.category}
        </span>
      </div>

      <div className="p-5">
        <div className="text-xs text-gray-500 font-medium">
          {course.institution}
        </div>

        <h3 className="mt-1 text-lg font-semibold text-gray-900 leading-snug">
          {course.title}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>

          <span className="inline-flex items-center gap-1">
            <Monitor className="h-3.5 w-3.5" />
            {course.mode}
          </span>
        </div>

        <Link
          to={`/courses/${course.id}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group/btn"
        >
          View Details

          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}