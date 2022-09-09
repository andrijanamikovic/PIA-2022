import { Book } from "./book";

export class Took {
    book: Book;
    days:Number;
     constructor(book: Book, to: Number)
    {
        this.book = book;
        this.days = to;
    }
}