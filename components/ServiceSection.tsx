"use client";

import { motion } from "framer-motion";

export default function ServiceSection({
  title,
  description,
  points,
  accent
}: {
  title: string;
  description: string;
  points: string[];
  accent: "blue" | "yellow";
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto py-24 px-6 relative"
    >
      <div
        className={`absolute inset-0 rounded-3xl opacity-10 ${
          accent === "blue" ? "bg-[var(--blue)]" : "bg-[var(--yellow)]"
        }`}
      />

      <h2 className="text-5xl font-bold mb-6">{title}</h2>
      <p className="text-lg mb-8 max-w-xl">{description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {points.map((p, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white/60 backdrop-blur shadow-sm"
          >
            {p}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
