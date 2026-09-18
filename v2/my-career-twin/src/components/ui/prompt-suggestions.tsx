import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PromptSuggestionItem {
    label: string;
    prompt: string;
    icon?: React.ReactNode;
}

export interface PromptSuggestionsProps {
    suggestions: PromptSuggestionItem[];
    onSelect: (prompt: string) => void;
    className?: string;
}

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({
    suggestions,
    onSelect,
    className,
}) => {
    if (!suggestions || suggestions.length === 0) {
        return null;
    }

    return (
        <div className={cn('prompt-kit-suggestions', className)}>
            {suggestions.map((item, idx) => (
                <button
                    key={idx}
                    type="button"
                    onClick={() => onSelect(item.prompt)}
                    className="prompt-kit-suggestion-chip"
                >
                    {item.icon || <Sparkles />}
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
};
