import React, { useState } from 'react';
import { Check, Copy, ThumbsUp, ThumbsDown, Bot, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface MessageActionsProps {
    text: string;
    feedback?: 'like' | 'dislike' | null;
    onFeedback?: (type: 'like' | 'dislike') => void;
    className?: string;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
    text,
    feedback,
    onFeedback,
    className,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy message:', err);
        }
    };

    return (
        <div className={cn('prompt-kit-message-actions', className)}>
            <button
                type="button"
                onClick={handleCopy}
                className={cn('prompt-kit-action-icon-btn', copied && 'copied')}
                title={copied ? 'Copied Markdown!' : 'Copy Markdown'}
                aria-label="Copy markdown"
            >
                {copied ? <Check /> : <Copy />}
            </button>

            {onFeedback && (
                <>
                    <button
                        type="button"
                        onClick={() => onFeedback('like')}
                        className={cn(
                            'prompt-kit-action-icon-btn',
                            feedback === 'like' && 'active'
                        )}
                        title="Helpful response"
                        aria-label="Good response"
                    >
                        <ThumbsUp />
                    </button>

                    <button
                        type="button"
                        onClick={() => onFeedback('dislike')}
                        className={cn(
                            'prompt-kit-action-icon-btn',
                            feedback === 'dislike' && 'active-dislike'
                        )}
                        title="Needs improvement"
                        aria-label="Poor response"
                    >
                        <ThumbsDown />
                    </button>
                </>
            )}
        </div>
    );
};

export interface MessageProps {
    sender: 'user' | 'twin';
    timestamp?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
}

export const Message: React.FC<MessageProps> = ({
    sender,
    timestamp,
    children,
    actions,
    className,
}) => {
    const isTwin = sender === 'twin';

    return (
        <div
            className={cn(
                'prompt-kit-message',
                isTwin ? 'twin' : 'user',
                className
            )}
        >
            <div className="prompt-kit-message-avatar">
                {isTwin ? <Bot /> : <User />}
            </div>

            <div className="prompt-kit-message-content">
                <div className="prompt-kit-message-bubble">{children}</div>

                <div className="prompt-kit-message-meta">
                    {timestamp && (
                        <span className="prompt-kit-message-time">
                            {timestamp}
                        </span>
                    )}
                    {actions}
                </div>
            </div>
        </div>
    );
};
