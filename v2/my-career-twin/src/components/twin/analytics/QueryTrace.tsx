import React from 'react';

interface QueryTraceProps {
    query: {
        category: string;
        confidenceScore: number;
        latencyMs: number;
        feedback: 'like' | 'dislike' | null;
        isKnowledgeGap: boolean;
    };
}

export const QueryTrace: React.FC<QueryTraceProps> = ({ query }) => {
    return (
        <div className="query-trace-view">
            <div className="trace-path">
                <div className="trace-node">User question</div>
                <div className="trace-arrow">↓</div>
                <div className="trace-node">Intent classification <span>({query.category})</span></div>
                <div className="trace-arrow">↓</div>
                <div className="trace-node">Semantic retrieval <span>({query.latencyMs - 150}ms)</span></div>
                <div className="trace-arrow">↓</div>
                <div className="trace-node">Context assembly</div>
                <div className="trace-arrow">↓</div>
                <div className="trace-node">LLM response</div>
                <div className="trace-arrow">↓</div>
                <div className="trace-node">Confidence: {Math.round(query.confidenceScore * 100)}%</div>
                {query.feedback && (
                    <>
                        <div className="trace-arrow">↓</div>
                        <div className="trace-node">Feedback: {query.feedback === 'like' ? '👍' : '👎'}</div>
                    </>
                )}
            </div>
        </div>
    );
};
