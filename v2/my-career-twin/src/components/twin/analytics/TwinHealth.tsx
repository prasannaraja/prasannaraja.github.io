import React from 'react';

interface TwinHealthProps {
    health: {
        retrieval: number;
        grounding: number;
        knowledge: number;
        latency: number;
        feedback: number;
    };
}

export const TwinHealth: React.FC<TwinHealthProps> = ({ health }) => {
    return (
        <div className="twin-health-panel dashboard-panel">
            <h3>TWIN HEALTH</h3>
            <div className="health-metrics">
                <div className="health-row">
                    <span className="health-label">Retrieval</span>
                    <div className="health-bar-container">
                        <div className="health-bar" style={{ width: `${health.retrieval}%` }}></div>
                    </div>
                    <span className="health-value">{health.retrieval}%</span>
                </div>
                <div className="health-row">
                    <span className="health-label">Grounding</span>
                    <div className="health-bar-container">
                        <div className="health-bar" style={{ width: `${health.grounding}%` }}></div>
                    </div>
                    <span className="health-value">{health.grounding}%</span>
                </div>
                <div className="health-row">
                    <span className="health-label">Knowledge</span>
                    <div className="health-bar-container">
                        <div className="health-bar" style={{ width: `${health.knowledge}%` }}></div>
                    </div>
                    <span className="health-value">{health.knowledge}%</span>
                </div>
                <div className="health-row">
                    <span className="health-label">Feedback</span>
                    <div className="health-bar-container">
                        <div className="health-bar" style={{ width: `${health.feedback}%` }}></div>
                    </div>
                    <span className="health-value">{Math.round(health.feedback)}%</span>
                </div>
                <div className="health-row">
                    <span className="health-label">Latency</span>
                    <div className="health-bar-container">
                        <div className="health-bar" style={{ width: `${Math.min(100, (health.latency / 1000) * 100)}%` }}></div>
                    </div>
                    <span className="health-value">{health.latency}ms</span>
                </div>
            </div>
            <div className="health-status-footer">
                ● SYSTEM OPERATIONAL
            </div>
        </div>
    );
};
