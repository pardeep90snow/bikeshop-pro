import List "mo:core/List";
import Set "mo:core/Set";
import Types "../types/bookings";
import AdminTypes "../types/admin";
import BookingLib "../lib/bookings";

mixin (
  bookings : List.List<Types.Booking>,
  nextBookingId : { var value : Nat },
  blockedDates : Set.Set<Text>,
  businessHours : { var value : AdminTypes.BusinessHours }
) {
  public query func getAvailableSlots(date : Text) : async [Text] {
    let bh = businessHours.value;
    BookingLib.getAvailableSlots(
      bookings,
      blockedDates,
      bh.openTime,
      bh.closeTime,
      bh.slotDurationMinutes,
      date
    );
  };

  public shared func createBooking(input : Types.BookingInput) : async Types.Booking {
    let booking = BookingLib.createBooking(bookings, nextBookingId.value, input);
    nextBookingId.value += 1;
    booking;
  };
};
