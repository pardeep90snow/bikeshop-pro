import Common "common";

module {
  public type BookingId = Common.BookingId;
  public type ServiceId = Common.ServiceId;
  public type Timestamp = Common.Timestamp;

  public type BookingStatus = {
    #pending;
    #completed;
    #cancelled;
  };

  public type BikeDetails = {
    bikeType : Text;
    brand : Text;
    issue : Text;
  };

  public type CustomerInfo = {
    name : Text;
    email : Text;
    phone : Text;
  };

  public type Booking = {
    id : BookingId;
    serviceId : ServiceId;
    date : Text;
    timeSlot : Text;
    bikeDetails : BikeDetails;
    customerInfo : CustomerInfo;
    status : BookingStatus;
    createdAt : Timestamp;
  };

  public type BookingInput = {
    serviceId : ServiceId;
    date : Text;
    timeSlot : Text;
    bikeDetails : BikeDetails;
    customerInfo : CustomerInfo;
  };
};
