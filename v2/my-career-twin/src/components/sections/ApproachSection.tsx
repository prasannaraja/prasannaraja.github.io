import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export const ApproachSection: React.FC = () => {
  const { t } = useTranslation();
  const { howIBuildLabel, principles, aiSectionLabel, machineLearning, generativeAi, note } =
    t.approach;

  return (
    <section id="approach">
      <h2>{t.approach.heading}</h2>
      <p className="section-intro">{t.approach.sectionIntro}</p>

      <div className="approach-group">
        <div className="subhead">{howIBuildLabel}</div>
        <div className="principles">
          {principles.map((principle, idx) => (
            <div key={idx} className="principle reveal">
              <h4>{principle.title}</h4>
              <p>{principle.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="approach-group">
        <div className="subhead">{aiSectionLabel}</div>
        <div className="skills">
          <div className="skillrow reveal">
            <h4>{machineLearning.title}</h4>
            <div className="tags">
              {machineLearning.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="skillrow reveal">
            <h4>{generativeAi.title}</h4>
            <div className="tags">
              {generativeAi.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="approach-note">{note}</p>
      </div>
    </section>
  );
};

