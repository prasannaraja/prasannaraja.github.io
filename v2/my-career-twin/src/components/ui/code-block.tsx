import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CodeBlockProps {
    code: string;
    language?: string;
    className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
    code,
    language = 'text',
    className,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code snippet:', err);
        }
    };

    return (
        <div className={cn('prompt-kit-codeblock', className)}>
            <div className="prompt-kit-codeblock-header">
                <span className="prompt-kit-codeblock-lang">
                    {language || 'code'}
                </span>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="prompt-kit-codeblock-copy"
                    title="Copy code"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="prompt-kit-codeblock-pre">
                <code>{code}</code>
            </pre>
        </div>
    );
};
