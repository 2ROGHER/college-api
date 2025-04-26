import { All, Controller, HttpException, Req, Res } from "@nestjs/common";
import axios from "axios";
import { Response, Request } from "express";
/**
 * ProxyController is responsible for handling incoming requests and routing them to the appropriate microservices.
    * It acts as a gateway to the microservices, allowing for centralized management of requests and responses.
    * The controller can be used to implement features such as authentication, logging, and request transformation.
    * It can also handle load balancing and failover for the microservices, ensuring high availability and reliability.
 */
@Controller()
export class ProxyController {
    /**
     * This intercept all routes and forward them to the appropriate microservice.
     * The routes are defined in the microservices and can be accessed through the API Gateway.
     */
    @All("*") // Intercept all HTTP methods and all routes
    async proxy(@Req() req: Request, @Res() res: Response) {
        // Here you can implement the logic to forward the request to the appropriate microservice
        // For example, you can use a library like axios or fetch to make the request to the microservice
        // and then send the response back to the client.

        // Example of forwarding the request to a microservice (pseudo-code):
        // const response = await axios({
        //     method: req.method,
        //     url: `http://microservice-url${req.url}`,
        //     data: req.body,
        //     headers: req.headers,
        // });
        // res.status(response.status).send(response.data);
        const path = req.path;
        const serviceURL = this.resolveServiceURL(path); // Resolve the service URL based on the path
        const method = req.method.toLowerCase(); // Get the HTTP method (GET, POST, etc.) // optinal

        try {
            const response = await axios({
                method: req.method as any, // Cast to any to avoid TypeScript error
                url: `${serviceURL}${path}`, // Construct the URL for the microservice
                data: req.body, // Forward the request body
                headers: req.headers, // Forward the request headers  to microservice
                params: req.query, // Forward the query parameters // [optional]

            });
            res.status(response.status).send(response.data); // Send the response [back] to the client the response by the microservice
        } catch (error) {
            throw new HttpException(
                error.response?.data || "Internal Server Error into Gateway", // Send the error response from the microservice or a default error message
                error.response?.status || 500, // Send the error response from the microservice or a default error message
            );
            
        }

    }

    /**
     * This method resolves the service URL based on the request path.
     * You can implement your own logic to determine the service URL based on the path.
     * @param path - The path of the request to resolve the service URL.
     * @returns 
     */
    private resolveServiceURL(path: string): string {
        if (path.startsWith("/auth")) return process.env.AUTH_SERVICE_URL || "http://localhost:8001"; // Auth service URL
        if (path.startsWith("/students")) return process.env.USER_SERVICE_URL || "http://localhost:8002"; // User service URL
        if (path.startsWith("/courses")) return process.env.COURSE_SERVICE_URL || "http://localhost:8003"; // Course service URL
        if (path.startsWith("/payments")) return process.env.PAYMENT_SERVICE_URL || "http://localhost:8004"; // Payment service URL

        if (path.startsWith("/notifications")) return process.env.NOTIFICATION_SERVICE_URL || "http://localhost:8005"; // Notification service URL
        if (path.startsWith("/professors")) return process.env.PROFESSOR_SERVICE_URL || "http://localhost:8006"; // Professor service URL
        // TODO("Add more services here"); // Add more services here as needed
        throw new Error(`No service found for path: ${path}`); // Throw an error if no service is found for the path
        // return "http://localhost:8000"; // Default service URL (if needed)

    }
}