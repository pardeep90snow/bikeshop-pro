import { createActor } from "@/backend";
import type { Service, ServiceInput } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Static sample data for services (backend interface pending)
const SAMPLE_SERVICES: Service[] = [
  {
    id: 1,
    name: "Essential Tune-Up",
    description:
      "Basic drivetrain lubrication, brake check, and safety inspection.",
    estimatedDurationMinutes: 45,
    basePrice: 45,
  },
  {
    id: 2,
    name: "Precision Brake Service",
    description:
      "Hydraulic brake bleed or cable replacement, pad install & adjustment.",
    estimatedDurationMinutes: 60,
    basePrice: 89,
  },
  {
    id: 3,
    name: "Full Tune-Up Package",
    description:
      "Comprehensive inspection, wheel true, drivetrain clean, full adjustments.",
    estimatedDurationMinutes: 150,
    basePrice: 149,
  },
  {
    id: 4,
    name: "Flat Tyre Repair",
    description:
      "Tube replacement or tyre patch with inflation and safety check.",
    estimatedDurationMinutes: 30,
    basePrice: 25,
  },
  {
    id: 5,
    name: "Electronic Shifting Diagnostic",
    description:
      "Di2 / AXS / Campagnolo EPS system check, firmware update & tuning.",
    estimatedDurationMinutes: 90,
    basePrice: 110,
  },
  {
    id: 6,
    name: "Custom Build Assembly",
    description: "Full frame build from scratch — fork, groupset, wheels, fit.",
    estimatedDurationMinutes: 480,
    basePrice: 350,
  },
];

export function useServices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return SAMPLE_SERVICES;
      try {
        const result = await (
          actor as unknown as { listServices: () => Promise<Service[]> }
        ).listServices();
        return result;
      } catch {
        return SAMPLE_SERVICES;
      }
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateService() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Service, Error, ServiceInput>({
    mutationFn: async (input: ServiceInput) => {
      if (!actor) throw new Error("Not connected");
      try {
        const result = await (
          actor as unknown as {
            addService: (input: ServiceInput) => Promise<Service>;
          }
        ).addService(input);
        return result;
      } catch {
        return { id: Date.now(), ...input };
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
    },
  });
}
