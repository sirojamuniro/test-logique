import { Static, Type, TSchema } from "@sinclair/typebox";

export const BaseResponseSchema = Type.Object({
    message: Type.String(),
});
export type ResponseBase = Static<typeof BaseResponseSchema>;

export const createBaseResponseData = <T extends TSchema>(t: T) =>
    Type.Intersect([
        BaseResponseSchema,
        Type.Object({
            data: t,
        }),
    ]);

export const PaginationSchema = Type.Object({
    skip: Type.Optional(Type.Number()),
    take: Type.Optional(Type.Number()),
    count: Type.Optional(Type.Number()),
    items: Type.Optional(Type.Number()),
    totalPage: Type.Optional(Type.Number()),
});
export type Pagination = Static<typeof PaginationSchema>;

export const createBaseResponseDataList = <T extends TSchema>(t: T) => createBaseResponseData(t);

export const createBaseResponseDataPagination = <T extends TSchema>(t: T) =>
    Type.Intersect([
        createBaseResponseData(t),
        Type.Object({
            Pagination: PaginationSchema,
        }),
    ]);

export const BaseResponseCreateSchema = createBaseResponseData(
    Type.Object({ id: Type.String() }, { additionalProperties: true }),
);
export type BaseResponseCreate = Static<typeof BaseResponseCreateSchema>;
