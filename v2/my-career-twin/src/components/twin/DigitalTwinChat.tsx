import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { translations } from '../../data/locales';
import type { LocaleKey } from '../../data/locales';
import { API_BASE, TWIN_APP_KEY } from '../../config/api';

import {
    PromptInput,
    PromptInputTextarea,
    PromptInputActions,
    PromptInputAction,
    PromptInputSubmit,
} from '../ui/prompt-input';
import { Reasoning, type SourceCitation } from '../ui/reasoning';
import { CodeBlock } from '../ui/code-block';
import {
    PromptSuggestions,
    type PromptSuggestionItem,
} from '../ui/prompt-suggestions';
import { Message, MessageActions } from '../ui/message';
import {
    Plus,
    Globe,
    MoreHorizontal,
    Zap,
    RotateCw,
    Loader2,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChatMessage {
    id: string;
    sender: 'user' | 'twin';
    text: string;
    sources?: SourceCitation[];
    model?: string;
    queryId?: string;
    category?: string;
    feedback?: 'like' | 'dislike' | null;
    timestamp: string;
    isFallback?: boolean;
    promptQuery?: string;
}

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
 * Robust markdown parser to render headings, bold text, bullet/numbered lists, tables, links, code blocks, and paragraphs cleanly.
 */
function renderFormattedMarkdown(text: string): React.ReactNode {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: { type: 'ul' | 'ol'; text: string }[] = [];
    let tableLines: string[] = [];
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockLines: string[] = [];

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

        // Check for fenced code block start/end ```
        if (trimmed.startsWith('```')) {
            flushList(index);
            flushTable(index);
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBlockLang = trimmed.replace(/^```/, '').trim();
                codeBlockLines = [];
            } else {
                inCodeBlock = false;
                elements.push(
                    <CodeBlock
                        key={`code_${index}`}
                        code={codeBlockLines.join('\n')}
                        language={codeBlockLang}
                    />
                );
            }
            return;
        }

        if (inCodeBlock) {
            codeBlockLines.push(line);
            return;
        }

        // Check for Markdown Table Rows (| col 1 | col 2 |)
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

        // Check for unordered list item (- , * , • )
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

        // Check for ordered list item (1. , 2. , etc.)
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

        // Headings
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

    if (inCodeBlock && codeBlockLines.length > 0) {
        elements.push(
            <CodeBlock
                key={`code_eof`}
                code={codeBlockLines.join('\n')}
                language={codeBlockLang}
            />
        );
    }

    return elements;
}

/**
 * Helper to parse inline markdown elements: links, bold, italics, code
 */
function parseInlineFormatting(text: string): React.ReactNode {
    const parts = text.split(
        /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g
    );

    return parts.map((part, i) => {
        if (!part) return null;

        // Link: [label](url)
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
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

const SUGGESTION_ITEMS: PromptSuggestionItem[] = [
    {
        label: 'Frontend & Architecture',
        prompt: 'Can you describe your React and TypeScript architectural approach in enterprise projects?',
    },
    {
        label: 'Distributed .NET & Microservices',
        prompt: 'Tell me about your experience architecting .NET Core microservices, Redis caching, and EF Core.',
    },
    {
        label: 'AI & RAG Engineering',
        prompt: 'How did you design the RAG pipeline with Gemini and vector embeddings for this portfolio?',
    },
    {
        label: 'Leadership & Delivery',
        prompt: 'What is your leadership style and experience managing distributed engineering teams across Malta, UK, and UAE?',
    },
];

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
    const [retryingId, setRetryingId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Synchronize welcome message when locale changes
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

    const handleFeedback = async (
        messageId: string,
        feedbackType: 'like' | 'dislike'
    ) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === messageId
                    ? {
                          ...msg,
                          feedback:
                              msg.feedback === feedbackType
                                  ? null
                                  : feedbackType,
                      }
                    : msg
            )
        );

        const msg = messages.find((m) => m.id === messageId);
        if (!msg || !msg.queryId) return;

        try {
            await fetch(`${API_BASE}/api/twin/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Twin-App-Key': TWIN_APP_KEY,
                },
                body: JSON.stringify({
                    queryId: msg.queryId,
                    feedback: feedbackType,
                }),
            });
        } catch (err) {
            console.warn('Failed to record feedback:', err);
        }
    };

    const handleSend = async (
        questionText?: string,
        retryTargetId?: string
    ) => {
        const q = (questionText || input).trim();
        if (!q || (isLoading && !retryTargetId)) return;

        if (retryTargetId) {
            setRetryingId(retryTargetId);
        } else {
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
            setInput('');
            setIsLoading(true);
        }

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
                        .filter(
                            (m) =>
                                m.id !== 'welcome' &&
                                (!retryTargetId || m.id !== retryTargetId)
                        )
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
                    promptQuery: q,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                };
                setMessages((prev) => [...prev, validationMsg]);
                return;
            }

            const data = await response.json();
            const isFallback =
                data.isFallback === true ||
                data.model === 'grounded-vector-synthesis' ||
                (typeof data.answer === 'string' &&
                    (data.answer.includes(
                        'temporarily experiencing high traffic'
                    ) ||
                        data.answer.includes('stark ausgelastet') ||
                        data.answer.includes('très sollicité')));

            let cleanAnswer = data.answer;
            if (isFallback && typeof cleanAnswer === 'string') {
                cleanAnswer = cleanAnswer
                    .replace(/ℹ️\s*\*?Note:[^\n]+\*?/gi, '')
                    .replace(/ℹ️\s*\*?Hinweis:[^\n]+\*?/gi, '')
                    .replace(/^---\s*\n/gm, '')
                    .trim();
            }

            const twinMsg: ChatMessage = {
                id: retryTargetId || 'twin_' + Date.now(),
                sender: 'twin',
                text: cleanAnswer,
                sources: data.sources,
                model: data.model,
                queryId: data.queryId,
                category: data.category,
                feedback: null,
                isFallback,
                promptQuery: q,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            };

            if (retryTargetId) {
                setMessages((prev) =>
                    prev.map((m) => (m.id === retryTargetId ? twinMsg : m))
                );
            } else {
                setMessages((prev) => [...prev, twinMsg]);
            }
        } catch (err) {
            console.warn(
                'Backend API offline or unreachable, providing local knowledge fallback:',
                err
            );
            const fallbackMsg: ChatMessage = {
                id: retryTargetId || 'fallback_' + Date.now(),
                sender: 'twin',
                text: `${t?.fallback || 'I have 18+ years of technical experience specializing in enterprise software architecture, .NET Core, React, Angular, Azure cloud services, and GenAI RAG applications.'}`,
                isFallback: true,
                promptQuery: q,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            };
            if (retryTargetId) {
                setMessages((prev) =>
                    prev.map((m) => (m.id === retryTargetId ? fallbackMsg : m))
                );
            } else {
                setMessages((prev) => [...prev, fallbackMsg]);
            }
        } finally {
            setIsLoading(false);
            setRetryingId(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="twin-modal-overlay">
            <div className="twin-chat-window">
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
                            type="button"
                            className="twin-header-btn twin-close-btn"
                            onClick={onClose}
                            aria-label="Close Chat"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Messages Body */}
                <div className="twin-chat-body">
                    {/* Prompt Suggestions at top if early conversation */}
                    {messages.length <= 2 && (
                        <div className="twin-suggestions-wrapper">
                            <div className="twin-suggestions-title">
                                Suggested questions:
                            </div>
                            <PromptSuggestions
                                suggestions={SUGGESTION_ITEMS}
                                onSelect={(prompt) => handleSend(prompt)}
                            />
                        </div>
                    )}

                    {messages.map((m) => (
                        <Message
                            key={m.id}
                            sender={m.sender}
                            timestamp={m.timestamp}
                            actions={
                                m.sender === 'twin' ? (
                                    <MessageActions
                                        text={m.text}
                                        feedback={m.feedback}
                                        onFeedback={(type) =>
                                            handleFeedback(m.id, type)
                                        }
                                        onRetry={
                                            m.promptQuery
                                                ? () =>
                                                      handleSend(
                                                          m.promptQuery,
                                                          m.id
                                                      )
                                                : undefined
                                        }
                                        isRetrying={retryingId === m.id}
                                    />
                                ) : undefined
                            }
                        >
                            {retryingId === m.id ? (
                                <div className="prompt-kit-retrying-card">
                                    <div className="prompt-kit-retrying-header">
                                        <Loader2 className="w-4 h-4 animate-spin text-accent" />
                                        <span className="prompt-kit-retrying-title">
                                            Retrying with Gemini...
                                        </span>
                                    </div>
                                    <p className="prompt-kit-retrying-desc">
                                        Reconnecting to Gemini LLM reasoning
                                        engine to synthesize a grounded persona
                                        response.
                                    </p>
                                    <div
                                        className="typing-indicator"
                                        style={{ marginTop: '6px' }}
                                    >
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* High-Traffic Fallback Notice Banner */}
                                    {m.sender === 'twin' && m.isFallback && (
                                        <div className="prompt-kit-fallback-banner">
                                            <div className="prompt-kit-fallback-header">
                                                <Zap className="w-3.5 h-3.5 text-amber-500" />
                                                <span className="prompt-kit-fallback-title">
                                                    High LLM Traffic Notice
                                                </span>
                                            </div>
                                            <p className="prompt-kit-fallback-desc">
                                                The Gemini reasoning engine is
                                                temporarily busy. Displaying
                                                verified ground truth facts
                                                directly from the vector
                                                knowledge base.
                                            </p>
                                            <button
                                                type="button"
                                                className="prompt-kit-retry-btn"
                                                onClick={() =>
                                                    handleSend(
                                                        m.promptQuery,
                                                        m.id
                                                    )
                                                }
                                                disabled={
                                                    isLoading ||
                                                    retryingId === m.id
                                                }
                                            >
                                                <RotateCw
                                                    className={cn(
                                                        'w-3.5 h-3.5',
                                                        retryingId === m.id &&
                                                            'animate-spin'
                                                    )}
                                                />
                                                <span>
                                                    {retryingId === m.id
                                                        ? 'Retrying with Gemini...'
                                                        : 'Retry with Gemini'}
                                                </span>
                                            </button>
                                        </div>
                                    )}

                                    {/* Reasoning Accordion for RAG Sources */}
                                    {m.sender === 'twin' &&
                                        m.sources &&
                                        m.sources.length > 0 && (
                                            <Reasoning
                                                sources={m.sources}
                                                model={m.model}
                                                category={m.category}
                                            />
                                        )}

                                    <div className="twin-msg-text">
                                        {renderFormattedMarkdown(m.text)}
                                    </div>
                                </>
                            )}
                        </Message>
                    ))}

                    {isLoading && !retryingId && (
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

                {/* Prompt-Kit Input Suite */}
                <PromptInput>
                    {input.length > 200 && (
                        <div className="prompt-kit-char-counter">
                            <span>
                                {input.length > 4000
                                    ? '⚠️ Query exceeds 4,000 character limit'
                                    : 'Job description / long query detected'}
                            </span>
                            <span
                                className={
                                    input.length > 4000
                                        ? 'limit-danger'
                                        : input.length > 3500
                                          ? 'limit-warn'
                                          : ''
                                }
                            >
                                {input.length.toLocaleString()} / 4,000 chars
                            </span>
                        </div>
                    )}

                    <PromptInputTextarea
                        ref={textareaRef}
                        placeholder={
                            t?.placeholder ||
                            'Ask about my experience in Frontend, .NET, Python, RAG, LLMs, Team leadership...'
                        }
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onSubmit={() => handleSend()}
                        disabled={isLoading}
                    />

                    {/* Bottom Actions Row */}
                    <PromptInputActions>
                        <div className="prompt-kit-left-tools">
                            {/* Plus button */}
                            <PromptInputAction
                                variant="circle"
                                tooltip="Add Job Description / Context"
                                onClick={() => {
                                    setInput((prev) =>
                                        prev
                                            ? `${prev}\n\nHere is a Job Description / Architecture requirement to assess:`
                                            : 'Can you assess my technical experience for this role / requirement:\n'
                                    );
                                    textareaRef.current?.focus();
                                }}
                            >
                                <Plus />
                            </PromptInputAction>

                            {/* Search Tool Indicator Pill */}
                            <PromptInputAction
                                variant="pill"
                                className="prompt-kit-tool-active"
                                tooltip="Web search tool is enabled for live grounding"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Informative indicator badge: does not inject text
                                }}
                            >
                                <Globe />
                                <span>Search</span>
                                <span className="prompt-kit-status-dot" />
                            </PromptInputAction>

                            {/* More Pill (...) */}
                            <PromptInputAction
                                variant="circle"
                                tooltip="Quick Career Summary prompt"
                                onClick={() => {
                                    setInput(
                                        "Can you provide a structured summary of Prasanna's 18+ years career timeline across Malta, UAE, UK, and India?"
                                    );
                                    textareaRef.current?.focus();
                                }}
                            >
                                <MoreHorizontal />
                            </PromptInputAction>
                        </div>

                        {/* Submit Button */}
                        <PromptInputSubmit
                            isLoading={isLoading}
                            disabled={!input.trim()}
                            onClick={() => handleSend()}
                        />
                    </PromptInputActions>
                </PromptInput>
            </div>
        </div>
    );
};
