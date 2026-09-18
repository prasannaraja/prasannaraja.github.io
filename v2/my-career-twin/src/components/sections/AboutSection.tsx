import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about">
      <h2>{t.about.heading}</h2>
      <p className="lede">{t.about.paragraph1}</p>
      <p className="lede">{t.about.paragraph2}</p>
      <p className="lede">{t.about.paragraph3}</p>
    </section>
  );
};

