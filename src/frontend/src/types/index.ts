export type Timestamp = number;
export type ServiceId = number;
export type BookingId = number;

export interface Service {
  id: ServiceId;
  name: string;
  description: string;
  estimatedDurationMinutes: number;
  basePrice: number;
}

export interface ServiceInput {
  name: string;
  description: string;
  estimatedDurationMinutes: number;
  basePrice: number;
}

export type BookingStatus =
  | { __kind__: "pending" }
  | { __kind__: "completed" }
  | { __kind__: "cancelled" };

export interface BikeDetails {
  bikeType: string;
  brand: string;
  issue: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: BookingId;
  serviceId: ServiceId;
  date: string;
  timeSlot: string;
  bikeDetails: BikeDetails;
  customerInfo: CustomerInfo;
  status: BookingStatus;
  createdAt: Timestamp;
}

export interface BookingInput {
  serviceId: ServiceId;
  date: string;
  timeSlot: string;
  bikeDetails: BikeDetails;
  customerInfo: CustomerInfo;
}

export interface BusinessHours {
  openTime: string;
  closeTime: string;
  slotDurationMinutes: number;
}

export function formatBookingStatus(status: BookingStatus): string {
  return status.__kind__;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} mins`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} hr ${m} mins` : `${h} hr${h > 1 ? "s" : ""}`;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(0)}`;
}
