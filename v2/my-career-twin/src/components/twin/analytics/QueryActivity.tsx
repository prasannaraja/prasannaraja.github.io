import React, { useState } from 'react';
import { QueryTrace } from './QueryTrace';

interface QueryData {
    id: string;
    timestamp: string;
    question: string;
    category: string;
    confidenceScore: number;
    isKnowledgeGap: boolean;
    latencyMs: number;
    feedback: 'like' | 'dislike' | null;
}

interface QueryActivityProps {
    activity: QueryData[];
}

export const QueryActivity: React.FC<QueryActivityProps> = ({ activity }) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <div className="query-activity-panel dashboard-panel">
            <h3>WHAT PEOPLE ARE ASKING</h3>
            <div className="activity-list">
                {activity.map(q => (
                    <div key={q.id} className="activity-item">
                        <div 
                            className="activity-summary" 
                            onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                        >
                            <span className="activity-time">
                                {new Date(q.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                            <span className="activity-question">"{q.question}"</span>
                            <div className="activity-meta">
                                <span className="activity-tag">{q.category}</span>
                                <span className={`activity-grounded ${q.isKnowledgeGap ? 'gap' : 'ok'}`}>
                                    {Math.round(q.confidenceScore * 100)}% grounded
                                </span>
                                <span className="activity-latency">{q.latencyMs}ms</span>
                            </div>
                        </div>
                        {expandedId === q.id && <QueryTrace query={q} />}
                    </div>
                ))}
            </div>
        </div>
    );
};
