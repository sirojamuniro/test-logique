import { Not, IsNull, ILike } from "typeorm";
import orm from '../../../config/data-source';
import { Book } from '../../../entities/Book';
import { ParamsIdString } from "../../../schemas/request.schema";
import { BaseResponseCreate } from '../../../schemas/response.schema';


const bookRepo = orm.getRepository(Book);

export async function deleteBookService(
    params: ParamsIdString
): Promise<BaseResponseCreate> {
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

    await bookRepo.softRemove(book);

    const response: BaseResponseCreate = {
        message: 'Book deleted successfully',
        data: book,
    };

    return response;
}

