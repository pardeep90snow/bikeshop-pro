import { j as jsxRuntimeExports, L as Link, B as Button } from "./index-GpFbm5So.js";
import { B as Badge, C as Clock } from "./badge-D9XobS_G.js";
import { f as formatPrice, a as formatDuration } from "./useServices-CMQRbiaK.js";
import { C as ChevronRight } from "./chevron-right-DBV9y-BF.js";
function ServiceCard({ service, badge, index = 1 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-lifted flex flex-col p-5 gap-3 group",
      "data-ocid": `services.item.${index}`,
      children: [
        badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end -mt-1 -mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-label text-[10px] bg-accent/10 text-accent border-accent/30 px-2 py-0.5",
            "data-ocid": `services.badge.${index}`,
            children: badge
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-smooth", children: service.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-bold text-primary", children: formatPrice(service.basePrice) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
              "Est. ",
              formatDuration(service.estimatedDurationMinutes)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed flex-1", children: service.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/book",
            search: { serviceId: service.id },
            "data-ocid": `services.book_button.${index}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "w-full border-primary/40 text-primary hover:bg-primary/5 font-medium group/btn transition-smooth",
                children: [
                  "Book Now",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-smooth" })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  ServiceCard as S
};
