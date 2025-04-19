import { Request, Response, NextFunction } from 'express';
import { CreateRequestBook, CreateResponseBook, ListRequestBook, ListResponseBook, DetailResponseBook } from '../dto';
import { BaseResponseCreate } from '../../../schemas/response.schema';
import {
    createBookService,
    listBookService,
    detailBookService,
    updateBookService,
    deleteBookService
} from '../services';
import { ParamsIdString } from '../../../schemas/request.schema';

// POST /books
export async function createBookController(
    req: Request<{}, CreateResponseBook, CreateRequestBook>,
    res: Response<CreateResponseBook>,
    next: NextFunction
): Promise<void> {
    try {
        const payload = req.body;
        const result = await createBookService(payload);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

// GET /books
export async function listBookController(
    req: Request<{}, ListResponseBook, {}, ListRequestBook>,
    res: Response<ListResponseBook>,
    next: NextFunction
): Promise<void> {
    try {
        const query = req.query;
        const result = await listBookService(query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

// GET /books/:id
export async function detailBookController(
    req: Request<ParamsIdString, DetailResponseBook>,
    res: Response<DetailResponseBook>,
    next: NextFunction
): Promise<void> {
    try {
        const params = req.params;
        const result = await detailBookService(params);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

// PATCH /books/:id
export async function updateBookController(
    req: Request<ParamsIdString, CreateResponseBook, CreateRequestBook>,
    res: Response<CreateResponseBook>,
    next: NextFunction
): Promise<void> {
    try {
        const params = req.params;
        const payload = req.body;
        const result = await updateBookService(params, payload);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

// DELETE /books/:id
export async function deleteBookController(
    req: Request<ParamsIdString, BaseResponseCreate>,
    res: Response<BaseResponseCreate>,
    next: NextFunction
): Promise<void> {
    try {
        const params = req.params;
        const result = await deleteBookService(params);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}