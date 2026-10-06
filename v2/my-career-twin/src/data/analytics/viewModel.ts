export interface RawAnalyticsData {
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

export interface ObservatoryViewModel {
    interactions: number;
    sessions: number;
    groundingRate: number;
    medianResponse: number;
    knowledgeGaps: number;
    topics: Array<{
        topic: string;
        count: number;
        percentage: number;
    }>;
    gaps: Array<{
        category: string;
        frequency: number;
        sampleQuestions: string[];
        suggestedAction: string;
    }>;
    activity: RawAnalyticsData['recentQueries'];
    twinHealth: {
        retrieval: number;
        grounding: number;
        knowledge: number;
        latency: number;
        feedback: number;
    };
    engineeringSignal: string;
}

export const transformAnalyticsToViewModel = (raw: RawAnalyticsData): ObservatoryViewModel => {
    // Generate an algorithmic engineering signal based on top topics
    const topTopics = raw.topicDistribution.slice(0, 3).map(t => t.topic);
    const signal = topTopics.length > 0 
        ? `Visitors are primarily evaluating dimensions: ${topTopics.join(' · ')}. Current interaction pattern suggests strong interest in these areas.`
        : 'Sufficient data not yet collected for engineering signal.';

    return {
        interactions: raw.summary.totalQueries,
        sessions: raw.summary.uniqueSessions,
        groundingRate: raw.summary.satisfactionRate, // mapped for now
        medianResponse: raw.summary.avgLatencyMs, // assuming avg is proxy for median here
        knowledgeGaps: raw.summary.knowledgeGapsCount,
        topics: raw.topicDistribution,
        gaps: raw.knowledgeGaps,
        activity: raw.recentQueries,
        twinHealth: {
            retrieval: 98, // Simulated or derived
            grounding: raw.summary.satisfactionRate,
            knowledge: 100 - (raw.summary.knowledgeGapsCount * 2), // basic heuristic
            latency: raw.summary.avgLatencyMs,
            feedback: (raw.summary.totalLikes / (raw.summary.totalLikes + raw.summary.totalDislikes) * 100) || 100
        },
        engineeringSignal: signal
    };
};

