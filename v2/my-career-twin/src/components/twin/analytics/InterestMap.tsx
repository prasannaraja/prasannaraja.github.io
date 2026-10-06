import React, { useState } from 'react';

interface TopicData {
    topic: string;
    count: number;
    percentage: number;
}

interface InterestMapProps {
    topics: TopicData[];
}

export const InterestMap: React.FC<InterestMapProps> = ({ topics }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="interest-map-panel dashboard-panel">
            <h3>PEOPLE ASK</h3>
            <p className="panel-subtitle">WHAT PEOPLE ARE CURIOUS ABOUT</p>
            <div className="interest-bars">
                {topics.map((t, i) => (
                    <div 
                        key={i} 
                        className="interest-row"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="interest-label">{t.topic}</div>
                        <div className="interest-bar-container">
                            <div 
                                className="interest-bar" 
                                style={{ width: `${t.percentage}%` }}
                            ></div>
                        </div>
                        <div className="interest-value">{Math.round(t.percentage)}%</div>
                        
                        {hoveredIndex === i && (
                            <div className="interest-tooltip">
                                {t.count} interactions ({Math.round(t.percentage)}%)
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
