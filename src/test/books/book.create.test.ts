import "reflect-metadata";
import request from "supertest";
import express, { Application } from "express";
import { createBookController } from "../../modules/book/controllers/book.controller";
import { createBookService } from "../../modules/book/services";
import { CreateResponseBook } from "../../modules/book/dto";

jest.mock("../../modules/book/services");

const app: Application = express();
app.use(express.json());
app.post("/api/v1/books", createBookController);

describe("POST /api/v1/books - createBookController", () => {
    beforeEach(() => {
        (createBookService as jest.Mock).mockReset();
    });

    it("should create a book and return status 201", async () => {
        const mockRequest = {
            title: "New Book",
            author: "Author Name",
            publishedYear: 2023,
            genres: ["fiction", "adventure"],
            stock: 10,
        };

        const mockResponse: CreateResponseBook = {
            message: "Book created successfully",
            data: { id: "39141a56-c5bd-48e4-a542-eab9dee3431f", ...mockRequest },
        };

        (createBookService as jest.Mock).mockResolvedValue(mockResponse);

        const response = await request(app).post("/api/v1/books").send(mockRequest);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockResponse);
        expect(createBookService).toHaveBeenCalledWith(mockRequest);
    });

    it("should return 500 if service throws an error", async () => {
        const mockError = new Error("Something went wrong");
        (createBookService as jest.Mock).mockRejectedValue(mockError);

        const response = await request(app).post("/api/v1/books").send({
            title: "New Book",
        });

        expect(response.status).toBe(500);
    });
});