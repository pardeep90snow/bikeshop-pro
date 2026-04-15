import { PageLoader } from "@/components/LoadingSpinner";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ShieldCheck, Star } from "lucide-react";

const BADGES: Record<number, string> = { 3: "RECOMMENDED", 5: "NEW" };

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    body: "Every service listed with upfront pricing — no hidden fees, no surprises at checkout.",
  },
  {
    icon: Star,
    title: "Expert Mechanics",
    body: "10+ years servicing all bike types: road, MTB, gravel, e-bike, and custom builds.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    body: "Most services completed same-day. Express slots available for urgent repairs.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah K.",
    text: "Booked online, bike was ready in 2 hours. Best mechanic in town — transparent pricing made the decision easy.",
    rating: 5,
  },
  {
    name: "David M.",
    text: "They diagnosed my Di2 issue in 20 minutes. Honest, skilled, and genuinely passionate about bikes.",
    rating: 5,
  },
  {
    name: "Priya L.",
    text: "Showed up with a mystery creak and left with a perfectly tuned gravel bike. These guys are the real deal.",
    rating: 5,
  },
];

export default function HomePage() {
  const { data: services, isLoading } = useServices();
  const featured = services?.slice(0, 4) ?? [];

  return (
    <div className="flex flex-col" data-ocid="home.page">
      {/* Hero */}
      <section
        className="relative min-h-[78vh] flex items-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-mechanic.dim_1400x800.jpg')",
        }}
        data-ocid="home.hero_section"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-xl">
            <div className="text-label text-primary mb-4 tracking-widest">
              Expert Bike Care
            </div>
            <h1 className="text-hero text-foreground leading-[1.1] mb-5">
              Expert Bike Repair
              <br />
              <span className="text-primary">&amp; Service</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
              Trusted mechanics, transparent pricing, and unparalleled quality
              for your cycling experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/book"
                search={{ serviceId: undefined }}
                data-ocid="home.hero_cta_button"
              >
                <Button
                  size="lg"
                  className="btn-primary gap-2 text-base px-7 py-3"
                >
                  Schedule Your Service
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services" data-ocid="home.view_services_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted text-base px-7 py-3"
                >
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section
        className="bg-background py-16 px-4 sm:px-6"
        data-ocid="home.services_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-label text-primary mb-2">Our Services</div>
            <h2 className="text-section text-foreground">
              Popular Services &amp; Pricing
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">
              All prices listed upfront. No surprises. No hidden fees.
            </p>
          </div>
          {isLoading ? (
            <PageLoader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  badge={BADGES[service.id]}
                  index={i + 1}
                />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/services" data-ocid="home.all_services_link">
              <Button
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/5 gap-2"
              >
                See All Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section
        className="bg-muted/40 py-16 px-4 sm:px-6"
        data-ocid="home.features_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-label text-accent mb-2">Why The Spokesman</div>
            <h2 className="text-section text-foreground">
              Bike Care You Can Trust
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="card-lifted p-6 flex flex-col gap-3"
                data-ocid={`home.feature_card.${f.title.toLowerCase().replace(/\s+/g, "_")}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="bg-background py-16 px-4 sm:px-6"
        data-ocid="home.testimonials_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-label text-accent mb-2">Customer Reviews</div>
            <h2 className="text-section text-foreground">What Riders Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="card-lifted p-5 flex flex-col gap-3"
                data-ocid={`home.testimonial.${t.name.toLowerCase().replace(/\s+/g, "_")}`}
              >
                <div className="flex gap-0.5">
                  {t.rating === 5 && (
                    <>
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <Star className="w-4 h-4 fill-accent text-accent" />
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{t.text}"
                </p>
                <div className="text-sm font-medium text-foreground mt-auto">
                  — {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="bg-primary py-14 px-4 sm:px-6"
        data-ocid="home.cta_section"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary-foreground mb-4 tracking-tight">
            Ready to Ride Perfectly?
          </h2>
          <p className="text-primary-foreground/80 mb-7 text-base">
            Book your service online in under 2 minutes. Pick your slot,
            describe the issue, and we'll handle the rest.
          </p>
          <Link
            to="/book"
            search={{ serviceId: undefined }}
            data-ocid="home.bottom_cta_button"
          >
            <Button
              size="lg"
              className="bg-card text-primary hover:bg-card/90 font-semibold gap-2 px-8 py-3 text-base"
            >
              Book Your Appointment
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
