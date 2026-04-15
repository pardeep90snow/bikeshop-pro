import { createActor } from "@/backend";
import type { BusinessHours } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const DEFAULT_HOURS: BusinessHours = {
  openTime: "09:00",
  closeTime: "17:00",
  slotDurationMinutes: 60,
};

export function useBusinessHours() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BusinessHours>({
    queryKey: ["businessHours"],
    queryFn: async () => {
      if (!actor || isFetching) return DEFAULT_HOURS;
      try {
        return DEFAULT_HOURS;
      } catch {
        return DEFAULT_HOURS;
      }
    },
    enabled: true,
  });
}

export function useUpdateBusinessHours() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, BusinessHours>({
    mutationFn: async (hours: BusinessHours) => {
      if (!actor) throw new Error("Not connected");
      // actor.updateBusinessHours(hours) when backend implements it
      void hours;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["businessHours"] });
    },
  });
}
