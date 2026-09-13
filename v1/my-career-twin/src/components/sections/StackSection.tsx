import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { SkillCategory } from '../ui/SkillCategory';

export const StackSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="stack">
      <h2>{t.stack.heading}</h2>
      <p className="section-intro">{t.stack.sectionIntro}</p>
      <div className="skills">
        {t.stack.categories.map((cat, idx) => (
          <SkillCategory key={`${cat.title}-${idx}`} title={cat.title} tags={cat.tags} />
        ))}
      </div>
    </section>
  );
};

