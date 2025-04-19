import orm from '../../../config/data-source';
import { Book } from '../../../entities/Book';
import { ParamsIdString } from "../../../schemas/request.schema";
import { CreateRequestBook, CreateResponseBook } from "../dto/create-book.dto";

const bookRepo = orm.getRepository(Book);

export async function updateBookService(
    params: ParamsIdString,
    body: CreateRequestBook
): Promise<CreateResponseBook> {
    const { id } = params;

    const book = await bookRepo.findOneOrFail({
        where: { id },
    });

    bookRepo.merge(book, body);
    const updatedBook = await bookRepo.save(book);

    const response: CreateResponseBook = {
        message: 'Book updated successfully',
        data: updatedBook,
    };

    return response;
}

