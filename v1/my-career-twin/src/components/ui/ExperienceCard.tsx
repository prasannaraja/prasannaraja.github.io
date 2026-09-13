import React from 'react';

export interface JobItem {
  company: string;
  location: string;
  role: string;
  dates: string;
  bullets: string[];
}

export const ExperienceCard: React.FC<{ job: JobItem }> = ({ job }) => {
  const renderBullet = (text: string) => {
    // If text starts with "Keyword —" format (e.g. Context —, Responsibility —, etc.)
    const dashIndex = text.indexOf(' — ');
    if (dashIndex > 0 && dashIndex < 25) {
      const prefix = text.slice(0, dashIndex + 3);
      const rest = text.slice(dashIndex + 3);
      return (
        <>
          <b>{prefix}</b>
          {rest}
        </>
      );
    }
    return text;
  };

  return (
    <article className="job reveal">
      <div className="job-head">
        <h3>
          {job.company}
          <span className="location">{job.location}</span>
        </h3>
        <span className="role">{job.role}</span>
        <span className="date">{job.dates}</span>
      </div>
      <ul>
        {job.bullets.map((bullet, idx) => (
          <li key={idx}>{renderBullet(bullet)}</li>
        ))}
      </ul>
    </article>
  );
};

