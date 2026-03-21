import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  return (
    <motion.a
      href={project.link || '#'}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group block rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.07] hover:shadow-glow"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-cyan-300">{project.type}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
        </div>
        <ExternalLink className="h-5 w-5 text-slate-500 transition-colors group-hover:text-cyan-300" />
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-cyan-400/10 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}