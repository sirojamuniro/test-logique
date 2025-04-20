import orm from '../../../config/data-source';
import { Book } from '../../../entities/Book';
import { CreateRequestBook, CreateResponseBook } from '../dto/create-book.dto';

const bookRepo = orm.getRepository(Book);

export async function createBookService(
    body: CreateRequestBook
): Promise<CreateResponseBook> {
    const newBook = bookRepo.create(body);
    const saved = await bookRepo.save(newBook);

    const response: CreateResponseBook = {
        success: true,
        message: 'Book created successfully',
        data: saved,
    };

    return response;
}
