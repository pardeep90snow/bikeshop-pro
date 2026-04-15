import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const SIZE_MAP = {
  sm: "w-4 h-4 border-2",
  md: "w-7 h-7 border-2",
  lg: "w-12 h-12 border-[3px]",
};

export function LoadingSpinner({
  size = "md",
  className,
  label = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
      aria-label={label}
      data-ocid="loading_state"
    >
      <div
        className={cn(
          "rounded-full border-primary/20 border-t-primary animate-spin",
          SIZE_MAP[size],
        )}
      />
      {size === "lg" && (
        <p className="text-sm text-muted-foreground animate-pulse">{label}</p>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div
      className="flex-1 flex items-center justify-center min-h-[40vh]"
      data-ocid="page.loading_state"
    >
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  );
}
