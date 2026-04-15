import { BookingStatusBadge } from "@/components/BookingStatusBadge";
import { PageLoader } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBusinessHours } from "@/hooks/useAdmin";
import { useBookings, useUpdateBookingStatus } from "@/hooks/useBookings";
import { useServices } from "@/hooks/useServices";
import type { Booking, BookingStatus } from "@/types";
import { formatPrice } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Bike, CalendarDays, Clock, Lock, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function BookingRow({
  booking,
  index,
  serviceName,
  price,
}: {
  booking: Booking;
  index: number;
  serviceName: string;
  price: number;
}) {
  const updateStatus = useUpdateBookingStatus();

  async function handleStatus(status: BookingStatus) {
    try {
      await updateStatus.mutateAsync({ id: booking.id, status });
      toast.success("Booking status updated");
    } catch {
      toast.error("Failed to update status");
    }
  }

  return (
    <div
      className="card-lifted p-5 space-y-3"
      data-ocid={`admin.booking_item.${index}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display font-bold text-foreground text-base">
            {serviceName}
          </div>
          <div className="text-label text-accent text-[10px] mt-0.5">
            {formatPrice(price)}
          </div>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          <span className="truncate">{booking.customerInfo.name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>{booking.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{booking.timeSlot}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Bike className="w-3.5 h-3.5" />
          <span className="truncate">
            {booking.bikeDetails.brand} ({booking.bikeDetails.bikeType})
          </span>
        </div>
      </div>

      {booking.bikeDetails.issue && (
        <p className="text-xs text-muted-foreground border-t border-border pt-2 line-clamp-2">
          "{booking.bikeDetails.issue}"
        </p>
      )}

      {booking.status.__kind__ === "pending" && (
        <div className="flex gap-2 pt-1">
          <Button
            type="button"
            size="sm"
            className="btn-primary text-xs py-1.5 flex-1"
            onClick={() => handleStatus({ __kind__: "completed" })}
            disabled={updateStatus.isPending}
            data-ocid={`admin.complete_button.${index}`}
          >
            Mark Complete
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs py-1.5 flex-1 border-destructive/40 text-destructive hover:bg-destructive/5"
            onClick={() => handleStatus({ __kind__: "cancelled" })}
            disabled={updateStatus.isPending}
            data-ocid={`admin.cancel_button.${index}`}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { isAuthenticated, login } = useInternetIdentity();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();
  const { data: services } = useServices();
  const { data: hours } = useBusinessHours();
  const [activeTab, setActiveTab] = useState("pending");

  // Auth gate — only logged-in users can access admin
  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center"
        data-ocid="admin.auth_gate"
      >
        <div className="bg-card border border-border rounded-2xl p-10 max-w-sm w-full shadow-sm">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-display font-bold text-foreground mb-2">
            Admin Access Required
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in with Internet Identity to manage bookings and services.
          </p>
          <Button
            className="btn-primary w-full"
            onClick={() => login()}
            data-ocid="admin.login_button"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const getServiceName = (id: number) =>
    services?.find((s) => s.id === id)?.name ?? "Unknown Service";
  const getServicePrice = (id: number) =>
    services?.find((s) => s.id === id)?.basePrice ?? 0;

  const filtered = (bookings ?? []).filter((b) =>
    activeTab === "all" ? true : b.status.__kind__ === activeTab,
  );

  const stats = {
    pending: (bookings ?? []).filter((b) => b.status.__kind__ === "pending")
      .length,
    completed: (bookings ?? []).filter((b) => b.status.__kind__ === "completed")
      .length,
    cancelled: (bookings ?? []).filter((b) => b.status.__kind__ === "cancelled")
      .length,
  };

  if (bookingsLoading) return <PageLoader />;

  return (
    <div className="flex flex-col" data-ocid="admin.page">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 sm:px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-label text-primary mb-1">Dashboard</div>
          <h1 className="text-section text-foreground">Admin Dashboard</h1>
          {hours && (
            <p className="text-muted-foreground text-sm mt-2">
              Business hours: {hours.openTime} — {hours.closeTime} &nbsp;|&nbsp;
              Slot duration: {hours.slotDurationMinutes} min
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-muted/30 border-b border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
          {[
            { label: "Pending", value: stats.pending, color: "text-accent" },
            {
              label: "Completed",
              value: stats.completed,
              color: "text-primary",
            },
            {
              label: "Cancelled",
              value: stats.cancelled,
              color: "text-destructive",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card-lifted p-4 text-center"
              data-ocid={`admin.stat_card.${stat.label.toLowerCase()}`}
            >
              <div className={`text-3xl font-display font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings */}
      <div className="bg-background flex-1 px-4 sm:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            data-ocid="admin.bookings_tabs"
          >
            <TabsList className="mb-6" data-ocid="admin.status_tab_list">
              <TabsTrigger value="pending" data-ocid="admin.pending_tab">
                Pending ({stats.pending})
              </TabsTrigger>
              <TabsTrigger value="completed" data-ocid="admin.completed_tab">
                Completed ({stats.completed})
              </TabsTrigger>
              <TabsTrigger value="cancelled" data-ocid="admin.cancelled_tab">
                Cancelled ({stats.cancelled})
              </TabsTrigger>
              <TabsTrigger value="all" data-ocid="admin.all_tab">
                All
              </TabsTrigger>
            </TabsList>

            {["pending", "completed", "cancelled", "all"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                {filtered.length === 0 ? (
                  <div
                    className="text-center py-16 text-muted-foreground"
                    data-ocid="admin.empty_state"
                  >
                    <p className="text-base font-medium text-foreground">
                      No bookings here
                    </p>
                    <p className="text-sm mt-1">
                      New appointments will appear once booked online
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((booking, i) => (
                      <BookingRow
                        key={booking.id}
                        booking={booking}
                        index={i + 1}
                        serviceName={getServiceName(booking.serviceId)}
                        price={getServicePrice(booking.serviceId)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
