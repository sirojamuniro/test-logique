
import { Not, IsNull, ILike } from "typeorm";
import orm from '../../../config/data-source';
import { Book } from '../../../entities/Book';
import { DetailResponseBook } from '../dto/detail-book.dto';
import { ParamsIdString } from "../../../schemas/request.schema";


const bookRepo = orm.getRepository(Book);

export async function detailBookService(
    params: ParamsIdString
): Promise<DetailResponseBook> {
    const {
        id
    } = params;

    const where: any = {
        ...(id ? { id: id } : {}),
    };

    const book = await bookRepo.findOneOrFail({
        where: [
            {
                ...where,

            },
        ],
    });

    const response: DetailResponseBook = {
        message: 'Book retrieved detail successfully',
        data: book,
    };

    return response;
}

