import { Book } from "./book";

export class Took {
    book: Book;
    days:Number;
    extended: Boolean;
     constructor(book: Book, to: Number, extended: Boolean)
    {
        this.book = book;
        this.days = to;
        this.extended = extended;
    }
}