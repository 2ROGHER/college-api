import { Module } from "@nestjs/common";
import { ProxyController } from "./proxy.controller";


@Module({
    controllers: [ProxyController], // Controllers can be added here as needed
})
export class ProxyModule {
    // This module is responsible for handling incoming requests and routing them to the appropriate microservices.
    // It can be used to implement features such as authentication, logging, and request transformation.
    // It can also handle load balancing and failover for the microservices, ensuring high availability and reliability.
}