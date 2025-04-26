import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * AuthMiddleware is a middleware that can be used to handle authentication and authorization for incoming requests.
 * It can be used to check if the user is authenticated and authorized to access the requested resource.
 * If the user is not authenticated or authorized, the middleware can return an error response or redirect the user to a login page.
 * It can also be used to log the request and response data for auditing purposes.
 * The middleware can be used to implement features such as rate limiting, IP whitelisting, and request validation.
 * It can also handle CORS (Cross-Origin Resource Sharing) for the application, allowing or restricting access to resources based on the origin of the request.
 * The middleware can be used to implement features such as authentication, logging, and request transformation.
 * It can also handle load balancing and failover for the microservices, ensuring high availability and reliability.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Here you can implement your authentication and authorization logic
    // For example, you can check if the user is authenticated and authorized to access the requested resource
    // If the user is not authenticated or authorized, you can return an error response or redirect the user to a login page

    // Example of checking if the user is authenticated (pseudo-code):
    // if (!req.isAuthenticated()) {
    //     return res.status(401).send('Unauthorized');
    // }

    if (!req.headers.authorization) {
      // If the authorization header is missing, return a 401 Unauthorized response
      return res
        .status(401)
        .json({ mesgsage: 'Unauthorized token is required' });
    }
    // Here we can validate the token and check if it is valid
    // If the token is invalid, return a 401 Unauthorized response
    next(); // Call the next middleware or route handler in the chain
  }
}
