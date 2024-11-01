/**
 * This code defines a custom exception filter in a NestJS application, 
 * designed to intercept and handle errors or exceptions that occur during request processing. 
 * It catches HttpException and potentially other exceptions to provide a detailed, consistent error response to the client
 */
/**
 * 
 *Imports required components and types from the @nestjs/common library:
 *1-ArgumentsHost: Provides access to the context, allowing access to HTTP request and response.
 *2-Catch: A decorator to mark this class as an exception filter.
 *3-ExceptionFilter: Interface that this class implements, which requires the implementation of a catch method.
 *4-HttpException: Base exception class for handling HTTP-specific errors.
 *5-HttpStatus: Provides HTTP status codes.
 *6-ValidationError: Represents validation errors, typically coming from class-validator.
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, ValidationError } from "@nestjs/common";
/**
 * @Catch(HttpException): Specifies that this filter will intercept instances of HttpException. 
 * It could be modified to handle other exception types.
 * in short:it will Catch the HttpException class or any other exception class you want to handle
 */
@Catch( HttpException )   
/**
 * GenericExceptionFilter: The class name for the filter, which implements ExceptionFilter. 
 * By implementing ExceptionFilter, this class must include a catch method to handle exceptions.
 */
export class GenericExceptionFilter implements ExceptionFilter { 
    /**
     * @param exception The HttpException instance (or potentially other errors) that was thrown.
     * @param host The ArgumentsHost instance, providing access to the HTTP context.
     */
    catch(exception: HttpException, host: ArgumentsHost) { 
        //Switches the context to HTTP mode to allow access to HTTP-specific objects. 
        const ctx = host.switchToHttp();
        //References the HTTP response object, used to send back a structured error response.
        const response = ctx.getResponse();
        //References the HTTP request object, allowing access to properties like the URL
        const request = ctx.getRequest();
        /**
         * Checks if exception is an instance of HttpException. If true, it retrieves the exception’s status code via exception.getStatus(). 
         * Otherwise, defaults to HttpStatus.INTERNAL_SERVER_ERROR (code 500).
         */
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        /**
         * Similar logic to status, but retrieves a custom error message from exception.getResponse() 
         * or defaults to a generic 'Internal server error'.
         */
        const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
        // A dictionary to store validation errors (if present).
        let validationErrors:Record<string, string>;
        /**
         * Checks if cause is an array, implying it contains validation errors. 
         * If validation errors are present:
         * It initializes an empty object, validationErrors.
         * Loops through ValidationError objects in exception.cause to store the first error message for each property.
         * Example Result: { "username": "Username is required", "email": "Invalid email format" }
         */
        if(Array.isArray(exception.cause) && exception.cause.length > 0){
            validationErrors = {};
            const errors = exception.cause as ValidationError[];
            errors.forEach((error) => {
                validationErrors[error.property] = Object.values(error.constraints)[0];
            });
        }
        else{
            validationErrors = {};
        }
        /**
         * errorResponse: Constructs a structured JSON response for the client. It includes:
         * statusCode: HTTP status determined earlier.
         * error: Exception’s class name, representing the error type.
         * stack: Stack trace of the exception (useful for debugging; consider omitting in production).
         * timestamp: The exact time of the error.
         * path: URL path where the exception occurred.
         * message: Error message, either custom or default.
         * validationErrors: Dictionary of validation errors if present, otherwise an empty object.
         */
        const errorResponse = {
            statusCode: status,
            error: exception.name,
            stack: exception.stack,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
            validationErrors,
        };
        // console.error(exception): Logs the exception to the console for debugging.
        console.error(exception);
        // Sends the structured errorResponse object back to the client, using the HTTP status code set earlier.
        response.status(status).json(errorResponse);
    }}
/**
 * NOTE:
 * inside the main.ts file, we have to import this class and add it to the global filters
 * and also add the validation pipe.
 * ------------------------------------------------------------------------------------
 * app.useGlobalPipes(
 *    new ValidationPipe({
 *        exceptionFactory: (errors) => new BadRequestException('invalid data', { cause: errors }),
 *    })
 * );
 * app.useGlobalFilters(new GenericExceptionFilter());
 * -------------------------------------------------------------------------------------
 * NOTE:
 * to throw  an exception to that filter, 
 * we can use the throw new HttpException('message', statusCode) 
 * or the throw new BadRequestException('message', { cause: [{property: 'email', constraints:['Email is used']}] })
 * or the throw new NotFoundException('message')
 * or the throw new UnauthorizedException('message')
 * or the throw new ForbiddenException('message')
 * or the throw new InternalServerErrorException('message')
 * or the throw new BadGatewayException('message')
 * --------------------------------------------------------------------------------------
 *
 */