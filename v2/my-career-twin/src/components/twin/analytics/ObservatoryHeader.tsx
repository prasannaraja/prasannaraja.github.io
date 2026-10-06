import React from 'react';

interface ObservatoryHeaderProps {
    onClose?: () => void;
}

export const ObservatoryHeader: React.FC<ObservatoryHeaderProps> = ({ onClose }) => {
    return (
        <div className="lv-header-container">
            {/* Top Nav Bar */}
            <div className="lv-top-nav">
                <div className="lv-logo-area">
                    <span className="lv-logo-text">TWIN/INTEL</span>
                    <span className="lv-badge-dot"></span>
                    <span className="lv-badge-text">PRIVATE - OWNER SESSION</span>
                </div>
                <div className="lv-nav-links">
                    <span className="lv-nav-link active">Overview</span>
                    <span className="lv-nav-link">Sessions</span>
                    <span className="lv-nav-link">Sources</span>
                    <span className="lv-nav-link">Topics</span>
                    {onClose && (
                        <button className="lv-btn-export" onClick={onClose}>
                            Exit
                        </button>
                    )}
                </div>
            </div>

            {/* Hero Title Area */}
            <div className="lv-hero-area">
                <div className="lv-hero-left">
                    <span className="lv-hero-kicker">LAST 30 DAYS</span>
                    <h1 className="lv-hero-title">DIGITAL TWIN<br/>OBSERVATORY</h1>
                </div>
                <div className="lv-hero-right">
                    Where recruiters and engineers are probing your twin, what they ask, and how your technical expertise holds up under pressure.
                </div>
            </div>
        </div>
    );
};
