import { Static, Type } from "@sinclair/typebox";
export const OrderTypeSchema = Type.Union([Type.Literal("ASC"), Type.Literal("DESC")]);

export const BaseFilterSchema = Type.Object(
    {
        skip: Type.Optional(Type.Number({ default: 0 })),
        take: Type.Optional(Type.Number({ default: 10 })),
        order: Type.Optional(Type.String()),
        orderType: Type.Optional(OrderTypeSchema),
        withDeleted: Type.Optional(Type.Boolean()),
        onlyDeleted: Type.Optional(Type.Boolean()),
    },
    { additionalProperties: true },
);
export type BaseFilter = Static<typeof BaseFilterSchema>;

export const ParamsIdStringSchema = Type.Object({
    id: Type.String(),
});
export type ParamsIdString = Static<typeof ParamsIdStringSchema>;
