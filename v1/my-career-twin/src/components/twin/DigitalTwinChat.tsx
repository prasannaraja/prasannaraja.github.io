import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { translations } from '../../data/locales';
import type { LocaleKey } from '../../data/locales';

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

import { API_BASE, TWIN_APP_KEY } from '../../config/api';

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
 * Robust markdown parser to render headings, bold text, bullet/numbered lists, tables, links, and paragraphs cleanly.
 */
function renderFormattedMarkdown(text: string): React.ReactNode {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: { type: 'ul' | 'ol'; text: string }[] = [];
    let tableLines: string[] = [];

    const flushList = (keyPrefix: number) => {
        if (listItems.length > 0) {
            const listType = listItems[0].type;
            if (listType === 'ol') {
                elements.push(
                    <ol
                        key={`ol_${keyPrefix}`}
                        className="twin-markdown-ol list-decimal list-inside my-2 space-y-1"
                    >
                        {listItems.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">
                                {parseInlineFormatting(item.text)}
                            </li>
                        ))}
                    </ol>
                );
            } else {
                elements.push(
                    <ul
                        key={`ul_${keyPrefix}`}
                        className="twin-markdown-list list-disc list-inside my-2 space-y-1"
                    >
                        {listItems.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">
                                {parseInlineFormatting(item.text)}
                            </li>
                        ))}
                    </ul>
                );
            }
            listItems = [];
        }
    };

    const flushTable = (keyPrefix: number) => {
        if (tableLines.length >= 2) {
            // Must have header and separator
            const parseRow = (line: string) =>
                line
                    .trim()
                    .replace(/^\|/, '')
                    .replace(/\|$/, '')
                    .split('|')
                    .map((cell) => cell.trim());

            const headerCells = parseRow(tableLines[0]);
            const isSeparator = /^\|?(\s*:?-+:?\s*\|?)+$/.test(
                tableLines[1].trim()
            );
            const bodyRows = (
                isSeparator ? tableLines.slice(2) : tableLines.slice(1)
            ).map(parseRow);

            elements.push(
                <div
                    key={`tbl_wrap_${keyPrefix}`}
                    className="twin-table-container my-3 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800"
                >
                    <table className="twin-markdown-table min-w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                                {headerCells.map((cell, idx) => (
                                    <th
                                        key={idx}
                                        className="px-3 py-2 font-semibold text-slate-900 dark:text-slate-100"
                                    >
                                        {parseInlineFormatting(cell)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {bodyRows.map((row, rIdx) => (
                                <tr
                                    key={rIdx}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                                >
                                    {row.map((cell, cIdx) => (
                                        <td
                                            key={cIdx}
                                            className="px-3 py-2 text-slate-700 dark:text-slate-300 align-top"
                                        >
                                            {parseInlineFormatting(cell)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (tableLines.length === 1) {
            elements.push(
                <p
                    key={`tbl_fallback_${keyPrefix}`}
                    className="twin-markdown-p my-1.5 leading-relaxed"
                >
                    {parseInlineFormatting(tableLines[0])}
                </p>
            );
        }
        tableLines = [];
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();

        // 0. Check for Markdown Table Rows (| col 1 | col 2 |)
        if (
            trimmed.startsWith('|') &&
            trimmed.endsWith('|') &&
            trimmed.length > 1
        ) {
            flushList(index);
            tableLines.push(trimmed);
            return;
        }

        // Not a table row: flush any accumulated table
        flushTable(index);

        // 1. Check for unordered list item (- , * , • )
        if (/^[-*•]\s+/.test(trimmed)) {
            if (listItems.length > 0 && listItems[0].type !== 'ul') {
                flushList(index);
            }
            listItems.push({
                type: 'ul',
                text: trimmed.replace(/^[-*•]\s+/, ''),
            });
            return;
        }

        // 2. Check for ordered list item (1. , 2. , etc.)
        if (/^\d+\.\s+/.test(trimmed)) {
            if (listItems.length > 0 && listItems[0].type !== 'ol') {
                flushList(index);
            }
            listItems.push({
                type: 'ol',
                text: trimmed.replace(/^\d+\.\s+/, ''),
            });
            return;
        }

        // Not a list item: flush any pending list
        flushList(index);

        if (!trimmed) {
            return;
        }

        // 3. Headings
        if (trimmed.startsWith('#### ')) {
            const headerContent = trimmed
                .replace(/^####\s+/, '')
                .replace(/^\*\*|\*\*$/g, '');
            elements.push(
                <h5
                    key={`h5_${index}`}
                    className="twin-markdown-h5 font-semibold text-sm mt-2.5 mb-1 text-slate-800 dark:text-slate-200"
                >
                    {parseInlineFormatting(headerContent)}
                </h5>
            );
        } else if (trimmed.startsWith('### ')) {
            const headerContent = trimmed
                .replace(/^###\s+/, '')
                .replace(/^\*\*|\*\*$/g, '');
            elements.push(
                <h4
                    key={`h4_${index}`}
                    className="twin-markdown-h4 font-bold text-base mt-3 mb-1 text-emerald-800 dark:text-emerald-400"
                >
                    {parseInlineFormatting(headerContent)}
                </h4>
            );
        } else if (trimmed.startsWith('## ')) {
            const headerContent = trimmed
                .replace(/^##\s+/, '')
                .replace(/^\*\*|\*\*$/g, '');
            elements.push(
                <h3
                    key={`h3_${index}`}
                    className="twin-markdown-h3 font-bold text-lg mt-3.5 mb-1.5 text-emerald-900 dark:text-emerald-300"
                >
                    {parseInlineFormatting(headerContent)}
                </h3>
            );
        } else if (trimmed.startsWith('# ')) {
            const headerContent = trimmed
                .replace(/^#\s+/, '')
                .replace(/^\*\*|\*\*$/g, '');
            elements.push(
                <h2
                    key={`h2_${index}`}
                    className="twin-markdown-h2 font-bold text-xl mt-4 mb-2 text-emerald-950 dark:text-emerald-200"
                >
                    {parseInlineFormatting(headerContent)}
                </h2>
            );
        } else if (
            trimmed === '---' ||
            trimmed === '***' ||
            trimmed === '___'
        ) {
            elements.push(
                <hr
                    key={`hr_${index}`}
                    className="my-2.5 border-slate-200 dark:border-slate-700"
                />
            );
        } else if (trimmed.startsWith('ℹ️')) {
            elements.push(
                <div
                    key={`info_${index}`}
                    className="p-2.5 my-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2"
                >
                    <span>{parseInlineFormatting(trimmed)}</span>
                </div>
            );
        } else {
            elements.push(
                <p
                    key={`p_${index}`}
                    className="twin-markdown-p my-1.5 leading-relaxed"
                >
                    {parseInlineFormatting(trimmed)}
                </p>
            );
        }
    });

    flushList(lines.length);
    flushTable(lines.length);
    return elements;
}

function parseInlineFormatting(text: string): React.ReactNode {
    // Parse markdown links [text](url), bold **text**, italics *text*, and `code`
    const regex =
        /(\[.*?\]\(https?:\/\/[^\s)]+\)|\*\*.*?\*\*|\*[^*\n]+\*|`.*?`)/g;
    const parts = text.split(regex);

    return parts.map((part, i) => {
        if (!part) return null;

        // Markdown Links: [Title](URL)
        const linkMatch = part.match(/^\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
        if (linkMatch) {
            const [, linkText, linkHref] = linkMatch;
            return (
                <a
                    key={i}
                    href={linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
                >
                    {linkText}
                </a>
            );
        }

        // Bold: **text**
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
            return (
                <strong
                    key={i}
                    className="font-semibold text-slate-900 dark:text-slate-100"
                >
                    {part.slice(2, -2)}
                </strong>
            );
        }

        // Italics: *text*
        if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
            return (
                <em
                    key={i}
                    className="italic text-slate-700 dark:text-slate-300"
                >
                    {part.slice(1, -1)}
                </em>
            );
        }

        // Inline Code: `code`
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
            return (
                <code
                    key={i}
                    className="twin-inline-code px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs"
                >
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
    const currentLocale =
        (useSelector(
            (state: RootState) => state.locale.currentLocale
        ) as LocaleKey) || 'en';

    const t =
        translations[currentLocale] &&
        (translations[currentLocale] as any).twinChat
            ? (translations[currentLocale] as any).twinChat
            : (translations['en'] as any).twinChat;

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            sender: 'twin',
            text:
                t?.welcome ||
                'Hello! I am the **AI Digital Twin of Prasanna Prabhakaran**.\n\nHow can I help you today?',
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea based on content
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
        }
    }, [input]);

    const handleCopy = async (id: string, text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedMsgId(id);
            setTimeout(() => {
                setCopiedMsgId((prev) => (prev === id ? null : prev));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    // Synchronize welcome message when locale changes (if user hasn't started a custom chat)
    useEffect(() => {
        if (t?.welcome) {
            setMessages((prev) => {
                if (prev.length === 1 && prev[0].id === 'welcome') {
                    return [
                        {
                            ...prev[0],
                            text: t.welcome,
                        },
                    ];
                }
                return prev;
            });
        }
    }, [currentLocale, t?.welcome]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
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

        // Client-side length validation
        if (q.length > 4000) {
            const warnMsg: ChatMessage = {
                id: 'warn_' + Date.now(),
                sender: 'twin',
                text: `⚠️ **Query Length Notice**: Your inquiry has ${q.length.toLocaleString()} characters, which exceeds the 4,000 character limit. Please shorten or summarize the key points and try again.`,
                category: 'Validation Guardrail',
                timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            };
            setMessages((prev) => [...prev, warnMsg]);
            return;
        }

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
                    'X-Twin-App-Key': TWIN_APP_KEY,
                },
                body: JSON.stringify({
                    question: q,
                    sessionId,
                    locale: currentLocale,
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
                const errData = await response.json().catch(() => null);
                const errMsg =
                    errData?.message ||
                    `Service responded with status ${response.status}`;
                const errCategory = errData?.error || 'Validation Notice';

                const validationMsg: ChatMessage = {
                    id: 'err_' + Date.now(),
                    sender: 'twin',
                    text: `⚠️ **${errCategory === 'TOO_LONG' ? 'Query Length Limit' : 'Notice'}**: ${errMsg}`,
                    category: errCategory,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                };
                setMessages((prev) => [...prev, validationMsg]);
                return;
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
                text: `I've noted your question regarding: "${q}".\n\n${t?.fallback || 'I have 18+ years of technical experience specializing in enterprise software architecture, .NET Core, React, Angular, Azure cloud services, and GenAI RAG applications.'}`,
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
                                {t?.title || 'Prasanna Raja Digital Twin'}
                            </div>
                            <div className="twin-status">
                                <span className="status-dot"></span>{' '}
                                {t?.status || 'Career & Technical History'}
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
                                            {t?.groundedSources ||
                                                'Grounded Sources:'}
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

                                {/* Meta Footer */}
                                <div className="twin-msg-meta">
                                    <div className="flex items-center gap-2">
                                        <span>{m.timestamp}</span>
                                        {m.category && (
                                            <span className="category-tag">
                                                {m.category}
                                            </span>
                                        )}
                                    </div>
                                    {m.sender === 'twin' && (
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(m.id, m.text)}
                                            className="twin-copy-btn flex items-center justify-center p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                                            title={
                                                copiedMsgId === m.id
                                                    ? 'Copied to clipboard!'
                                                    : 'Copy markdown'
                                            }
                                            aria-label="Copy markdown"
                                        >
                                            {copiedMsgId === m.id ? (
                                                <svg
                                                    className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="w-3.5 h-3.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            )}
                                        </button>
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

                {/* ChatGPT-style Floating Input Pill */}
                <div className="twin-input-container">
                    {input.length > 200 && (
                        <div className="px-3 pb-1 flex justify-between items-center text-[10.5px] text-slate-500 dark:text-slate-400 font-mono">
                            <span>
                                {input.length > 4000
                                    ? '⚠️ Query exceeds 4,000 character limit'
                                    : 'Job description / long query detected'}
                            </span>
                            <span
                                className={
                                    input.length > 4000
                                        ? 'text-red-500 font-bold'
                                        : input.length > 3500
                                          ? 'text-amber-500 font-medium'
                                          : 'text-slate-500'
                                }
                            >
                                {input.length.toLocaleString()} / 4,000 chars
                            </span>
                        </div>
                    )}

                    <div className="twin-input-pill">
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            placeholder={
                                t?.placeholder ||
                                'Ask about my experience in Frontend, .NET, Python, RAG, LLMs, Team leadership...'
                            }
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            disabled={isLoading}
                            className="twin-pill-textarea"
                        />

                        {/* Bottom Actions Row */}
                        <div className="twin-pill-toolbar">
                            <div className="twin-pill-left-actions">
                                {/* Plus button */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setInput((prev) =>
                                            prev
                                                ? `${prev}\n\nHere is a Job Description / Architecture requirement to assess:`
                                                : 'Can you assess my technical experience for this role / requirement:\n'
                                        );
                                        textareaRef.current?.focus();
                                    }}
                                    className="twin-toolbar-circle-btn"
                                    title="Add Job Description / Context"
                                    aria-label="Add Context"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </button>

                                {/* Search Pill */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setInput((prev) =>
                                            prev
                                                ? `${prev} https://`
                                                : 'Can you review this job posting / URL and evaluate my suitability: https://'
                                        );
                                        textareaRef.current?.focus();
                                    }}
                                    className="twin-toolbar-search-btn"
                                    title="Search web or analyze URL"
                                    aria-label="Search Web"
                                >
                                    <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                        />
                                    </svg>
                                    <span>Search</span>
                                </button>

                                {/* More Pill (...) */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setInput(
                                            "Can you provide a structured summary of Prasanna's 18+ years career timeline across Malta, UAE, UK, and India?"
                                        );
                                        textareaRef.current?.focus();
                                    }}
                                    className="twin-toolbar-circle-btn"
                                    title="Quick Career Summary prompt"
                                    aria-label="More options"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Circular Submit Button (↑) */}
                            <button
                                type="button"
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isLoading}
                                className="twin-pill-submit-btn"
                                aria-label="Send message"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
