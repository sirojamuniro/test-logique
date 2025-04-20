import "reflect-metadata";
import request from "supertest";
import express, { Application } from "express";
import { deleteBookController } from "../../modules/book/controllers/book.controller";
import { deleteBookService } from "../../modules/book/services";

jest.mock("../../modules/book/services");

const app: Application = express();
app.use(express.json());
app.delete("/api/v1/books/:id", deleteBookController);

describe("DELETE /api/v1/books/:id - deleteBookController", () => {
    beforeEach(() => {
        (deleteBookService as jest.Mock).mockReset();
    });

    it("should delete a book and return status 200", async () => {
        const mockResponse = {
            success: true,
            message: "Book deleted successfully",
        };

        (deleteBookService as jest.Mock).mockResolvedValue(mockResponse);

        const response = await request(app).delete("/api/v1/books/39141a56-c5bd-48e4-a542-eab9dee3431f");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponse);
        expect(deleteBookService).toHaveBeenCalledWith({ id: "39141a56-c5bd-48e4-a542-eab9dee3431f" });
    });

    it("should return 500 if service throws an error", async () => {
        const mockError = new Error("Something went wrong");
        (deleteBookService as jest.Mock).mockRejectedValue(mockError);

        const response = await request(app).delete("/api/v1/books/39141a56-c5bd-48e4-a542-eab9dee3431f");

        expect(response.status).toBe(500);
    });
});