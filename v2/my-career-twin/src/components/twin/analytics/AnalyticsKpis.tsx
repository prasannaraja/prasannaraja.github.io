import React from 'react';
import type { OverviewMetrics, GeographyData, AcquisitionData } from '../../../data/analytics/viewModel';

interface Props {
    overview: OverviewMetrics;
    geography: GeographyData[];
    acquisition: AcquisitionData[];
}

export const AnalyticsKpis: React.FC<Props> = ({ overview, geography, acquisition }) => {
    // Helper to calculate percentages for the bars
    const maxAcq = Math.max(...acquisition.map(a => a.sessions), 1);

    return (
        <div className="lv-kpis-container">
            {/* Top 4 Cards Row */}
            <div className="lv-kpi-row">
                <div className="lv-kpi-card inverted">
                    <div className="lv-kpi-label">TOTAL SESSIONS</div>
                    <div className="lv-kpi-value">{overview.totalSessions}</div>
                    <div className="lv-kpi-trend highlight">+10% vs prev 30d</div>
                </div>
                <div className="lv-kpi-card">
                    <div className="lv-kpi-label">UNIQUE COUNTRIES</div>
                    <div className="lv-kpi-value">{overview.uniqueCountries}</div>
                    <div className="lv-kpi-trend highlight">+2 vs prev 30d</div>
                </div>
                <div className="lv-kpi-card">
                    <div className="lv-kpi-label">QUESTIONS ASKED</div>
                    <div className="lv-kpi-value">{overview.totalQueries}</div>
                    <div className="lv-kpi-trend highlight">{overview.avgQueriesPerSession} avg / session</div>
                </div>
                <div className="lv-kpi-card">
                    <div className="lv-kpi-label">DEEP SESSIONS</div>
                    <div className="lv-kpi-value">{overview.deepSessions}</div>
                    <div className="lv-kpi-trend">+15% vs prev 30d</div>
                </div>
            </div>

            {/* Middle Grid (Data Panels) */}
            <div className="lv-data-grid">
                {/* Where they're from */}
                <div className="lv-data-panel">
                    <div className="lv-panel-header">WHERE THEY'RE FROM</div>
                    <div className="lv-geo-list">
                        {geography.slice(0, 5).map(g => (
                            <div className="lv-geo-item" key={g.country}>
                                <div className="lv-geo-left">
                                    <span className="lv-geo-code">{g.country.substring(0,2).toUpperCase()}</span>
                                    <span className="lv-geo-name">{g.country}</span>
                                </div>
                                <div className="lv-geo-right">{g.sessions}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visitor Sources */}
                <div className="lv-data-panel">
                    <div className="lv-panel-header">VISITOR SOURCES</div>
                    <div className="lv-source-list">
                        {acquisition.slice(0, 5).map(a => {
                            const pct = Math.round((a.sessions / overview.totalSessions) * 100);
                            const widthPct = Math.round((a.sessions / maxAcq) * 100);
                            return (
                                <div className="lv-source-item" key={a.source}>
                                    <div className="lv-source-top">
                                        <div className="lv-source-name">
                                            <span className="lv-dot"></span> {a.source}
                                        </div>
                                        <div className="lv-source-pct">{pct}%</div>
                                    </div>
                                    <div className="lv-source-bar-bg">
                                        <div className="lv-source-bar-fill" style={{ width: `${widthPct}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
