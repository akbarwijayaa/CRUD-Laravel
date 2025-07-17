import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Moon } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    useAppearance(); // Keep the hook call

    // Only show dark mode option and make it always selected
    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'dark', icon: Moon, label: 'Dark' },
    ];

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-900 p-1 dark:bg-neutral-800', className)} {...props}>
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    disabled={true} // Disable the button
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors cursor-not-allowed',
                        'bg-neutral-900 shadow-xs dark:bg-neutral-700 dark:text-neutral-100', // Always selected style
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
