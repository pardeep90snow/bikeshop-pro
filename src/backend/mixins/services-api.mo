import List "mo:core/List";
import Types "../types/services";
import ServiceLib "../lib/services";

mixin (
  services : List.List<Types.Service>,
  nextServiceId : { var value : Nat }
) {
  public query func listServices() : async [Types.Service] {
    ServiceLib.listServices(services);
  };

  public query func getService(id : Nat) : async ?Types.Service {
    ServiceLib.getService(services, id);
  };

  public shared func addService(input : Types.ServiceInput) : async Types.Service {
    let svc = ServiceLib.addService(services, nextServiceId.value, input);
    nextServiceId.value += 1;
    svc;
  };

  public shared func updateService(id : Nat, input : Types.ServiceInput) : async ?Types.Service {
    ServiceLib.updateService(services, id, input);
  };

  public shared func deleteService(id : Nat) : async Bool {
    ServiceLib.deleteService(services, id);
  };
};
