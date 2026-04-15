module {
  public type BusinessHours = {
    openTime : Text;
    closeTime : Text;
    slotDurationMinutes : Nat;
  };

  public type WeeklyStats = {
    weekStart : Text;
    bookingCount : Nat;
  };
};
