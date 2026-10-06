import React from 'react';

interface EngineeringSignalProps {
    signal: string;
}

export const EngineeringSignal: React.FC<EngineeringSignalProps> = ({ signal }) => {
    return (
        <div className="engineering-signal-panel dashboard-panel">
            <h3>ENGINEERING SIGNAL</h3>
            <p className="signal-text">{signal}</p>
        </div>
    );
};
