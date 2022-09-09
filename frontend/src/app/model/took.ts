import { Book } from "./book";

export class Took {
    book: Book;
    // to: Date;
    days:Number;
    // to:String;

    // constructor(book: Book, to: Date)
    // {
    //     this.book = book;
    //     this.to = to;
    // }

    
    // constructor(book: Book, to: String)
    // {
    //     this.book = book;
    //     this.to = to;
    // }
     constructor(book: Book, to: Number)
    {
        this.book = book;
        this.days = to;
    }
}