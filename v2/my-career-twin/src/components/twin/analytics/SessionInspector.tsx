import React from 'react';
import { useSessionInspector } from '../../../data/analytics/useObservatory';

function parseInline(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} style={{ color: '#fff', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={i} style={{ background: 'rgba(255,255,255,0.15)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em', color: '#a3e635' }}>{part.slice(1, -1)}</code>;
        }
        return part;
    });
}

function renderTranscriptMarkdown(text: string) {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} style={{ height: '8px' }} />;
        
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            return <div key={i} style={{ display: 'flex', gap: '8px', marginTop: '4px', paddingLeft: '8px' }}><span style={{ color: '#a3e635' }}>•</span><span>{parseInline(trimmed.substring(2))}</span></div>;
        }
        
        const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (olMatch) {
            return <div key={i} style={{ display: 'flex', gap: '8px', marginTop: '4px', paddingLeft: '8px' }}><span style={{ color: '#a3e635' }}>{olMatch[1]}.</span><span>{parseInline(olMatch[2])}</span></div>;
        }
        
        if (trimmed.startsWith('### ')) {
            return <div key={i} style={{ marginTop: '16px', marginBottom: '8px', fontWeight: 'bold', color: '#fff', fontSize: '1.1em' }}>{parseInline(trimmed.replace('### ', ''))}</div>;
        }
        if (trimmed.startsWith('## ')) {
            return <div key={i} style={{ marginTop: '20px', marginBottom: '8px', fontWeight: 'bold', color: '#fff', fontSize: '1.2em' }}>{parseInline(trimmed.replace('## ', ''))}</div>;
        }

        return <div key={i} style={{ marginTop: '8px', marginBottom: '8px' }}>{parseInline(trimmed)}</div>;
    });
}

interface Props {
    sessionId: string;
    onClose: () => void;
}

export const SessionInspector: React.FC<Props> = ({ sessionId, onClose }) => {
    const { trace, loading, error } = useSessionInspector(sessionId);

    return (
        <div className="lv-transcript-panel">
            <div className="lv-transcript-header">
                <h3>SESSION TRANSCRIPT • #{sessionId.substring(0, 4)}</h3>
                <div className="lv-transcript-meta">
                    {trace ? `${trace.country || 'Unknown'} · ${trace.queryCount}Q · ${Math.floor(trace.durationSeconds / 60)}M${trace.durationSeconds % 60}S` : 'LOADING...'}
                    <button className="lv-transcript-close" onClick={onClose}>×</button>
                </div>
            </div>

            <div className="lv-transcript-body">
                {loading && <div className="lv-loading">Loading trace data...</div>}
                {error && <div className="lv-error">{error}</div>}
                
                {trace && trace.queries.map((q) => (
                    <div className="lv-qa-block" key={q.id}>
                        <div className="lv-q-label">Q — VISITOR</div>
                        <div className="lv-q-text">{q.question}</div>
                        
                        <div className="lv-a-block">
                            <div className="lv-a-label">A — TWIN</div>
                            <div className="lv-a-text">{q.response ? renderTranscriptMarkdown(q.response) : '(No response recorded)'}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
