import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, B as Button, P as PageLoader } from "./index-GpFbm5So.js";
import { S as ServiceCard } from "./ServiceCard-CiZFKK-v.js";
import { u as useServices } from "./useServices-CMQRbiaK.js";
import { C as Clock } from "./badge-D9XobS_G.js";
import "./chevron-right-DBV9y-BF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const BADGES = { 3: "RECOMMENDED", 5: "NEW" };
const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    body: "Every service listed with upfront pricing — no hidden fees, no surprises at checkout."
  },
  {
    icon: Star,
    title: "Expert Mechanics",
    body: "10+ years servicing all bike types: road, MTB, gravel, e-bike, and custom builds."
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    body: "Most services completed same-day. Express slots available for urgent repairs."
  }
];
const TESTIMONIALS = [
  {
    name: "Sarah K.",
    text: "Booked online, bike was ready in 2 hours. Best mechanic in town — transparent pricing made the decision easy.",
    rating: 5
  },
  {
    name: "David M.",
    text: "They diagnosed my Di2 issue in 20 minutes. Honest, skilled, and genuinely passionate about bikes.",
    rating: 5
  },
  {
    name: "Priya L.",
    text: "Showed up with a mystery creak and left with a perfectly tuned gravel bike. These guys are the real deal.",
    rating: 5
  }
];
function HomePage() {
  const { data: services, isLoading } = useServices();
  const featured = (services == null ? void 0 : services.slice(0, 4)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[78vh] flex items-center bg-cover bg-center overflow-hidden",
        style: {
          backgroundImage: "url('/assets/generated/hero-mechanic.dim_1400x800.jpg')"
        },
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-label text-primary mb-4 tracking-widest", children: "Expert Bike Care" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-hero text-foreground leading-[1.1] mb-5", children: [
              "Expert Bike Repair",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "& Service" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md", children: "Trusted mechanics, transparent pricing, and unparalleled quality for your cycling experience." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/book",
                  search: { serviceId: void 0 },
                  "data-ocid": "home.hero_cta_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "btn-primary gap-2 text-base px-7 py-3",
                      children: [
                        "Schedule Your Service",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", "data-ocid": "home.view_services_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "border-border text-foreground hover:bg-muted text-base px-7 py-3",
                  children: "View All Services"
                }
              ) })
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-16 px-4 sm:px-6",
        "data-ocid": "home.services_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-label text-primary mb-2", children: "Our Services" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-section text-foreground", children: "Popular Services & Pricing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-md mx-auto text-sm", children: "All prices listed upfront. No surprises. No hidden fees." })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: featured.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ServiceCard,
            {
              service,
              badge: BADGES[service.id],
              index: i + 1
            },
            service.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", "data-ocid": "home.all_services_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "border-primary/40 text-primary hover:bg-primary/5 gap-2",
              children: [
                "See All Services",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/40 py-16 px-4 sm:px-6",
        "data-ocid": "home.features_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-label text-accent mb-2", children: "Why The Spokesman" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-section text-foreground", children: "Bike Care You Can Trust" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-lifted p-6 flex flex-col gap-3",
              "data-ocid": `home.feature_card.${f.title.toLowerCase().replace(/\s+/g, "_")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg", children: f.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: f.body })
              ]
            },
            f.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-16 px-4 sm:px-6",
        "data-ocid": "home.testimonials_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-label text-accent mb-2", children: "Customer Reviews" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-section text-foreground", children: "What Riders Say" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: TESTIMONIALS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-lifted p-5 flex flex-col gap-3",
              "data-ocid": `home.testimonial.${t.name.toLowerCase().replace(/\s+/g, "_")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: t.rating === 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-accent text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-accent text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-accent text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-accent text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-accent text-accent" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed italic", children: [
                  '"',
                  t.text,
                  '"'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium text-foreground mt-auto", children: [
                  "— ",
                  t.name
                ] })
              ]
            },
            t.name
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-primary py-14 px-4 sm:px-6",
        "data-ocid": "home.cta_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-primary-foreground mb-4 tracking-tight", children: "Ready to Ride Perfectly?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 mb-7 text-base", children: "Book your service online in under 2 minutes. Pick your slot, describe the issue, and we'll handle the rest." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/book",
              search: { serviceId: void 0 },
              "data-ocid": "home.bottom_cta_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "bg-card text-primary hover:bg-card/90 font-semibold gap-2 px-8 py-3 text-base",
                  children: [
                    "Book Your Appointment",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}
export {
  HomePage as default
};
