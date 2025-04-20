import "reflect-metadata";
import request from "supertest";
import express, { Application } from "express";
import { detailBookController } from "../../modules/book/controllers/book.controller";
import { detailBookService } from "../../modules/book/services";

jest.mock("../../modules/book/services");

const app: Application = express();
app.use(express.json());
app.get("/api/v1/books/:id", detailBookController);

describe("GET /api/v1/books/:id - detailBookController", () => {
    beforeEach(() => {
        (detailBookService as jest.Mock).mockReset();
    });

    it("should return a book by ID with status 200", async () => {
        const mockResponse = {
            success: true,
            message: "Book retrieved successfully",
            data: {
                id: "39141a56-c5bd-48e4-a542-eab9dee3431f",
                title: "Book Title",
                author: "Author Name",
                publishedYear: 2021,
                genres: ["fiction", "adventure"],
                stock: 10,
            },
        };

        (detailBookService as jest.Mock).mockResolvedValue(mockResponse);

        const response = await request(app).get("/api/v1/books/39141a56-c5bd-48e4-a542-eab9dee3431f");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponse);
        expect(detailBookService).toHaveBeenCalledWith({ id: "39141a56-c5bd-48e4-a542-eab9dee3431f" });
    });

    it("should return 500 if service throws an error", async () => {
        const mockError = new Error("Something went wrong");
        (detailBookService as jest.Mock).mockRejectedValue(mockError);

        const response = await request(app).get("/api/v1/books/39141a56-c5bd-48e4-a542-eab9dee3431f");

        expect(response.status).toBe(500);
    });
});