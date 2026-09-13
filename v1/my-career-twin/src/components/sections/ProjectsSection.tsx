import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ProjectCard } from '../ui/ProjectCard';

export const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();
  const { kpmgDash, kart, additional, featuredCaseStudiesLabel, additionalExperienceLabel } =
    t.projects;

  return (
    <section id="projects">
      <h2>{t.projects.heading}</h2>
      <p className="section-intro">{t.projects.sectionIntro}</p>

      <div className="subhead">{featuredCaseStudiesLabel}</div>
      <div className="projects">
        {/* KPMG Dash Case Study */}
        <article className="card featured reveal">
          <span className="featured-label">{kpmgDash.featuredLabel}</span>
          <div className="card-head">
            <h3>{kpmgDash.title}</h3>
            <span className="date">{kpmgDash.subtitle}</span>
          </div>
          <p>
            <b>{kpmgDash.problemLabel}</b> {kpmgDash.problemText}
          </p>
          <p>
            <b>{kpmgDash.platformLabel}</b> {kpmgDash.platformText}
          </p>
          <div className="scale-row">
            {kpmgDash.stats.map((stat, idx) => (
              <div key={idx} className="stat">
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="subhead">{kpmgDash.architectureLabel}</div>
          <div className="flow">
            {kpmgDash.flow.map((step, idx) => (
              <div key={idx} className="flow-item">
                <span className="step">{step}</span>
                {idx < kpmgDash.flow.length - 1 && <span className="arrow">→</span>}
              </div>
            ))}
          </div>
          <details>
            <summary>{kpmgDash.contributionLabel}</summary>
            <ul>
              {kpmgDash.contribution.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </details>
          <div className="tags">
            {kpmgDash.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* KART Case Study */}
        <article className="card featured reveal">
          <span className="featured-label">{kart.featuredLabel}</span>
          <div className="card-head">
            <h3>{kart.title}</h3>
            <span className="date">{kart.subtitle}</span>
          </div>
          <p>{kart.text}</p>
          <details>
            <summary>{kart.detailsLabel}</summary>
            <p>{kart.detailsText}</p>
          </details>
          <div className="tags">
            {kart.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </article>
      </div>

      <div className="subhead spaced">{additionalExperienceLabel}</div>
      <div className="more-projects">
        {additional.map((proj, idx) => (
          <ProjectCard key={`${proj.title}-${idx}`} project={proj} />
        ))}
      </div>
    </section>
  );
};

