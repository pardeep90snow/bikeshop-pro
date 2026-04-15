import Common "common";

module {
  public type ServiceId = Common.ServiceId;

  public type Service = {
    id : ServiceId;
    name : Text;
    description : Text;
    estimatedDurationMinutes : Nat;
    basePrice : Float;
  };

  public type ServiceInput = {
    name : Text;
    description : Text;
    estimatedDurationMinutes : Nat;
    basePrice : Float;
  };
};
