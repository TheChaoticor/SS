import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import SiteLayout from "../components/SiteLayout";
import CourseCard from "../components/CourseCard";
import { useData } from "../context/DataContext";
import { MODES } from "../data/Courses";

export default function Courses() {
  const { courses } = useData();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [mode, setMode] = useState("All");

  const publishedCourses = useMemo(() => {
    return courses.filter(c => c.status === "Published");
  }, [courses]);

  const categories = useMemo(() => {
    return [...new Set(publishedCourses.map((c) => c.category))];
  }, [publishedCourses]);

  const filtered = useMemo(() => {
    return publishedCourses.filter((course) => {
      const matchQ =
        !q ||
        (
          course.title +
          course.institution +
          course.category
        )
          .toLowerCase()
          .includes(q.toLowerCase());

      const matchCat =
        cat === "All" || course.category === cat;

      const matchMode =
        mode === "All" || course.mode === mode;

      return matchQ && matchCat && matchMode;
    });
  }, [publishedCourses, q, cat, mode]);

  return (
    <SiteLayout>
      <section className="relative bg-hero text-white pt-36 pb-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-orange">
              Catalog
            </span>

            <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold">
              Explore Courses
            </h1>

            <p className="mt-3 text-white/75 max-w-xl">
              Search across verified courses curated by our
              team. Filter by category and mode.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background -mt-12 pb-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="bg-card rounded-2xl shadow-elegant border border-border p-4 md:p-5 grid md:grid-cols-12 gap-3 items-centeet">
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search courses, institutions, categories..."
                className="w-full h-14 rounded-xl bg-secondary pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="md:col-span-3 rounded-xl bg-secondary px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">
                All categories
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="md:col-span-3 h-14 rounded-xl bg-secondary px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">
                All modes
              </option>

              {MODES.map((modeOption) => (
                <option
                  key={modeOption}
                  value={modeOption}
                >
                  {modeOption}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            {filtered.length} course
            {filtered.length !== 1 && "s"} found
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No courses match your filters.
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}