import { PageLoader } from "@/components/LoadingSpinner";
import { ServiceCard } from "@/components/ServiceCard";
import { Input } from "@/components/ui/input";
import { useServices } from "@/hooks/useServices";
import { Search } from "lucide-react";
import { useState } from "react";

const BADGES: Record<number, string> = {
  3: "RECOMMENDED",
  5: "NEW",
  6: "PREMIUM",
};

export default function ServicesPage() {
  const { data: services, isLoading } = useServices();
  const [search, setSearch] = useState("");

  const filtered = (services ?? []).filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col" data-ocid="services.page">
      {/* Header */}
      <div className="bg-card border-b border-border py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-label text-primary mb-2">What We Offer</div>
          <h1 className="text-section text-foreground mb-3">
            All Services &amp; Pricing
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Every service listed with transparent pricing. No hidden fees —
            ever.
          </p>
          <div className="relative max-w-sm mx-auto mt-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-ocid="services.search_input"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-background py-12 px-4 sm:px-6 flex-1">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <PageLoader />
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="services.empty_state"
            >
              <p className="text-lg font-medium text-foreground">
                No services found
              </p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  badge={BADGES[service.id]}
                  index={i + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
