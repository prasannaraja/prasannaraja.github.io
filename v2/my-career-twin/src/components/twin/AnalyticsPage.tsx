import React, { useState, useEffect } from 'react';
import { API_BASE } from '../../config/api';
import type { RawAnalyticsData, ObservatoryViewModel } from '../../data/analytics/viewModel';
import { transformAnalyticsToViewModel } from '../../data/analytics/viewModel';
import { ObservatoryHeader } from './analytics/ObservatoryHeader';
import { AnalyticsKpis } from './analytics/AnalyticsKpis';
import { InterestMap } from './analytics/InterestMap';
import { TwinHealth } from './analytics/TwinHealth';
import { KnowledgeEvolution } from './analytics/KnowledgeEvolution';
import { QueryActivity } from './analytics/QueryActivity';
import { EngineeringSignal } from './analytics/EngineeringSignal';

export const AnalyticsPage: React.FC = () => {
    const [vm, setVm] = useState<ObservatoryViewModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAnalytics = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/twin/analytics/dashboard`);
            if (res.ok) {
                const json: RawAnalyticsData = await res.json();
                setVm(transformAnalyticsToViewModel(json));
            }
        } catch (e) {
            console.warn('Unable to load telemetry dashboard:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const handleClose = () => {
        // Simple fallback to navigate back to the root if they are viewing via query params
        if (window.location.search.includes('view=analytics')) {
            window.location.href = window.location.pathname;
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="observatory-page-wrapper">
            <ObservatoryHeader onClose={handleClose} />
            {isLoading && !vm ? (
                <div className="observatory-loading">
                    <span className="pulse-dot"></span> Loading observatory telemetry...
                </div>
            ) : vm ? (
                <div className="observatory-content">
                    <AnalyticsKpis 
                        interactions={vm.interactions}
                        sessions={vm.sessions}
                        groundingRate={vm.groundingRate}
                        medianResponse={vm.medianResponse}
                    />
                    
                    <div className="observatory-grid-top">
                        <InterestMap topics={vm.topics} />
                        <TwinHealth health={vm.twinHealth} />
                    </div>

                    <div className="observatory-grid-middle">
                        <QueryActivity activity={vm.activity} />
                        <div className="observatory-grid-right">
                            <KnowledgeEvolution gaps={vm.gaps} />
                            <EngineeringSignal signal={vm.engineeringSignal} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="observatory-error">Unable to load data.</div>
            )}
        </div>
    );
};
