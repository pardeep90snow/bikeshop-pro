import List "mo:core/List";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Types "../types/bookings";
import AdminTypes "../types/admin";
import BookingLib "../lib/bookings";

mixin (
  bookings : List.List<Types.Booking>,
  blockedDates : Set.Set<Text>,
  businessHours : { var value : AdminTypes.BusinessHours }
) {
  public query func listBookings(statusFilter : ?Types.BookingStatus) : async [Types.Booking] {
    BookingLib.listBookings(bookings, statusFilter);
  };

  public shared func updateBookingStatus(id : Nat, newStatus : Types.BookingStatus) : async ?Types.Booking {
    BookingLib.updateBookingStatus(bookings, id, newStatus);
  };

  public shared func setBusinessHours(hours : AdminTypes.BusinessHours) : async () {
    businessHours.value := hours;
  };

  public shared func blockDate(date : Text) : async () {
    blockedDates.add(date);
  };

  public shared func unblockDate(date : Text) : async () {
    blockedDates.remove(date);
  };

  public query func getWeeklyStats(weekStart : Text) : async AdminTypes.WeeklyStats {
    {
      weekStart;
      bookingCount = BookingLib.weeklyBookingCount(bookings, weekStart);
    };
  };

  public query func getBusinessHours() : async AdminTypes.BusinessHours {
    businessHours.value;
  };

  public query func getBlockedDates() : async [Text] {
    blockedDates.toArray();
  };
};
