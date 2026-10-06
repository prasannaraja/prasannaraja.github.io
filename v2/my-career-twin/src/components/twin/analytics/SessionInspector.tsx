import React from 'react';
import { useSessionInspector } from '../../../data/analytics/useObservatory';

interface Props {
    sessionId: string;
    onClose: () => void;
}

export const SessionInspector: React.FC<Props> = ({ sessionId, onClose }) => {
    const { trace, loading, error } = useSessionInspector(sessionId);

    return (
        <div className="lv-transcript-panel">
            <div className="lv-transcript-header">
                <h3>SESSION TRANSCRIPT • #{sessionId.substring(0, 4)}</h3>
                <div className="lv-transcript-meta">
                    {trace ? `${trace.country || 'Unknown'} · ${trace.queryCount}Q · ${Math.floor(trace.durationSeconds / 60)}M${trace.durationSeconds % 60}S` : 'LOADING...'}
                    <button className="lv-transcript-close" onClick={onClose}>×</button>
                </div>
            </div>

            <div className="lv-transcript-body">
                {loading && <div className="lv-loading">Loading trace data...</div>}
                {error && <div className="lv-error">{error}</div>}
                
                {trace && trace.queries.map((q) => (
                    <div className="lv-qa-block" key={q.id}>
                        <div className="lv-q-label">Q — VISITOR</div>
                        <div className="lv-q-text">{q.question}</div>
                        
                        <div className="lv-a-block">
                            <div className="lv-a-label">A — TWIN</div>
                            <div className="lv-a-text">{q.response || '(No response recorded)'}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
