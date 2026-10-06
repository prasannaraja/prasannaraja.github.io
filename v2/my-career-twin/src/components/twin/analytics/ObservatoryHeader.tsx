import React from 'react';

interface ObservatoryHeaderProps {
    onClose?: () => void;
}

export const ObservatoryHeader: React.FC<ObservatoryHeaderProps> = ({ onClose }) => {
    return (
        <div className="observatory-header">
            <div className="observatory-title">
                <h2>DIGITAL TWIN / OBSERVATORY</h2>
                <p>A live view of how people explore my engineering experience through an AI-powered digital twin.</p>
            </div>
            <div className="observatory-status-strip">
                <span className="status-dot pulse-dot"></span>
                <span>ONLINE</span>
                <span className="separator">·</span>
                <span>RAG ENGINE Operational</span>
                <span className="separator">·</span>
                <span>KNOWLEDGE BASE Synced</span>
            </div>
            {onClose && (
                <button className="close-btn" onClick={onClose}>
                    PRASANNA RAJA ← Return to portfolio
                </button>
            )}
        </div>
    );
};
