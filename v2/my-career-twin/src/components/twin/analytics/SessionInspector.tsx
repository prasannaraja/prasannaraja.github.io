import React from 'react';
import { useSessionInspector } from '../../../data/analytics/useObservatory';

interface Props {
    sessionId: string;
    onClose: () => void;
}

export const SessionInspector: React.FC<Props> = ({ sessionId, onClose }) => {
    const { trace, loading, error } = useSessionInspector(sessionId);

    return (
        <div className="session-inspector-overlay">
            <div className="session-inspector-drawer">
                <div className="inspector-header">
                    <h2>SESSION #{sessionId.substring(0, 8)}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                {loading ? (
                    <div className="inspector-loading">Loading trace...</div>
                ) : error ? (
                    <div className="inspector-error">{error}</div>
                ) : trace ? (
                    <div className="inspector-content">
                        <div className="context-panel">
                            <h3>SESSION CONTEXT</h3>
                            <div className="context-grid">
                                <div><strong>Country:</strong> {trace.country || 'Unknown'}</div>
                                <div><strong>Source:</strong> {trace.source || 'Direct'}</div>
                                <div><strong>Landing page:</strong> {trace.landingPage || '/'}</div>
                                <div><strong>Device:</strong> {trace.deviceType || 'Desktop'}</div>
                                <div><strong>Browser:</strong> {trace.browser || 'Unknown'}</div>
                                <div><strong>Language:</strong> {trace.language || 'English'}</div>
                                <div><strong>Session duration:</strong> {Math.round(trace.durationSeconds / 60)}m {trace.durationSeconds % 60}s</div>
                                <div><strong>Interactions:</strong> {trace.queryCount}</div>
                            </div>
                        </div>

                        <div className="conversation-panel">
                            <h3>CONVERSATION</h3>
                            {trace.queries.map(q => (
                                <div key={q.id} className="conversation-turn">
                                    <div className="message visitor-message">
                                        <div className="message-time">{new Date(q.timestamp).toLocaleTimeString()}</div>
                                        <div className="message-sender">VISITOR</div>
                                        <div className="message-text">{q.question}</div>
                                    </div>
                                    <div className="arrow-down">↓</div>
                                    <div className="message twin-message">
                                        <div className="message-sender">DIGITAL TWIN</div>
                                        <div className="message-text">{q.response || '...'}</div>
                                        <div className="message-meta">
                                            <span>[Grounded {Math.round(q.confidenceScore * 100)}%]</span>
                                            <span>[{q.latencyMs / 1000}s]</span>
                                            <span>[{q.sources.length} sources]</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
