import { Not, IsNull, ILike, ArrayOverlap, Any } from "typeorm";
import orm from '../../../config/data-source';
import { Book } from '../../../entities/Book';
import { ListRequestBook, ListResponseBook } from '../dto/list-book.dto';

const bookRepo = orm.getRepository(Book);

export async function listBookService(
    params: ListRequestBook
): Promise<ListResponseBook> {
    const {
        publishedYear,
        skip = 0,
        take = 10,
        withDeleted,
        onlyDeleted,
        order = "createdAt",
        orderType = "ASC",
        search,
    } = params;

    const where: any[] = [];

    if (search) {
        where.push(
            { title: ILike(`%${search}%`) },
            { author: ILike(`%${search}%`) },
            { genres: ArrayOverlap([search]) }
        );
    }

    if (publishedYear) {
        where.push({ publishedYear });
    }

    const [data, count] = await bookRepo.findAndCount({
        where: where.length
            ? where.map((condition) => ({
                ...condition,
                deletedAt: onlyDeleted ? Not(IsNull()) : IsNull(),
            }))
            : { deletedAt: onlyDeleted ? Not(IsNull()) : IsNull() },
        skip,
        take,
        order: {
            [order]: orderType,
        },
        withDeleted,
    });

    const response: ListResponseBook = {
        success: true,
        message: 'Book list retrieved successfully',
        data,
        Pagination: {
            skip,
            take,
            count,
        },
    };

    return response;
}