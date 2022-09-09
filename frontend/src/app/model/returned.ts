import { Book } from "./book";

export class Returned {
    book: Book;
    taken:Date;
    returned: Date;
     constructor(book: Book, taken: Date, returned: Date)
    {
        this.book = book;
        this.taken = taken;
        this.returned = returned;
    }
}