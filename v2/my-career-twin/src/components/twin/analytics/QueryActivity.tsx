import React from 'react';
import type { TwinSession } from '../../../data/analytics/viewModel';

interface Props {
    sessions: { data: TwinSession[], total: number, page: number, totalPages: number };
    onRowClick: (id: string) => void;
}

export const QueryActivity: React.FC<Props> = ({ sessions, onRowClick }) => {
    // Format duration e.g. 120 -> "02m00s"
    const formatDuration = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}m${s}s`;
    };

    // Calculate "X ago"
    const timeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    return (
        <div className="lv-sessions-panel">
            <div className="lv-sessions-header">
                <h3 className="lv-panel-header">RECENT SESSIONS</h3>
                <div className="lv-filters">
                    <span className="lv-filter-item">All</span>
                    <span className="lv-filter-item">HR</span>
                    <span className="lv-filter-item active">Technical</span>
                    <span className="lv-filter-item inactive">{sessions.total} SHOWN</span>
                </div>
            </div>

            <div className="lv-sessions-list">
                {sessions.data.map((s) => (
                    <div className="lv-session-row" key={s.sessionId} onClick={() => onRowClick(s.sessionId)}>
                        <div className="lv-col-geo">
                            {s.country ? s.country.substring(0, 2).toUpperCase() : '??'}
                        </div>
                        <div className="lv-col-identity">
                            <span className="lv-id-text">Visitor #{s.sessionId.substring(0, 4)}</span>
                        </div>
                        <div className="lv-col-context">
                            <span className="lv-context-text">via {s.source || 'direct'}</span>
                        </div>
                        <div className="lv-col-stats">
                            {formatDuration(s.durationSeconds)} · {s.queryCount}q · {timeAgo(s.timestamp)}
                        </div>
                        <div className="lv-col-tags">
                            <span className="lv-tag">{s.category || 'General'}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="lv-pagination">
                Page {sessions.page} of {sessions.totalPages}
            </div>
        </div>
    );
};
