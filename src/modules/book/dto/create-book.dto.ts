import { Type, Static } from '@sinclair/typebox';
import { createBaseResponseData } from '../../../schemas/response.schema';

// Request
export const CreateBookRequestSchema = Type.Object({
    title: Type.String({ errorMessage: 'Title must be a string' }),
    author: Type.String({ errorMessage: 'Author must be a string' }),
    publishedYear: Type.Integer({
        minimum: 0,
        errorMessage: 'PublishedYear must be a non-negative integer',
    }),
    genres: Type.Array(Type.String(), {
        minItems: 1,
        errorMessage: 'Genres must be an array of strings with at least one item',
    }),
    stock: Type.Integer({
        minimum: 0,
        errorMessage: 'Stock must be a non-negative integer',
    }),
}, { additionalProperties: false });


export type CreateRequestBook = Static<typeof CreateBookRequestSchema>;

//Response
export const CreateResponseBookSchema = createBaseResponseData(
    Type.Object({
        id: Type.String(),
        title: Type.String(),
        author: Type.String(),
        publishedYear: Type.Integer(),
        genres: Type.Array(Type.String()),
        stock: Type.Integer(),
    })
);

export type CreateResponseBook = Static<typeof CreateResponseBookSchema>;