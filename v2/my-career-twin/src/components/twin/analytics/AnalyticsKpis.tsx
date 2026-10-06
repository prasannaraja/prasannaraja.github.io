import React from 'react';

interface AnalyticsKpisProps {
    interactions: number;
    sessions: number;
    groundingRate: number;
    medianResponse: number;
}

export const AnalyticsKpis: React.FC<AnalyticsKpisProps> = ({ interactions, sessions, groundingRate, medianResponse }) => {
    return (
        <div className="analytics-kpis-strip">
            <h3 className="section-title">LIVE TWIN ACTIVITY</h3>
            <div className="kpis-grid">
                <div className="kpi-card">
                    <span className="kpi-value">{interactions.toLocaleString()}</span>
                    <span className="kpi-label">interactions</span>
                </div>
                <div className="kpi-card">
                    <span className="kpi-value">{sessions.toLocaleString()}</span>
                    <span className="kpi-label">sessions</span>
                </div>
                <div className="kpi-card">
                    <span className="kpi-value">{Math.round(groundingRate)}%</span>
                    <span className="kpi-label">grounded</span>
                </div>
                <div className="kpi-card">
                    <span className="kpi-value">{medianResponse}ms</span>
                    <span className="kpi-label">median</span>
                </div>
            </div>
        </div>
    );
};
