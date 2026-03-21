import React from 'react';
import { motion } from 'framer-motion';

export default function ExperienceCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      <div className="mb-3 inline-flex rounded-full border border-cyan-400/10 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
        {item.years}
      </div>

      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
      <p className="mt-1 text-slate-300">{item.company}</p>

      <p className="mt-4 text-sm leading-7 text-slate-300">{item.summary}</p>

      {item.projects?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.projects.map((project) => (
            <span
              key={project}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
            >
              {project}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}