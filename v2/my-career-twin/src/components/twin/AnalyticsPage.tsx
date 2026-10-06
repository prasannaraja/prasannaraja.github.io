import React, { useState } from 'react';
import { useObservatory } from '../../data/analytics/useObservatory';
import { ObservatoryHeader } from './analytics/ObservatoryHeader';
import { AnalyticsKpis } from './analytics/AnalyticsKpis';
import { QueryActivity } from './analytics/QueryActivity';
import { SessionInspector } from './analytics/SessionInspector';

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
        <div className="lv-page-wrapper">
            <div className="lv-page-inner">
                <ObservatoryHeader onClose={handleClose} />
                
                {loading && !overview ? (
                    <div className="lv-loading">Loading telemetry...</div>
                ) : overview && sessions ? (
                    <div className="lv-content-flow">
                        <AnalyticsKpis 
                            overview={overview}
                            geography={geography}
                            acquisition={acquisition}
                        />
                        
                        <QueryActivity sessions={sessions} onRowClick={setSelectedSessionId} />

                        {selectedSessionId && (
                            <SessionInspector 
                               sessionId={selectedSessionId} 
                               onClose={() => setSelectedSessionId(null)} 
                            />
                        )}
                        
                        <div className="lv-footer-strip">
                            <span>TWIN/INTEL</span> PRIVATE OWNER DASHBOARD
                            <span className="lv-pull-right">LIVE DATA · NEVER SHARED</span>
                        </div>
                    </div>
                ) : (
                    <div className="lv-error">{error || 'Unable to load data.'}</div>
                )}
            </div>
        </div>
    );
};
