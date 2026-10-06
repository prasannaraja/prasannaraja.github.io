import { useState, useEffect } from 'react';
import { OverviewMetrics, TwinSession, SessionTrace, GeographyData, AcquisitionData } from './viewModel';

import { API_BASE } from '../../config/api';

const API_BASE_URL = `${API_BASE}/api/twin/analytics`;

export function useObservatory() {
  const [overview, setOverview] = useState<OverviewMetrics | null>(null);
  const [sessions, setSessions] = useState<{data: TwinSession[], total: number, page: number, totalPages: number} | null>(null);
  const [geography, setGeography] = useState<GeographyData[]>([]);
  const [acquisition, setAcquisition] = useState<AcquisitionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [overviewRes, sessionsRes, geoRes, acqRes] = await Promise.all([
          fetch(`${API_BASE_URL}/overview`).then(r => r.json()),
          fetch(`${API_BASE_URL}/sessions?page=1`).then(r => r.json()),
          fetch(`${API_BASE_URL}/geography`).then(r => r.json()),
          fetch(`${API_BASE_URL}/acquisition`).then(r => r.json()),
        ]);

        setOverview(overviewRes);
        setSessions(sessionsRes);
        setGeography(geoRes);
        setAcquisition(acqRes);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { overview, sessions, geography, acquisition, loading, error };
}

export function useSessionInspector(sessionId: string | null) {
  const [trace, setTrace] = useState<SessionTrace | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setTrace(null);
      return;
    }

    async function fetchTrace() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/sessions/${sessionId}`);
        if (!res.ok) throw new Error('Failed to fetch session trace');
        const data = await res.json();
        setTrace(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching trace');
      } finally {
        setLoading(false);
      }
    }

    fetchTrace();
  }, [sessionId]);

  return { trace, loading, error };
}
