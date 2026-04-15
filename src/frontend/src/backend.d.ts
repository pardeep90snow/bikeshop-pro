import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ServiceId = bigint;
export type BookingId = bigint;
export interface WeeklyStats {
    weekStart: string;
    bookingCount: bigint;
}
export type Timestamp = bigint;
export interface ServiceInput {
    estimatedDurationMinutes: bigint;
    name: string;
    description: string;
    basePrice: number;
}
export interface BookingInput {
    customerInfo: CustomerInfo;
    date: string;
    bikeDetails: BikeDetails;
    serviceId: ServiceId;
    timeSlot: string;
}
export interface BusinessHours {
    slotDurationMinutes: bigint;
    closeTime: string;
    openTime: string;
}
export interface BikeDetails {
    bikeType: string;
    brand: string;
    issue: string;
}
export interface Service {
    id: ServiceId;
    estimatedDurationMinutes: bigint;
    name: string;
    description: string;
    basePrice: number;
}
export interface Booking {
    id: BookingId;
    customerInfo: CustomerInfo;
    status: BookingStatus;
    date: string;
    createdAt: Timestamp;
    bikeDetails: BikeDetails;
    serviceId: ServiceId;
    timeSlot: string;
}
export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed"
}
export interface backendInterface {
    addService(input: ServiceInput): Promise<Service>;
    blockDate(date: string): Promise<void>;
    createBooking(input: BookingInput): Promise<Booking>;
    deleteService(id: bigint): Promise<boolean>;
    getAvailableSlots(date: string): Promise<Array<string>>;
    getBlockedDates(): Promise<Array<string>>;
    getBusinessHours(): Promise<BusinessHours>;
    getService(id: bigint): Promise<Service | null>;
    getWeeklyStats(weekStart: string): Promise<WeeklyStats>;
    listBookings(statusFilter: BookingStatus | null): Promise<Array<Booking>>;
    listServices(): Promise<Array<Service>>;
    setBusinessHours(hours: BusinessHours): Promise<void>;
    unblockDate(date: string): Promise<void>;
    updateBookingStatus(id: bigint, newStatus: BookingStatus): Promise<Booking | null>;
    updateService(id: bigint, input: ServiceInput): Promise<Service | null>;
}
