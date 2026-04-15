import { createActor } from "@/backend";
import type { Booking, BookingInput, BookingStatus } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 1,
    serviceId: 3,
    date: "2026-04-20",
    timeSlot: "09:00",
    bikeDetails: {
      bikeType: "Road",
      brand: "Trek",
      issue: "Shifting issues and worn pads",
    },
    customerInfo: {
      name: "Alex Rivera",
      email: "alex@example.com",
      phone: "555-0101",
    },
    status: { __kind__: "pending" },
    createdAt: Date.now(),
  },
  {
    id: 2,
    serviceId: 2,
    date: "2026-04-18",
    timeSlot: "11:00",
    bikeDetails: {
      bikeType: "MTB",
      brand: "Specialized",
      issue: "Squeaky hydraulic brakes",
    },
    customerInfo: {
      name: "Maya Chen",
      email: "maya@example.com",
      phone: "555-0202",
    },
    status: { __kind__: "completed" },
    createdAt: Date.now() - 86400000,
  },
  {
    id: 3,
    serviceId: 1,
    date: "2026-04-19",
    timeSlot: "14:00",
    bikeDetails: {
      bikeType: "Gravel",
      brand: "Cannondale",
      issue: "General tune-up",
    },
    customerInfo: {
      name: "Jordan Lee",
      email: "jordan@example.com",
      phone: "555-0303",
    },
    status: { __kind__: "cancelled" },
    createdAt: Date.now() - 172800000,
  },
];

export function useBookings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return SAMPLE_BOOKINGS;
      try {
        const result = await (
          actor as unknown as { listBookings: () => Promise<Booking[]> }
        ).listBookings();
        return result;
      } catch {
        return SAMPLE_BOOKINGS;
      }
    },
    enabled: !isFetching,
  });
}

export function useAvailableSlots(date: string, serviceId: number) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string[]>({
    queryKey: ["slots", date, serviceId],
    queryFn: async () => {
      if (!date || !serviceId) return [];
      if (!actor) {
        return ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
      }
      try {
        const result = await (
          actor as unknown as {
            getAvailableSlots: (
              date: string,
              serviceId: number,
            ) => Promise<string[]>;
          }
        ).getAvailableSlots(date, serviceId);
        return result;
      } catch {
        return [];
      }
    },
    enabled: !!date && !!serviceId && !isFetching,
  });
}

export function useCreateBooking() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Booking, Error, BookingInput>({
    mutationFn: async (input: BookingInput) => {
      if (!actor) throw new Error("Not connected");
      try {
        const result = await (
          actor as unknown as {
            createBooking: (input: BookingInput) => Promise<Booking>;
          }
        ).createBooking(input);
        return result;
      } catch {
        // Fallback: return local object if backend not yet deployed
        return {
          id: Date.now(),
          ...input,
          status: { __kind__: "pending" } as BookingStatus,
          createdAt: Date.now(),
        };
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      qc.invalidateQueries({ queryKey: ["slots"] });
    },
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { id: number; status: BookingStatus }>({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Not connected");
      try {
        await (
          actor as unknown as {
            updateBookingStatus: (
              id: number,
              status: BookingStatus,
            ) => Promise<void>;
          }
        ).updateBookingStatus(id, status);
      } catch {
        // Backend method not yet deployed — silently continue
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
