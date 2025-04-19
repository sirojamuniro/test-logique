
import { Static, Type } from '@sinclair/typebox';
import { CreateResponseBookSchema } from './create-book.dto';

//Response

export type DetailResponseBook = Static<typeof CreateResponseBookSchema>;

