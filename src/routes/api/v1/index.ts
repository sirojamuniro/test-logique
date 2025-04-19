import { Router } from 'express';
// Import router buku yang sebenarnya dari file yang benar
import bookRouter from '../v1/books'; // <--- Perbaiki path impor di sini!

const routes = Router();

routes.use('/books', bookRouter);


export default routes;