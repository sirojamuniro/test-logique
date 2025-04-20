// src/middleware/notFoundHandler.middleware.ts (Contoh penamaan file)

import { Request, Response, NextFunction } from 'express';

export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {

    const error: any = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;

    next(error);
}