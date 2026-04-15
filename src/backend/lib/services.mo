import List "mo:core/List";
import Types "../types/services";

module {
  public type Service = Types.Service;
  public type ServiceInput = Types.ServiceInput;

  public func listServices(
    services : List.List<Service>
  ) : [Service] {
    services.toArray();
  };

  public func getService(
    services : List.List<Service>,
    id : Nat
  ) : ?Service {
    services.find(func(s) { s.id == id });
  };

  public func addService(
    services : List.List<Service>,
    nextId : Nat,
    input : ServiceInput
  ) : Service {
    let newService : Service = {
      id = nextId;
      name = input.name;
      description = input.description;
      estimatedDurationMinutes = input.estimatedDurationMinutes;
      basePrice = input.basePrice;
    };
    services.add(newService);
    newService;
  };

  public func updateService(
    services : List.List<Service>,
    id : Nat,
    input : ServiceInput
  ) : ?Service {
    var updated : ?Service = null;
    services.mapInPlace(func(s) {
      if (s.id == id) {
        let u : Service = {
          id = s.id;
          name = input.name;
          description = input.description;
          estimatedDurationMinutes = input.estimatedDurationMinutes;
          basePrice = input.basePrice;
        };
        updated := ?u;
        u;
      } else {
        s;
      }
    });
    updated;
  };

  public func deleteService(
    services : List.List<Service>,
    id : Nat
  ) : Bool {
    let sizeBefore = services.size();
    let filtered = services.filter(func(s) { s.id != id });
    services.clear();
    services.append(filtered);
    services.size() < sizeBefore;
  };

  // Pre-seed sample bike services
  public func seedServices(services : List.List<Service>, nextId : { var value : Nat }) {
    if (services.size() > 0) return;
    let samples : [ServiceInput] = [
      {
        name = "Basic Tune-Up";
        description = "Complete adjustment of gears, brakes, and cables. Includes safety check and minor adjustments.";
        estimatedDurationMinutes = 60;
        basePrice = 45.00;
      },
      {
        name = "Flat Tire Repair";
        description = "Patch or replace inner tube, inspect tyre for damage, re-inflate to correct pressure.";
        estimatedDurationMinutes = 30;
        basePrice = 20.00;
      },
      {
        name = "Brake Adjustment";
        description = "Adjust brake pads and cables for optimal stopping power on both wheels.";
        estimatedDurationMinutes = 30;
        basePrice = 25.00;
      },
      {
        name = "Full Service";
        description = "Complete overhaul including drivetrain clean and lube, wheel true, brake & gear tune, full safety inspection.";
        estimatedDurationMinutes = 180;
        basePrice = 120.00;
      },
    ];
    for (input in samples.values()) {
      let newService : Service = {
        id = nextId.value;
        name = input.name;
        description = input.description;
        estimatedDurationMinutes = input.estimatedDurationMinutes;
        basePrice = input.basePrice;
      };
      services.add(newService);
      nextId.value += 1;
    };
  };
};
