import React from 'react';

export interface MiniProject {
  title: string;
  subtitle: string;
  text: string;
  tags: string[];
}

export const ProjectCard: React.FC<{ project: MiniProject }> = ({ project }) => {
  return (
    <article className="mini-card reveal">
      <div className="card-head">
        <h3>{project.title}</h3>
        <span className="date">{project.subtitle}</span>
      </div>
      <p>{project.text}</p>
      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

