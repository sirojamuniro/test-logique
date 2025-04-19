import "reflect-metadata";
import request from "supertest";
import express, { Application } from "express";
import { updateBookController } from "../../modules/book/controllers/book.controller";
import { updateBookService } from "../../modules/book/services";

jest.mock("../../modules/book/services");

const app: Application = express();
app.use(express.json());
app.patch("/api/v1/books/:id", updateBookController);

describe("PATCH /api/v1/books/:id - updateBookController", () => {
    beforeEach(() => {
        (updateBookService as jest.Mock).mockReset();
    });

    it("should update a book and return status 200", async () => {
        const mockRequest = {
            title: "Updated Book",
            stock: 15,
        };

        const mockResponse = {
            message: "Book updated successfully",
            data: { id: "1", ...mockRequest },
        };

        (updateBookService as jest.Mock).mockResolvedValue(mockResponse);

        const response = await request(app).patch("/api/v1/books/1").send(mockRequest);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponse);
        expect(updateBookService).toHaveBeenCalledWith({ id: "1" }, mockRequest);
    });

    it("should return 500 if service throws an error", async () => {
        const mockError = new Error("Something went wrong");
        (updateBookService as jest.Mock).mockRejectedValue(mockError);

        const response = await request(app).patch("/api/v1/books/1").send({
            title: "Updated Book",
        });

        expect(response.status).toBe(500);
    });
});