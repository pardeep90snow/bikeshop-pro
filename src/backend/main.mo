import List "mo:core/List";
import Set "mo:core/Set";
import BookingTypes "types/bookings";
import ServiceTypes "types/services";
import AdminTypes "types/admin";
import ServicesMixin "mixins/services-api";
import BookingsMixin "mixins/bookings-api";
import AdminMixin "mixins/admin-api";
import ServiceLib "lib/services";

actor {
  let services = List.empty<ServiceTypes.Service>();
  let nextServiceId = { var value : Nat = 1 };

  let bookings = List.empty<BookingTypes.Booking>();
  let nextBookingId = { var value : Nat = 1 };

  let blockedDates = Set.empty<Text>();
  let businessHours = {
    var value : AdminTypes.BusinessHours = {
      openTime = "09:00";
      closeTime = "17:00";
      slotDurationMinutes = 30;
    };
  };

  // Pre-seed sample services on first run
  do {
    ServiceLib.seedServices(services, nextServiceId);
  };

  include ServicesMixin(services, nextServiceId);
  include BookingsMixin(bookings, nextBookingId, blockedDates, businessHours);
  include AdminMixin(bookings, blockedDates, businessHours);
};
