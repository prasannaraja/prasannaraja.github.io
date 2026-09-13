import React from 'react';

export interface SkillCategoryProps {
  title: string;
  tags: string[];
}

export const SkillCategory: React.FC<SkillCategoryProps> = ({ title, tags }) => {
  return (
    <div className="skillrow reveal">
      <h4>{title}</h4>
      <div className="tags">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

