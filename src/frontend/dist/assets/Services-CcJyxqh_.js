import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as PageLoader } from "./index-GpFbm5So.js";
import { S as ServiceCard } from "./ServiceCard-CiZFKK-v.js";
import { I as Input } from "./input-CZ8MrTAH.js";
import { u as useServices } from "./useServices-CMQRbiaK.js";
import "./badge-D9XobS_G.js";
import "./chevron-right-DBV9y-BF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const BADGES = {
  3: "RECOMMENDED",
  5: "NEW",
  6: "PREMIUM"
};
function ServicesPage() {
  const { data: services, isLoading } = useServices();
  const [search, setSearch] = reactExports.useState("");
  const filtered = (services ?? []).filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "services.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-12 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-label text-primary mb-2", children: "What We Offer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-section text-foreground mb-3", children: "All Services & Pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md mx-auto text-sm", children: "Every service listed with transparent pricing. No hidden fees — ever." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm mx-auto mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search services...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "services.search_input"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background py-12 px-4 sm:px-6 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-20 text-muted-foreground",
        "data-ocid": "services.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-foreground", children: "No services found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Try a different search term" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filtered.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServiceCard,
      {
        service,
        badge: BADGES[service.id],
        index: i + 1
      },
      service.id
    )) }) }) })
  ] });
}
export {
  ServicesPage as default
};
