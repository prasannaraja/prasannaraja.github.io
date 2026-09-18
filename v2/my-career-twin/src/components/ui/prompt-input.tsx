import React, { forwardRef, useEffect, useRef } from 'react';
import { ArrowUp, Square } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PromptInputProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const PromptInput = forwardRef<HTMLDivElement, PromptInputProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('prompt-kit-input-container', className)}
                {...props}
            >
                <div className="prompt-kit-input-pill">{children}</div>
            </div>
        );
    }
);
PromptInput.displayName = 'PromptInput';

export interface PromptInputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    maxHeight?: number;
    onSubmit?: () => void;
}

export const PromptInputTextarea = forwardRef<
    HTMLTextAreaElement,
    PromptInputTextareaProps
>(
    (
        { className, maxHeight = 160, onSubmit, onKeyDown, onChange, ...props },
        ref
    ) => {
        const internalRef = useRef<HTMLTextAreaElement | null>(null);

        const adjustHeight = () => {
            const textarea = internalRef.current;
            if (textarea) {
                textarea.style.height = 'auto';
                const newHeight = Math.min(textarea.scrollHeight, maxHeight);
                textarea.style.height = `${newHeight}px`;
            }
        };

        useEffect(() => {
            adjustHeight();
        }, [props.value]);

        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (onSubmit) {
                    onSubmit();
                }
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        };

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            adjustHeight();
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <textarea
                ref={(node) => {
                    internalRef.current = node;
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        ref.current = node;
                    }
                }}
                rows={1}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                className={cn('prompt-kit-textarea', className)}
                {...props}
            />
        );
    }
);
PromptInputTextarea.displayName = 'PromptInputTextarea';

export interface PromptInputActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const PromptInputActions = forwardRef<
    HTMLDivElement,
    PromptInputActionsProps
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('prompt-kit-actions-toolbar', className)}
            {...props}
        >
            {children}
        </div>
    );
});
PromptInputActions.displayName = 'PromptInputActions';

export interface PromptInputActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'ghost' | 'pill' | 'circle';
    tooltip?: string;
}

export const PromptInputAction = forwardRef<
    HTMLButtonElement,
    PromptInputActionProps
>(
    (
        { className, variant = 'circle', tooltip, title, children, ...props },
        ref
    ) => {
        const variantClass =
            variant === 'pill'
                ? 'prompt-kit-action-pill'
                : variant === 'ghost'
                  ? 'prompt-kit-action-ghost'
                  : 'prompt-kit-action-circle';

        return (
            <button
                ref={ref}
                type="button"
                title={tooltip || title}
                className={cn('prompt-kit-action-btn', variantClass, className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);
PromptInputAction.displayName = 'PromptInputAction';

export interface PromptInputSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export const PromptInputSubmit = forwardRef<
    HTMLButtonElement,
    PromptInputSubmitProps
>(({ className, isLoading, disabled, children, ...props }, ref) => {
    return (
        <button
            ref={ref}
            type="button"
            disabled={disabled || isLoading}
            className={cn('prompt-kit-submit-btn', className)}
            aria-label={isLoading ? 'Loading' : 'Send message'}
            {...props}
        >
            {children ||
                (isLoading ? (
                    <Square className="w-3.5 h-3.5 fill-current animate-pulse" />
                ) : (
                    <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                ))}
        </button>
    );
});
PromptInputSubmit.displayName = 'PromptInputSubmit';
