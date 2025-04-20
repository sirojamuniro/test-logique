import "reflect-metadata";
import request from "supertest";
import express, { Application } from "express";
import { listBookController } from "../../modules/book/controllers/book.controller";
import { listBookService } from "../../modules/book/services/getAll.service";
import { ListResponseBook } from "../../modules/book/dto/list-book.dto";

// Mock service
jest.mock("../../modules/book/services/getAll.service");

const app: Application = express();
app.use(express.json());
// Route untuk testing
app.get("/api/v1/books", listBookController);
describe("GET /api/v1/books - listBookController", () => {

    beforeEach(() => {

        (listBookService as jest.Mock).mockReset();
    });

    it("should return a list of books with status 200", async () => {

        const mockResponse: ListResponseBook = {
            success: true,
            message: "Book list retrieved successfully",
            data: [
                { id: "1", title: "Book Title 1", author: "Author 1", publishedYear: 2021, genres: ["fiction", "adventure"], stock: 10 },
                { id: "2", title: "Book Title 2", author: "Author 2", publishedYear: 2020, genres: ["comedy", "drama"], stock: 5 },
            ],
            Pagination: { skip: 0, take: 10, count: 2 },
        };

        // Mock implementasi service
        (listBookService as jest.Mock).mockResolvedValue(mockResponse);
        const response = await request(app).get("/api/v1/books").query({
            search: "Book",
            publishedYear: 2021,
            genres: "fiction,adventure",
            skip: 0,
            take: 10,
        });

        // Assertions
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponse);
        expect(listBookService).toHaveBeenCalledWith({
            search: "Book",
            publishedYear: "2021",
            genres: "fiction,adventure",
            skip: "0",
            take: "10",
        });
    });

    it("should return 500 if service throws an error", async () => {
        const mockError = new Error("Something went wrong");
        (listBookService as jest.Mock).mockRejectedValue(mockError);
        const response = await request(app).get("/api/v1/books").query({
            search: "Book",
        });

        // Assertions
        expect(response.status).toBe(500);
    });

});