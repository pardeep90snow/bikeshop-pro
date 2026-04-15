import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types";
import { formatDuration, formatPrice } from "@/types";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  badge?: string;
  index?: number;
}

export function ServiceCard({ service, badge, index = 1 }: ServiceCardProps) {
  return (
    <div
      className="card-lifted flex flex-col p-5 gap-3 group"
      data-ocid={`services.item.${index}`}
    >
      {badge && (
        <div className="flex justify-end -mt-1 -mb-1">
          <Badge
            variant="outline"
            className="text-label text-[10px] bg-accent/10 text-accent border-accent/30 px-2 py-0.5"
            data-ocid={`services.badge.${index}`}
          >
            {badge}
          </Badge>
        </div>
      )}

      <div>
        <h3 className="font-display font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-smooth">
          {service.name}
        </h3>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-3xl font-display font-bold text-primary">
            {formatPrice(service.basePrice)}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            Est. {formatDuration(service.estimatedDurationMinutes)}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {service.description}
      </p>

      <Link
        to="/book"
        search={{ serviceId: service.id }}
        data-ocid={`services.book_button.${index}`}
      >
        <Button
          variant="outline"
          size="sm"
          className="w-full border-primary/40 text-primary hover:bg-primary/5 font-medium group/btn transition-smooth"
        >
          Book Now
          <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-smooth" />
        </Button>
      </Link>
    </div>
  );
}
