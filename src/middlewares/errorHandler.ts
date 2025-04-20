import { Request, Response, NextFunction } from 'express';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from "typeorm";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    console.error("Error caught by handler:", err);

    let statusCode = 500;
    let message = 'Internal Server Error';
    let errors: string[] | any = [];

    if (err instanceof EntityNotFoundError) {
        statusCode = 404; // Not Found
        message = err.message || 'Entity not found';
        errors = [message];
    }
    else if (err instanceof QueryFailedError) {

        statusCode = 400;
        message = 'Database query failed';
        if (err.driverError && (err.driverError.code === '23505' || err.driverError.constraint)) {
            statusCode = 409;
            message = 'Data integrity constraint violation (e.g., duplicate entry)';

            errors = [err.message];
        } else {

            statusCode = 500;
            message = 'Internal Database Error';

            errors = [message];
        }

    }
    else if (err instanceof TypeORMError) {

        statusCode = 500;
        message = 'A TypeORM operation failed';
        errors = [err.message];
    }
    else {
        statusCode = err.status || statusCode;

        if (err.error && err.error.details && Array.isArray(err.error.details)) {

            statusCode = 400;
            message = 'Validation Failed';
            errors = err.error.details.map((detail: any) => detail.message.replace(/"/g, ''));
        }
        else if (Array.isArray(err.errors)) {
            statusCode = err.status || 400;
            message = 'Multiple errors occurred';
            errors = err.errors.map((e: any) => (e.message || e).toString());
        }
        else if (err.message) {

            message = err.message;

            errors = [message];
        }
        else {

            message = 'An unexpected error occurred';
            errors = [message];
        }
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        errors: (Array.isArray(errors) && errors.length === 1 && errors[0] === message) ? undefined : errors

    });
}