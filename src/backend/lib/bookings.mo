import List "mo:core/List";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Types "../types/bookings";

module {
  public type Booking = Types.Booking;
  public type BookingInput = Types.BookingInput;
  public type BookingStatus = Types.BookingStatus;

  public func createBooking(
    bookings : List.List<Booking>,
    nextId : Nat,
    input : BookingInput
  ) : Booking {
    let newBooking : Booking = {
      id = nextId;
      serviceId = input.serviceId;
      date = input.date;
      timeSlot = input.timeSlot;
      bikeDetails = input.bikeDetails;
      customerInfo = input.customerInfo;
      status = #pending;
      createdAt = Time.now();
    };
    bookings.add(newBooking);
    newBooking;
  };

  // Parse "HH:MM" into total minutes since midnight
  func parseMinutes(t : Text) : Nat {
    let arr = t.split(#char ':').toArray();
    if (arr.size() < 2) return 0;
    let h = switch (Nat.fromText(arr[0])) { case (?n) n; case null 0 };
    let m = switch (Nat.fromText(arr[1])) { case (?n) n; case null 0 };
    h * 60 + m;
  };

  // Format total minutes as "HH:MM"
  func formatMinutes(total : Nat) : Text {
    let h = total / 60;
    let m = total % 60;
    let hh = if (h < 10) "0" # h.toText() else h.toText();
    let mm = if (m < 10) "0" # m.toText() else m.toText();
    hh # ":" # mm;
  };

  public func getAvailableSlots(
    bookings : List.List<Booking>,
    blockedDates : Set.Set<Text>,
    openTime : Text,
    closeTime : Text,
    slotDurationMinutes : Nat,
    date : Text
  ) : [Text] {
    if (blockedDates.contains(date)) return [];

    let openMinutes = parseMinutes(openTime);
    let closeMinutes = parseMinutes(closeTime);
    let duration = if (slotDurationMinutes == 0) 30 else slotDurationMinutes;

    // Collect slots already booked for this date (pending or completed)
    let bookedSlots = List.empty<Text>();
    bookings.forEach(func(b) {
      if (b.date == date) {
        switch (b.status) {
          case (#pending) { bookedSlots.add(b.timeSlot) };
          case (#completed) { bookedSlots.add(b.timeSlot) };
          case (#cancelled) {};
        };
      };
    });

    // Build list of all slots, filtering out booked ones
    let slots = List.empty<Text>();
    var current = openMinutes;
    while (current + duration <= closeMinutes) {
      let slot = formatMinutes(current);
      if (bookedSlots.find(func(s : Text) : Bool { s == slot }) == null) {
        slots.add(slot);
      };
      current += duration;
    };
    slots.toArray();
  };

  public func listBookings(
    bookings : List.List<Booking>,
    statusFilter : ?BookingStatus
  ) : [Booking] {
    switch (statusFilter) {
      case null { bookings.toArray() };
      case (?status) {
        bookings.filter(func(b) {
          switch (b.status, status) {
            case (#pending, #pending) true;
            case (#completed, #completed) true;
            case (#cancelled, #cancelled) true;
            case _ false;
          }
        }).toArray();
      };
    };
  };

  public func updateBookingStatus(
    bookings : List.List<Booking>,
    id : Nat,
    newStatus : BookingStatus
  ) : ?Booking {
    var updated : ?Booking = null;
    bookings.mapInPlace(func(b) {
      if (b.id == id) {
        let u : Booking = { b with status = newStatus };
        updated := ?u;
        u;
      } else {
        b;
      }
    });
    updated;
  };

  public func weeklyBookingCount(
    bookings : List.List<Booking>,
    weekStart : Text
  ) : Nat {
    bookings.foldLeft<Nat, Booking>(0, func(acc, b) {
      if (b.date >= weekStart and isWithinWeek(b.date, weekStart)) {
        acc + 1;
      } else {
        acc;
      };
    });
  };

  func isWithinWeek(date : Text, weekStart : Text) : Bool {
    let dParts = date.split(#char '-').toArray();
    let wParts = weekStart.split(#char '-').toArray();
    if (dParts.size() < 3 or wParts.size() < 3) return false;
    if (dParts[0] == wParts[0] and dParts[1] == wParts[1]) {
      let dDay = switch (Nat.fromText(dParts[2])) { case (?n) n; case null 0 };
      let wDay = switch (Nat.fromText(wParts[2])) { case (?n) n; case null 0 };
      dDay >= wDay and dDay < wDay + 7;
    } else {
      false;
    };
  };
};
