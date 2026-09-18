import React, { useState } from 'react';
import { ChevronDown, Sparkles, Database, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Steps, StepsTrigger, StepsContent, StepsItem } from './steps';

export interface SourceCitation {
    title: string;
    company?: string;
    similarity?: string;
}

export interface ReasoningProps {
    className?: string;
    sources?: SourceCitation[];
    model?: string;
    category?: string;
    durationMs?: number;
    isStreaming?: boolean;
}

export const Reasoning: React.FC<ReasoningProps> = ({
    className,
    sources = [],
    model = 'gemini-2.5-flash',
    category,
    isStreaming = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!sources || sources.length === 0) {
        return null;
    }

    return (
        <div className={cn('prompt-kit-reasoning-root', className)}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="prompt-kit-reasoning-trigger"
                aria-expanded={isOpen}
            >
                <Sparkles className="sparkle-icon" />
                <span>Grounding & Context Sources ({sources.length})</span>
                <ChevronDown className={cn('chevron-icon', isOpen && 'open')} />
            </button>

            {isOpen && (
                <div className="prompt-kit-reasoning-content">
                    <div className="reasoning-meta-row">
                        <span className="reasoning-meta-item">
                            <Database />
                            Model: {model}
                        </span>
                        {category && (
                            <span className="reasoning-category-badge">
                                {category}
                            </span>
                        )}
                        {isStreaming && (
                            <span className="reasoning-streaming-badge">
                                <Globe />
                                Live RAG
                            </span>
                        )}
                    </div>

                    <div className="reasoning-sources-list">
                        {sources.map((src, idx) => (
                            <div key={idx} className="reasoning-source-item">
                                <div className="reasoning-source-title">
                                    📌 {src.title}
                                    {src.company && (
                                        <span className="reasoning-source-company">
                                            ({src.company})
                                        </span>
                                    )}
                                </div>
                                {src.similarity && (
                                    <span className="reasoning-source-sim">
                                        {src.similarity}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    <Steps defaultOpen={false} className="mt-2">
                        <StepsTrigger
                            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                        >
                            Pipeline Execution Trace
                        </StepsTrigger>
                        <StepsContent>
                            <StepsItem
                                status="completed"
                                title="Intent & Domain Classification"
                                details={`Target domain: ${category || 'Full-Stack & Architecture'}`}
                            />
                            <StepsItem
                                status="completed"
                                title="Vector Store Retrieval"
                                details={`Indexed and matched ${sources.length} ground truth nodes`}
                            />
                            <StepsItem
                                status="completed"
                                title="Digital Twin Persona Synthesis"
                                details={`Grounded response generated using ${model}`}
                            />
                        </StepsContent>
                    </Steps>
                </div>
            )}
        </div>
    );
};
