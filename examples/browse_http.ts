import { browse } from "../src/dns_sd/browse.ts";
import { DriverDeno } from "../src/mdns/driver_deno.ts";
import { MulticastInterface } from "../src/mdns/multicast_interface.ts";

console.log("Browsing for local HTTP services...");

for await (
  const service of browse({
    multicastInterface: new MulticastInterface(new DriverDeno("IPv4")),
    service: {
      protocol: "tcp",
      type: "http",
      subtypes: [],
    },
  })
) {
  if (service.isActive) {
    console.log(`📡 ${service.name} - ${service.host}:${service.port}`);
  }
}
