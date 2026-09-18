import React, { useState, useEffect } from 'react';

interface AnalyticsData {
    summary: {
        totalQueries: number;
        uniqueSessions: number;
        avgQueriesPerSession: number;
        avgLatencyMs: number;
        knowledgeGapsCount: number;
        totalLikes: number;
        totalDislikes: number;
        satisfactionRate: number;
    };
    topicDistribution: Array<{
        topic: string;
        count: number;
        percentage: number;
    }>;
    knowledgeGaps: Array<{
        category: string;
        frequency: number;
        sampleQuestions: string[];
        suggestedAction: string;
    }>;
    recentQueries: Array<{
        id: string;
        timestamp: string;
        question: string;
        category: string;
        confidenceScore: number;
        isKnowledgeGap: boolean;
        latencyMs: number;
        model: string;
        sources: Array<{ title: string; similarity: string }>;
        feedback: 'like' | 'dislike' | null;
    }>;
}

import { API_BASE } from '../../config/api';

interface AnalyticsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'topics' | 'gaps' | 'stream'>(
        'topics'
    );

    const fetchAnalytics = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/twin/analytics/dashboard`);
            if (res.ok) {
                const json = await res.json();
                setData(json);
            }
        } catch (e) {
            console.warn('Unable to load telemetry dashboard:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchAnalytics();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="twin-modal-overlay" onClick={onClose}>
            <div
                className="twin-analytics-window"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="analytics-header">
                    <div>
                        <h2>📊 Digital Twin Telemetry & Query Analytics</h2>
                        <p className="analytics-subtitle">
                            Live observability of recruiter queries, FAQ demand
                            clustering, and knowledge gap detection
                        </p>
                    </div>
                    <div className="analytics-actions">
                        <button
                            className="refresh-btn"
                            onClick={fetchAnalytics}
                            title="Refresh Analytics"
                        >
                            🔄 Refresh
                        </button>
                        <button
                            className="twin-close-btn"
                            onClick={onClose}
                            aria-label="Close Analytics"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {isLoading && !data ? (
                    <div className="analytics-loading">
                        Loading telemetry insights...
                    </div>
                ) : !data || data.summary.totalQueries === 0 ? (
                    <div className="analytics-empty">
                        <p>
                            No query telemetry recorded yet. Ask a question to
                            the Digital Twin to start gathering analytics!
                        </p>
                    </div>
                ) : (
                    <div className="analytics-content">
                        {/* KPI Cards Row */}
                        <div className="kpi-grid">
                            <div className="kpi-card">
                                <span className="kpi-label">
                                    Total Questions
                                </span>
                                <span className="kpi-value">
                                    {data.summary.totalQueries}
                                </span>
                                <span className="kpi-sub">
                                    Across all sessions
                                </span>
                            </div>
                            <div className="kpi-card">
                                <span className="kpi-label">
                                    Unique Sessions
                                </span>
                                <span className="kpi-value">
                                    {data.summary.uniqueSessions}
                                </span>
                                <span className="kpi-sub">
                                    {data.summary.avgQueriesPerSession} avg /
                                    visitor
                                </span>
                            </div>
                            <div className="kpi-card">
                                <span className="kpi-label">
                                    User Satisfaction
                                </span>
                                <span className="kpi-value">
                                    {data.summary.satisfactionRate}%
                                </span>
                                <span className="kpi-sub">
                                    👍 {data.summary.totalLikes} | 👎{' '}
                                    {data.summary.totalDislikes}
                                </span>
                            </div>
                            <div className="kpi-card">
                                <span className="kpi-label">
                                    Knowledge Gaps
                                </span>
                                <span className="kpi-value alert">
                                    {data.summary.knowledgeGapsCount}
                                </span>
                                <span className="kpi-sub">
                                    Low confidence / ungrounded
                                </span>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="analytics-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'topics' ? 'active' : ''}`}
                                onClick={() => setActiveTab('topics')}
                            >
                                (A) Topic Demand Matrix
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'gaps' ? 'active' : ''}`}
                                onClick={() => setActiveTab('gaps')}
                            >
                                (B) Knowledge Gap Detector (
                                {data.knowledgeGaps.length})
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'stream' ? 'active' : ''}`}
                                onClick={() => setActiveTab('stream')}
                            >
                                (C) Live Query Stream (
                                {data.recentQueries.length})
                            </button>
                        </div>

                        {/* Tab Contents */}
                        <div className="tab-body">
                            {activeTab === 'topics' && (
                                <div className="topic-matrix-view">
                                    <p className="section-note">
                                        Real-time clustering of questions asked
                                        by recruiters and hiring managers:
                                    </p>
                                    <div className="topic-list">
                                        {data.topicDistribution.map(
                                            (t, idx) => (
                                                <div
                                                    key={idx}
                                                    className="topic-row"
                                                >
                                                    <div className="topic-info">
                                                        <span className="topic-name">
                                                            {t.topic}
                                                        </span>
                                                        <span className="topic-count">
                                                            {t.count} queries (
                                                            {t.percentage}%)
                                                        </span>
                                                    </div>
                                                    <div className="progress-bar-bg">
                                                        <div
                                                            className="progress-bar-fill"
                                                            style={{
                                                                width: `${Math.max(6, t.percentage)}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'gaps' && (
                                <div className="gaps-view">
                                    <p className="section-note">
                                        Identified topics or edge cases with low
                                        vector confidence or negative feedback.
                                        Use these recommendations to
                                        continuously enrich{' '}
                                        <code>about-me.txt</code>:
                                    </p>
                                    {data.knowledgeGaps.length === 0 ? (
                                        <div className="no-gaps-card">
                                            ✅ 100% Grounding Coverage! No
                                            knowledge gaps or low-confidence
                                            queries detected.
                                        </div>
                                    ) : (
                                        <div className="gaps-list">
                                            {data.knowledgeGaps.map(
                                                (gap, i) => (
                                                    <div
                                                        key={i}
                                                        className="gap-card"
                                                    >
                                                        <div className="gap-header">
                                                            <span className="gap-category">
                                                                ⚠️{' '}
                                                                {gap.category}
                                                            </span>
                                                            <span className="gap-frequency">
                                                                {gap.frequency}{' '}
                                                                occurrences
                                                            </span>
                                                        </div>
                                                        <div className="gap-samples">
                                                            <strong>
                                                                Sample Queries:
                                                            </strong>
                                                            <ul>
                                                                {gap.sampleQuestions.map(
                                                                    (
                                                                        sq,
                                                                        si
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                si
                                                                            }
                                                                        >
                                                                            &quot;
                                                                            {sq}
                                                                            &quot;
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                        <div className="gap-recommendation">
                                                            💡{' '}
                                                            <strong>
                                                                Actionable
                                                                Recommendation:
                                                            </strong>{' '}
                                                            {
                                                                gap.suggestedAction
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'stream' && (
                                <div className="stream-view">
                                    <p className="section-note">
                                        Latest visitor questions with matched
                                        sources, confidence scores, and latency:
                                    </p>
                                    <div className="stream-table">
                                        {data.recentQueries.map((q) => (
                                            <div
                                                key={q.id}
                                                className="stream-row"
                                            >
                                                <div className="stream-time">
                                                    {new Date(
                                                        q.timestamp
                                                    ).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                    })}
                                                </div>
                                                <div className="stream-main">
                                                    <div className="stream-q">
                                                        <strong>Q:</strong>{' '}
                                                        &quot;{q.question}&quot;
                                                    </div>
                                                    <div className="stream-tags">
                                                        <span className="badge category">
                                                            {q.category}
                                                        </span>
                                                        <span
                                                            className={`badge conf ${q.isKnowledgeGap ? 'gap' : 'ok'}`}
                                                        >
                                                            {q.isKnowledgeGap
                                                                ? '⚠️ Low Match'
                                                                : '✅ Grounded'}{' '}
                                                            (
                                                            {Math.round(
                                                                q.confidenceScore *
                                                                    100
                                                            )}
                                                            %)
                                                        </span>
                                                        <span className="badge latency">
                                                            ⚡ {q.latencyMs}ms
                                                        </span>
                                                        {q.feedback && (
                                                            <span className="badge fb">
                                                                {q.feedback ===
                                                                'like'
                                                                    ? '👍 Helpful'
                                                                    : '👎 Gap'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
