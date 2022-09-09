import { Book } from "./book";

export class Returned {
    book: Book;
    taken:Number;
    returned: Number;
     constructor(book: Book, taken: Number, returned: Number)
    {
        this.book = book;
        this.taken = taken;
        this.returned = returned;
    }
}