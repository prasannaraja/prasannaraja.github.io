import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ExperienceCard } from '../ui/ExperienceCard';

export const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="experience">
      <h2>{t.experience.heading}</h2>
      {t.experience.jobs.map((job, idx) => (
        <ExperienceCard key={`${job.company}-${idx}`} job={job} />
      ))}
    </section>
  );
};

