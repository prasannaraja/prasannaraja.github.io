import React, { useState, useEffect, useRef } from 'react';

interface Source {
    title: string;
    company?: string;
    similarity?: string;
}

interface ChatMessage {
    id: string;
    sender: 'user' | 'twin';
    text: string;
    sources?: Source[];
    model?: string;
    queryId?: string;
    category?: string;
    feedback?: 'like' | 'dislike' | null;
    timestamp: string;
}

const API_BASE =
    (import.meta as unknown as { env: { VITE_API_URL?: string } }).env
        .VITE_API_URL || 'http://localhost:3000';

function getOrCreateSessionId(): string {
    let sid = localStorage.getItem('career_twin_session_id');
    if (!sid) {
        sid =
            'sess_' +
            Date.now() +
            '_' +
            Math.random().toString(36).substring(2, 8);
        localStorage.setItem('career_twin_session_id', sid);
    }
    return sid;
}

/**
 * Basic markdown parser to render bold text, bullet lists, and paragraphs cleanly without heavy dependencies.
 */
function renderFormattedMarkdown(text: string): React.ReactNode {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = (keyPrefix: number) => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`ul_${keyPrefix}`} className="twin-markdown-list">
                    {listItems.map((item, idx) => (
                        <li key={idx}>{parseInlineFormatting(item)}</li>
                    ))}
                </ul>
            );
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (
            trimmed.startsWith('- ') ||
            trimmed.startsWith('* ') ||
            trimmed.startsWith('• ')
        ) {
            listItems.push(trimmed.replace(/^[-*•]\s+/, ''));
        } else {
            flushList(index);
            if (trimmed.startsWith('### ')) {
                elements.push(
                    <h4 key={`h4_${index}`} className="twin-markdown-h4">
                        {trimmed.replace('### ', '')}
                    </h4>
                );
            } else if (trimmed.startsWith('## ')) {
                elements.push(
                    <h3 key={`h3_${index}`} className="twin-markdown-h3">
                        {trimmed.replace('## ', '')}
                    </h3>
                );
            } else if (trimmed.length > 0) {
                elements.push(
                    <p key={`p_${index}`} className="twin-markdown-p">
                        {parseInlineFormatting(trimmed)}
                    </p>
                );
            }
        }
    });

    flushList(lines.length);
    return elements;
}

function parseInlineFormatting(text: string): React.ReactNode {
    // Parse bold **text** and `code`
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return (
                <code key={i} className="twin-inline-code">
                    {part.slice(1, -1)}
                </code>
            );
        }
        return part;
    });
}

export interface DigitalTwinChatProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenAnalytics?: () => void;
}

export const DigitalTwinChat: React.FC<DigitalTwinChatProps> = ({
    isOpen,
    onClose,
}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            sender: 'twin',
            text: 'Hello! I am the **AI Digital Twin of Prasanna Prabhakaran**.\n\nHow can I help you today?',
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async (questionText?: string) => {
        const q = (questionText || input).trim();
        if (!q || isLoading) return;

        const userMsg: ChatMessage = {
            id: 'msg_' + Date.now(),
            sender: 'user',
            text: q,
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        setMessages((prev) => [...prev, userMsg]);
        if (!questionText) setInput('');
        setIsLoading(true);

        const sessionId = getOrCreateSessionId();

        try {
            const response = await fetch(`${API_BASE}/api/twin/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Session-ID': sessionId,
                },
                body: JSON.stringify({
                    question: q,
                    sessionId,
                    history: messages
                        .filter((m) => m.id !== 'welcome')
                        .slice(-4)
                        .map((m) => ({
                            role: m.sender === 'user' ? 'user' : 'model',
                            content: m.text,
                        })),
                }),
            });

            if (!response.ok) {
                throw new Error(`API responded with ${response.status}`);
            }

            const data = await response.json();

            const twinMsg: ChatMessage = {
                id: 'twin_' + Date.now(),
                sender: 'twin',
                text: data.answer,
                sources: data.sources,
                model: data.model,
                queryId: data.queryId,
                category: data.category,
                feedback: null,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            };

            setMessages((prev) => [...prev, twinMsg]);
        } catch (err) {
            console.warn(
                'Backend API offline or unreachable, providing local knowledge fallback:',
                err
            );
            // Fallback
            const fallbackMsg: ChatMessage = {
                id: 'fallback_' + Date.now(),
                sender: 'twin',
                text: `I've noted your question regarding: "${q}".\n\nI have 18+ years of technical experience specializing in enterprise software architecture, .NET Core, React, Angular, Azure cloud services, and GenAI RAG applications. Feel free to explore my full project and experience history across this portfolio!`,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            };
            setMessages((prev) => [...prev, fallbackMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFeedback = async (
        messageId: string,
        queryId: string | undefined,
        feedbackType: 'like' | 'dislike'
    ) => {
        // Update local UI
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === messageId ? { ...msg, feedback: feedbackType } : msg
            )
        );

        if (queryId) {
            try {
                await fetch(`${API_BASE}/api/twin/feedback`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ queryId, feedback: feedbackType }),
                });
            } catch (e) {
                console.warn('Feedback sync error:', e);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="twin-modal-overlay" onClick={onClose}>
            <div
                className="twin-chat-window"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="twin-chat-header">
                    <div className="twin-avatar-info">
                        <div className="twin-avatar">PR</div>
                        <div>
                            <div className="twin-title">
                                Prasanna Raja Digital Twin
                            </div>
                            <div className="twin-status">
                                <span className="status-dot"></span> Career &
                                Technical History
                            </div>
                        </div>
                    </div>
                    <div className="twin-header-actions">
                        <button
                            className="twin-close-btn"
                            onClick={onClose}
                            aria-label="Close Chat"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Messages Body */}
                <div className="twin-chat-body">
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={`twin-msg-wrapper ${m.sender}`}
                        >
                            <div className="twin-msg-bubble">
                                <div className="twin-msg-text">
                                    {renderFormattedMarkdown(m.text)}
                                </div>

                                {/* Sources & Citations */}
                                {m.sources && m.sources.length > 0 && (
                                    <div className="twin-sources-box">
                                        <span className="sources-label">
                                            Grounded Sources:
                                        </span>
                                        <div className="sources-chips">
                                            {m.sources.map((src, i) => (
                                                <span
                                                    key={i}
                                                    className="source-chip"
                                                    title={src.company}
                                                >
                                                    {src.title}{' '}
                                                    {src.similarity
                                                        ? `(${src.similarity})`
                                                        : ''}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Meta & Feedback Footer */}
                                <div className="twin-msg-meta">
                                    <span>{m.timestamp}</span>
                                    {m.category && (
                                        <span className="category-tag">
                                            {m.category}
                                        </span>
                                    )}
                                    {m.sender === 'twin' &&
                                        m.id !== 'welcome' && (
                                            <div className="twin-feedback-btns">
                                                <button
                                                    className={`fb-btn ${m.feedback === 'like' ? 'active' : ''}`}
                                                    title="Helpful response"
                                                    onClick={() =>
                                                        handleFeedback(
                                                            m.id,
                                                            m.queryId,
                                                            'like'
                                                        )
                                                    }
                                                >
                                                    👍
                                                </button>
                                                <button
                                                    className={`fb-btn ${m.feedback === 'dislike' ? 'active' : ''}`}
                                                    title="Needs improvement / knowledge gap"
                                                    onClick={() =>
                                                        handleFeedback(
                                                            m.id,
                                                            m.queryId,
                                                            'dislike'
                                                        )
                                                    }
                                                >
                                                    👎
                                                </button>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="twin-msg-wrapper twin">
                            <div className="twin-msg-bubble loading">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <form
                    className="twin-input-bar"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Ask about architecture, RAG, GEMS Education, .NET, leadership..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        aria-label="Send message"
                    >
                        ➤
                    </button>
                </form>
            </div>
        </div>
    );
};
