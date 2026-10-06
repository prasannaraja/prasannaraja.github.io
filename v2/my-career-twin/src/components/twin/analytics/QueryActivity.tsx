import React from 'react';
import type { TwinSession } from '../../../data/analytics/viewModel';

interface Props {
    sessions: { data: TwinSession[], total: number, page: number, totalPages: number };
    onRowClick: (id: string) => void;
}

export const QueryActivity: React.FC<Props> = ({ sessions, onRowClick }) => {
    return (
        <div className="query-activity-panel">
            <h3 className="section-heading">WHAT PEOPLE ARE ASKING</h3>
            <div className="table-responsive">
                <table className="observatory-data-table full-width cursor-pointer">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Country</th>
                            <th>Source</th>
                            <th>Session ID</th>
                            <th>Last Question</th>
                            <th>Category</th>
                            <th>Confidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.data.map((s) => {
                            const dateObj = new Date(s.timestamp);
                            return (
                                <tr key={s.sessionId} onClick={() => onRowClick(s.sessionId)}>
                                    <td>{dateObj.toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}</td>
                                    <td>{dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td>{s.country || 'Unknown'}</td>
                                    <td>{s.source || 'Direct'}</td>
                                    <td className="monospace">{s.sessionId.substring(0, 8)}</td>
                                    <td className="truncate-text" style={{maxWidth: '300px'}}>{s.lastQuery || '-'}</td>
                                    <td>{s.category || '-'}</td>
                                    <td>{s.confidenceScore ? Math.round(s.confidenceScore * 100) + '%' : '-'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="pagination-info">
                Page {sessions.page} of {sessions.totalPages} (Total Sessions: {sessions.total})
            </div>
        </div>
    );
};
