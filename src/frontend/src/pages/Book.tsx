import { PageLoader } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAvailableSlots, useCreateBooking } from "@/hooks/useBookings";
import { useServices } from "@/hooks/useServices";
import { formatDuration, formatPrice } from "@/types";
import type { BikeDetails, CustomerInfo } from "@/types";
import { useSearch } from "@tanstack/react-router";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BIKE_TYPES = [
  "Road",
  "Mountain",
  "Gravel",
  "City/Hybrid",
  "E-Bike",
  "BMX",
  "Other",
];
const STEPS = [
  "Select Service",
  "Your Bike",
  "Your Details",
  "Pick a Slot",
  "Confirm",
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div
      className="flex items-center justify-center gap-1.5 mb-8"
      aria-label="Booking steps"
    >
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-1.5">
          <div
            className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-smooth ${
              i < current
                ? "bg-primary text-primary-foreground"
                : i === current
                  ? "bg-primary/15 text-primary border-2 border-primary"
                  : "bg-muted text-muted-foreground"
            }`}
            data-ocid={`book.step_indicator.${i + 1}`}
          >
            {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-6 h-px ${i < current ? "bg-primary" : "bg-border"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookPage() {
  const search = useSearch({ from: "/book" });
  const { data: services, isLoading } = useServices();
  const createBooking = useCreateBooking();

  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<number>(search.serviceId ?? 0);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [bikeDetails, setBikeDetails] = useState<BikeDetails>({
    bikeType: "",
    brand: "",
    issue: "",
  });
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { data: slots, isLoading: slotsLoading } = useAvailableSlots(
    date,
    serviceId,
  );
  const selectedService = services?.find((s) => s.id === serviceId);

  const minDate = new Date().toISOString().split("T")[0];

  async function handleSubmit() {
    if (!serviceId || !date || !timeSlot) return;
    try {
      await createBooking.mutateAsync({
        serviceId,
        date,
        timeSlot,
        bikeDetails,
        customerInfo,
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (isLoading) return <PageLoader />;

  if (submitted) {
    return (
      <div
        className="flex-1 flex items-center justify-center px-4 py-20 bg-background"
        data-ocid="book.success_state"
      >
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-9 h-9 text-primary" />
          </div>
          <h2 className="text-section text-foreground mb-3">
            Booking Confirmed!
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your service appointment has been received. We'll reach out to
            confirm the details.
          </p>
          <div className="card-lifted p-5 text-left mb-6 text-sm space-y-2">
            <div>
              <span className="text-muted-foreground">Service:</span>{" "}
              <span className="font-medium text-foreground">
                {selectedService?.name}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Date:</span>{" "}
              <span className="font-medium text-foreground">{date}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Time:</span>{" "}
              <span className="font-medium text-foreground">{timeSlot}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Name:</span>{" "}
              <span className="font-medium text-foreground">
                {customerInfo.name}
              </span>
            </div>
          </div>
          <Button
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              setServiceId(0);
              setDate("");
              setTimeSlot("");
            }}
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/5"
            data-ocid="book.new_booking_button"
          >
            Book Another Service
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 bg-background py-10 px-4 sm:px-6"
      data-ocid="book.page"
    >
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-2">
          <div className="text-label text-primary mb-1">Online Booking</div>
          <h1 className="text-section text-foreground">Schedule a Service</h1>
          <p className="text-muted-foreground text-sm mt-2 mb-6">
            Simple, transparent booking — no account required
          </p>
        </div>

        <StepIndicator current={step} />

        <div className="card-lifted p-6 md:p-8">
          {/* Step 0 — Select Service */}
          {step === 0 && (
            <div className="space-y-4" data-ocid="book.select_service_step">
              <h2 className="font-display font-bold text-lg text-foreground mb-4">
                Choose Your Service
              </h2>
              <div className="grid gap-3">
                {(services ?? []).map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    data-ocid={`book.service_option.${s.id}`}
                    className={`w-full text-left border rounded-lg px-4 py-3.5 transition-smooth ${
                      serviceId === s.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/40 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground text-sm">
                          {s.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {formatDuration(s.estimatedDurationMinutes)}
                        </div>
                      </div>
                      <div className="font-display font-bold text-primary text-lg">
                        {formatPrice(s.basePrice)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 — Bike Details */}
          {step === 1 && (
            <div className="space-y-4" data-ocid="book.bike_details_step">
              <h2 className="font-display font-bold text-lg text-foreground mb-4">
                About Your Bike
              </h2>
              <div className="space-y-1.5">
                <Label htmlFor="bikeType">Bike Type</Label>
                <Select
                  value={bikeDetails.bikeType}
                  onValueChange={(v) =>
                    setBikeDetails((p) => ({ ...p, bikeType: v }))
                  }
                >
                  <SelectTrigger
                    id="bikeType"
                    data-ocid="book.bike_type_select"
                  >
                    <SelectValue placeholder="Select bike type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {BIKE_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="brand">Brand / Model</Label>
                <Input
                  id="brand"
                  placeholder="e.g. Trek Domane, Specialized Stumpjumper"
                  value={bikeDetails.brand}
                  onChange={(e) =>
                    setBikeDetails((p) => ({ ...p, brand: e.target.value }))
                  }
                  data-ocid="book.bike_brand_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="issue">Describe the Issue</Label>
                <textarea
                  id="issue"
                  rows={3}
                  placeholder="What's happening? Any noises, symptoms, or specific repairs needed?"
                  value={bikeDetails.issue}
                  onChange={(e) =>
                    setBikeDetails((p) => ({ ...p, issue: e.target.value }))
                  }
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-smooth"
                  data-ocid="book.bike_issue_textarea"
                />
              </div>
            </div>
          )}

          {/* Step 2 — Customer Info */}
          {step === 2 && (
            <div className="space-y-4" data-ocid="book.customer_info_step">
              <h2 className="font-display font-bold text-lg text-foreground mb-4">
                Your Contact Details
              </h2>
              <div className="space-y-1.5">
                <Label htmlFor="custName">Full Name</Label>
                <Input
                  id="custName"
                  placeholder="Alex Rivera"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="book.customer_name_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="custEmail">Email Address</Label>
                <Input
                  id="custEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo((p) => ({ ...p, email: e.target.value }))
                  }
                  data-ocid="book.customer_email_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="custPhone">Phone Number</Label>
                <Input
                  id="custPhone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo((p) => ({ ...p, phone: e.target.value }))
                  }
                  data-ocid="book.customer_phone_input"
                />
              </div>
            </div>
          )}

          {/* Step 3 — Pick Slot */}
          {step === 3 && (
            <div className="space-y-4" data-ocid="book.pick_slot_step">
              <h2 className="font-display font-bold text-lg text-foreground mb-4">
                Choose Date &amp; Time
              </h2>
              <div className="space-y-1.5">
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setTimeSlot("");
                  }}
                  data-ocid="book.date_input"
                />
              </div>
              {date && (
                <div className="space-y-2">
                  <Label>Available Time Slots</Label>
                  {slotsLoading ? (
                    <p className="text-sm text-muted-foreground">
                      Loading slots...
                    </p>
                  ) : (
                    <div
                      className="grid grid-cols-3 gap-2"
                      data-ocid="book.time_slots_grid"
                    >
                      {(slots ?? []).map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setTimeSlot(slot)}
                          data-ocid={`book.time_slot.${slot.replace(":", "")}`}
                          className={`py-2 text-sm rounded-lg border transition-smooth font-medium ${
                            timeSlot === slot
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-foreground hover:border-primary/40 hover:bg-muted"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 4 — Confirm */}
          {step === 4 && (
            <div className="space-y-4" data-ocid="book.confirm_step">
              <h2 className="font-display font-bold text-lg text-foreground mb-4">
                Confirm Your Booking
              </h2>
              <div className="bg-muted/40 rounded-lg p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-semibold text-foreground">
                    {selectedService?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold text-primary">
                    {selectedService
                      ? formatPrice(selectedService.basePrice)
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">
                    {selectedService
                      ? formatDuration(selectedService.estimatedDurationMinutes)
                      : "—"}
                  </span>
                </div>
                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">{date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium text-foreground">
                      {timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bike</span>
                    <span className="font-medium text-foreground">
                      {bikeDetails.brand} ({bikeDetails.bikeType})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium text-foreground">
                      {customerInfo.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-foreground">
                      {customerInfo.email}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                By confirming, you agree to our cancellation policy. You can
                cancel or reschedule up to 24 hours before your appointment.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                className="gap-1.5"
                data-ocid="book.back_button"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
            ) : (
              <div />
            )}
            {step < STEPS.length - 1 ? (
              <Button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={
                  (step === 0 && !serviceId) ||
                  (step === 1 &&
                    (!bikeDetails.bikeType ||
                      !bikeDetails.brand ||
                      !bikeDetails.issue)) ||
                  (step === 2 &&
                    (!customerInfo.name ||
                      !customerInfo.email ||
                      !customerInfo.phone)) ||
                  (step === 3 && (!date || !timeSlot))
                }
                className="btn-primary gap-1.5"
                data-ocid="book.next_button"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={createBooking.isPending}
                className="btn-primary"
                data-ocid="book.submit_button"
              >
                {createBooking.isPending ? "Confirming..." : "Confirm Booking"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
