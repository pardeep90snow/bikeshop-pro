import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "bg-accent/15 text-accent border-accent/30",
  },
  completed: {
    label: "Completed",
    className: "bg-primary/10 text-primary border-primary/25",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive border-destructive/25",
  },
} as const;

export function BookingStatusBadge({
  status,
  className,
}: BookingStatusBadgeProps) {
  const kind = status.__kind__ as keyof typeof STATUS_CONFIG;
  const config = STATUS_CONFIG[kind] ?? STATUS_CONFIG.pending;

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-label text-[10px] px-2 py-0.5 capitalize",
        config.className,
        className,
      )}
      data-ocid="booking.status_badge"
    >
      {config.label}
    </Badge>
  );
}
