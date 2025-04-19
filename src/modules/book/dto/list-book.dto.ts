
import { Static, Type } from '@sinclair/typebox';
import { BaseFilterSchema } from '../../../schemas/request.schema';
import { createBaseResponseDataPagination } from '../../../schemas/response.schema';

//Request
export const ListBookRequestSchema = Type.Intersect([
    BaseFilterSchema,
    Type.Object({
        search: Type.Optional(Type.String()),
        publishedYear: Type.Optional(Type.Integer({
            minimum: 0,
            errorMessage: 'PublishedYear must be a non-negative integer',
        })),
        genres: Type.Optional(Type.String()),
    }, { additionalProperties: true }),
]);
export type ListRequestBook = Static<typeof ListBookRequestSchema>;

//Response
export const ListResponseBookSchema = createBaseResponseDataPagination(
    Type.Array(
        Type.Object({
            id: Type.String(),
            title: Type.String(),
            author: Type.String(),
            publishedYear: Type.Integer(),
            genres: Type.Array(Type.String()),
            stock: Type.Integer(),
        })
    )
);
export type ListResponseBook = Static<typeof ListResponseBookSchema>;

