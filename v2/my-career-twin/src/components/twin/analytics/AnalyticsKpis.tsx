import React from 'react';
import type { OverviewMetrics, GeographyData, AcquisitionData } from '../../../data/analytics/viewModel';

interface Props {
    overview: OverviewMetrics;
    geography: GeographyData[];
    acquisition: AcquisitionData[];
}

export const AnalyticsKpis: React.FC<Props> = ({ overview, geography, acquisition }) => {
    return (
        <div className="analytics-kpis-container">
            <div className="kpi-section">
                <h3 className="section-heading">ATTENTION</h3>
                <div className="kpi-grid">
                    <div className="kpi-box">
                        <div className="kpi-value">{overview.totalQueries}</div>
                        <div className="kpi-label">interactions</div>
                    </div>
                    <div className="kpi-box">
                        <div className="kpi-value">{overview.totalSessions}</div>
                        <div className="kpi-label">sessions</div>
                    </div>
                    <div className="kpi-box">
                        <div className="kpi-value">{overview.avgQueriesPerSession}</div>
                        <div className="kpi-label">avg interactions/session</div>
                    </div>
                    <div className="kpi-box">
                        <div className="kpi-value">{overview.uniqueCountries}</div>
                        <div className="kpi-label">countries</div>
                    </div>
                    <div className="kpi-box">
                        <div className="kpi-value">{overview.deepSessions}</div>
                        <div className="kpi-label">deep sessions</div>
                    </div>
                </div>
            </div>

            <div className="kpi-section-two-cols">
                <div className="kpi-section">
                    <h3 className="section-heading">WHERE ARE THEY FROM?</h3>
                    <div className="data-table-container">
                        <table className="observatory-data-table">
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>Sessions</th>
                                    <th>Interactions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {geography.slice(0, 5).map(g => (
                                    <tr key={g.country}>
                                        <td>{g.country}</td>
                                        <td>{g.sessions}</td>
                                        <td>{g.interactions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="kpi-section">
                    <h3 className="section-heading">ACQUISITION</h3>
                    <div className="data-table-container">
                        <table className="observatory-data-table">
                            <thead>
                                <tr>
                                    <th>Source</th>
                                    <th>Sessions</th>
                                    <th>Interactions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acquisition.slice(0, 5).map(a => (
                                    <tr key={a.source}>
                                        <td>{a.source}</td>
                                        <td>{a.sessions}</td>
                                        <td>{a.interactions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
