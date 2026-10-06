import React from 'react';

interface GapData {
    category: string;
    frequency: number;
    sampleQuestions: string[];
    suggestedAction: string;
}

interface KnowledgeEvolutionProps {
    gaps: GapData[];
}

export const KnowledgeEvolution: React.FC<KnowledgeEvolutionProps> = ({ gaps }) => {
    return (
        <div className="knowledge-evolution-panel dashboard-panel">
            <h3>KNOWLEDGE EVOLUTION</h3>
            <p className="panel-subtitle">WHERE THE TWIN DOESN'T KNOW ENOUGH</p>
            <div className="knowledge-gaps-list">
                {gaps.length === 0 && <p className="no-gaps">No significant knowledge gaps detected.</p>}
                {gaps.map((gap, i) => (
                    <div key={i} className="gap-item">
                        <div className="gap-header">
                            <span className="gap-title">{gap.category}</span>
                            <span className="gap-freq">{gap.frequency} queries</span>
                        </div>
                        <div className="gap-body">
                            <p>Visitors frequently ask about this topic, but the current knowledge base has limited coverage.</p>
                            <div className="gap-recommendation">
                                → Recommended: {gap.suggestedAction}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
