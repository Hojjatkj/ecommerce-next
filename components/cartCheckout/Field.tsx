"use client";

interface FieldProps {
    label: string;
    error?: string;
    children: (invalid: boolean) => React.ReactNode;
}

const Field = ({ label, error, children }: FieldProps) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
            {label}
        </label>
        {children(Boolean(error))}
        {error && (
            <span className="text-xs text-destructive" role="alert">
                {error}
            </span>
        )}
    </div>
);

export const inputClass = (invalid: boolean) =>
    `w-full min-w-0 rounded-lg border bg-card-bg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${invalid
        ? "border-destructive focus:ring-destructive/40"
        : "border-border-main focus:ring-ring"
    }`;

export default Field;
