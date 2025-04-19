import { Router } from 'express';
import { createBookController, detailBookController, deleteBookController, listBookController, updateBookController } from '../../../modules/book/controllers/book.controller';

const BookRouter = Router();

BookRouter.post('/', createBookController);
BookRouter.get('/', listBookController);
BookRouter.get('/:id', detailBookController);
BookRouter.put('/:id', updateBookController);
BookRouter.delete('/:id', deleteBookController);

export default BookRouter;