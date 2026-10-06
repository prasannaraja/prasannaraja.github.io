import React, { useState } from 'react';
import { useObservatory } from '../../data/analytics/useObservatory';
import { ObservatoryHeader } from './analytics/ObservatoryHeader';
import { AnalyticsKpis } from './analytics/AnalyticsKpis';
import { InterestMap } from './analytics/InterestMap';
import { QueryActivity } from './analytics/QueryActivity';
import { SessionInspector } from './analytics/SessionInspector';
import { EngineeringSignal } from './analytics/EngineeringSignal';

export const AnalyticsPage: React.FC = () => {
    const { overview, sessions, geography, acquisition, loading, error } = useObservatory();
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

    const handleClose = () => {
        if (window.location.search.includes('view=analytics')) {
            window.location.href = window.location.pathname;
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="observatory-page-wrapper">
            <ObservatoryHeader onClose={handleClose} />
            {loading && !overview ? (
                <div className="observatory-loading">
                    <span className="pulse-dot"></span> Loading observatory telemetry...
                </div>
            ) : overview && sessions ? (
                <div className="observatory-content">
                    <AnalyticsKpis 
                        overview={overview}
                        geography={geography}
                        acquisition={acquisition}
                    />
                    
                    <div className="observatory-grid-top">
                        <QueryActivity sessions={sessions} onRowClick={setSelectedSessionId} />
                    </div>

                    <div className="observatory-grid-middle">
                        <EngineeringSignal signal={`Visitors evaluate dimensions from diverse locations.`} />
                    </div>

                    {selectedSessionId && (
                        <SessionInspector 
                           sessionId={selectedSessionId} 
                           onClose={() => setSelectedSessionId(null)} 
                        />
                    )}
                </div>
            ) : (
                <div className="observatory-error">{error || 'Unable to load data.'}</div>
            )}
        </div>
    );
};
