export interface TwinQuery {
  id: string;
  sessionId: string;
  timestamp: string;
  question: string;
  response: string | null;
  category: string;
  intent: string | null;
  confidenceScore: number;
  isKnowledgeGap: boolean;
  latencyMs: number;
  model: string;
  chunksRetrieved: number | null;
  chunksUsed: number | null;
  feedback: "like" | "dislike" | null;
  responseLength: number | null;
  contextTokens: number | null;
  outputTokens: number | null;
  sources: Array<{ id: number, chunkTitle: string; similarity: string; company: string | null }>;
}

export interface TwinSession {
  sessionId: string;
  country: string | null;
  source: string | null;
  engagementLevel: string | null;
  durationSeconds: number;
  queryCount: number;
  lastQuery: string | null;
  category: string | null;
  confidenceScore: number | null;
  timestamp: string;
}

export interface SessionTrace {
  id: string;
  firstSeen: string;
  lastSeen: string;
  userAgent: string | null;
  queryCount: number;
  country: string | null;
  region: string | null;
  city: string | null;
  deviceType: string | null;
  browser: string | null;
  language: string | null;
  source: string | null;
  referrer: string | null;
  landingPage: string | null;
  engagementLevel: string | null;
  durationSeconds: number;
  queries: TwinQuery[];
}

export interface OverviewMetrics {
  totalSessions: number;
  totalQueries: number;
  uniqueCountries: number;
  deepSessions: number;
  avgQueriesPerSession: number;
  avgSessionDuration: number;
}

export interface GeographyData {
  country: string;
  sessions: number;
  interactions: number;
}

export interface AcquisitionData {
  source: string;
  sessions: number;
  interactions: number;
  avgDuration: number;
}
