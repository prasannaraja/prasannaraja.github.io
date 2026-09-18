import React, { createContext, useContext, useState } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronDown, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepsContextValue {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const StepsContext = createContext<StepsContextValue | null>(null);

export interface StepsProps
    extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const Steps: React.FC<StepsProps> = ({
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    className,
    children,
    ...props
}) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

    const handleOpenChange = (nextOpen: boolean) => {
        if (controlledOpen === undefined) {
            setUncontrolledOpen(nextOpen);
        }
        if (onOpenChange) {
            onOpenChange(nextOpen);
        }
    };

    return (
        <StepsContext.Provider value={{ isOpen, setIsOpen: handleOpenChange }}>
            <CollapsiblePrimitive.Root
                open={isOpen}
                onOpenChange={handleOpenChange}
                className={cn('prompt-kit-steps-root', className)}
                {...props}
            >
                {children}
            </CollapsiblePrimitive.Root>
        </StepsContext.Provider>
    );
};
Steps.displayName = 'Steps';

export interface StepsTriggerProps
    extends React.ComponentPropsWithoutRef<
        typeof CollapsiblePrimitive.CollapsibleTrigger
    > {
    leftIcon?: React.ReactNode;
    swapIconOnHover?: boolean;
}

export const StepsTrigger: React.FC<StepsTriggerProps> = ({
    className,
    children,
    leftIcon,
    ...props
}) => {
    const ctx = useContext(StepsContext);
    const isOpen = ctx?.isOpen ?? false;

    return (
        <CollapsiblePrimitive.CollapsibleTrigger
            className={cn('prompt-kit-steps-trigger', className)}
            {...props}
        >
            <div className="prompt-kit-steps-trigger-left">
                {leftIcon && (
                    <span className="prompt-kit-steps-trigger-icon">
                        {leftIcon}
                    </span>
                )}
                <span className="prompt-kit-steps-trigger-text">{children}</span>
            </div>
            <ChevronDown
                className={cn(
                    'prompt-kit-steps-chevron',
                    isOpen && 'prompt-kit-steps-chevron-open'
                )}
            />
        </CollapsiblePrimitive.CollapsibleTrigger>
    );
};
StepsTrigger.displayName = 'StepsTrigger';

export interface StepsContentProps
    extends React.ComponentPropsWithoutRef<
        typeof CollapsiblePrimitive.CollapsibleContent
    > {
    bar?: React.ReactNode;
}

export const StepsContent: React.FC<StepsContentProps> = ({
    className,
    children,
    bar,
    ...props
}) => {
    const ctx = useContext(StepsContext);
    const isOpen = ctx?.isOpen ?? false;

    if (!isOpen) {
        return null;
    }

    return (
        <CollapsiblePrimitive.CollapsibleContent
            forceMount
            className={cn('prompt-kit-steps-content', className)}
            {...props}
        >
            <div className="prompt-kit-steps-layout">
                <div className="prompt-kit-steps-bar-col">
                    {bar || <StepsBar />}
                </div>
                <div className="prompt-kit-steps-items-container">
                    {children}
                </div>
            </div>
        </CollapsiblePrimitive.CollapsibleContent>
    );
};
StepsContent.displayName = 'StepsContent';

export interface StepsBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const StepsBar: React.FC<StepsBarProps> = ({ className, ...props }) => {
    return <div className={cn('prompt-kit-steps-bar', className)} {...props} />;
};
StepsBar.displayName = 'StepsBar';

export interface StepsItemProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    status?: 'completed' | 'running' | 'pending';
    icon?: React.ReactNode;
    title?: React.ReactNode;
    details?: React.ReactNode;
}

export const StepsItem: React.FC<StepsItemProps> = ({
    className,
    status = 'completed',
    icon,
    title,
    details,
    children,
    ...props
}) => {
    const renderStatusIcon = () => {
        if (icon) return icon;
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
            case 'running':
                return <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />;
            case 'pending':
            default:
                return <Circle className="w-3.5 h-3.5 text-muted-foreground opacity-50" />;
        }
    };

    return (
        <div
            className={cn(
                'prompt-kit-steps-item',
                `prompt-kit-steps-item-${status}`,
                className
            )}
            {...props}
        >
            <div className="prompt-kit-steps-item-header">
                <span className="prompt-kit-steps-item-icon">
                    {renderStatusIcon()}
                </span>
                <div className="prompt-kit-steps-item-content">
                    {title && (
                        <div className="prompt-kit-steps-item-title">{title}</div>
                    )}
                    {details && (
                        <div className="prompt-kit-steps-item-details">
                            {details}
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};
StepsItem.displayName = 'StepsItem';
