import express, { response } from "express"
import { TakenModel } from "../model/taken";
import { BookModel} from "../model/book";
import { UserModel } from "../model/user";
import { ReviewBookModel } from "../model/booksRewie";


export class BooksController {

    getAllBooksSorted = (req: express.Request, res: express.Response) => {
        BookModel.find({}, (err, books) => {
            if (err) console.log(err);
            else {
                books.sort(function (a, b) {
                    return a.borrowed > b.borrowed;
                });
                res.json(books);
            }
        })
    }

    take = (req: express.Request, res: express.Response) => {
        let taken = new TakenModel(req.body);
        if (req.body.user.taken >= 3) {
            res.json({ "message": "3 taken" });
            return;
        }
        TakenModel.find({ 'user': req.body.user._id, 'back': 'false', 'book': req.body.book._id }, (err, data) => {
            if (err) console.log(err);
            if (data.length != 0) {
                res.json({ "message": "already taken" });
                return;
            } else {
                taken.save().then(resp => {
                    BookModel.updateOne({ '_id': req.body.book }, { $inc: { 'borrowed': 1 } }, (err, user) => {
                        if (err) console.log(err);
                    })
                    UserModel.updateOne({ '_id': req.body.user }, { $inc: { 'taken': 1 } }, (err, user) => {
                        if (err) console.log(err);
                    })
                    res.json({ "message": "ok" });
                })
            }
        }).clone();;

    }

    borrowed = (req: express.Request, res: express.Response) => {
        TakenModel.find({ 'user': req.body.user._id, 'back': 'false' }, (err, books) => {
            if (err) console.log(err);
            else {
                let id = [];
                books.forEach(book => {
                    id.push(book.book);
                })
                BookModel.find({ _id: { $in: id } }, (err, current) => {
                    if (err) console.log(err);
                    else {
                        res.json(current);
                    }
                });
            }

        }).clone().catch(function (err) { console.log(err) });
    }


    taken = (req: express.Request, res: express.Response) => {
        TakenModel.find({ 'user': req.body.user._id, 'back': 'false' }, (err, books) => {
            if (err) console.log(err);
            else {
                res.json(books);
            }
        });
    }

    back = (req: express.Request, res: express.Response) => {
        let now = Date.now();
        TakenModel.updateOne({ 'user': req.body.user._id, 'back': 'false', 'book': req.body.book._id }, { $set: { 'back': 'true' } }, (err, user) => {
            if (err) console.log(err);
        });
        TakenModel.updateOne({ 'user': req.body.user._id, 'book': req.body.book._id }, { $set: { 'dateBack': now } }, (err, user) => {
            if (err) console.log(err);
        });
        UserModel.updateOne({ '_id': req.body.user._id }, { $inc: { 'taken': -1 } }, (err, user) => {
            if (err) console.log(err);
        });
        res.json({ "message": "ok" });
    }

    returned = (req: express.Request, res: express.Response) => {
        let now = Date.now();
        TakenModel.find({ 'user': req.body.user._id, 'back': 'true' }, (err, data) => {
            if (err) console.log(err);
            else res.json(data);
        });
    }

    returnedBooks = (req: express.Request, res: express.Response) => {
        TakenModel.find({ 'user': req.body.user._id, 'back': 'true' }, (err, books) => {
            if (err) console.log(err);
            else {
                let id = [];
                books.forEach(book => {
                    id.push(book.book);
                })
                BookModel.find({ _id: { $in: id } }, (err, current) => {
                    if (err) console.log(err);
                    else {
                        res.json(current);
                    }
                });
            }

        }).clone().catch(function (err) { console.log(err) });
    }

    delete = (req: express.Request, res: express.Response) => {
        BookModel.deleteOne({ '_id': req.body._id }, (err, userData) => {
            if (err) console.log(err);
            else res.json("ok");
        })
    }

    addBook = (req: express.Request, res: express.Response) => {
        let book = new BookModel(req.body);
        book.save().then(resp => {
            res.json({ "message": "ok" });
        }).catch(err => {
            console.log(err);
            res.json({ "message": "ok" });
        })
    }

    editBook = (req: express.Request, res: express.Response) => {
        BookModel.updateOne({ '_id': req.body._id }, {
            $set: {
                'title': req.body.title, 'subtitle': req.body.subtitle,
                'author': req.body.author, 'published': req.body.published, 'publisher': req.body.publisher, 'photo': req.body.photo,
                'genre': req.body.genre, 'language': req.body.language, 'amount': req.body.amount
            }
        }, (err, user) => {
            if (err) console.log(err);
            else res.json({ 'message': 'ok' });
        })
    }


    extend = (req: express.Request, res: express.Response) => {
        // console.log(req.body);
        TakenModel.updateOne({ 'user': req.body.user._id, 'book':  req.body.book._id, 'back': false },{$set: {'extended': req.body.extended}}, (err, data) => {
            if (err) console.log(err);
            else res.json({'message': 'ok' });
        });
    }

    addBookUser = (req: express.Request, res: express.Response) => {
        let book = new ReviewBookModel(req.body);
        book.save().then(resp => {
            res.json({ "message": "ok" });
        }).catch(err => {
            console.log(err);
            res.json({ "message": "ok" });
        })
    }


    getAllPadding = (req: express.Request, res: express.Response) => {
        ReviewBookModel.find({}, (err, news) => {
            if (err) console.log(err);
            else {
                // console.log(news);
                res.json(news);
            }
        })
    }

    approve = (req: express.Request, res: express.Response) => {
        ReviewBookModel.findOne({ '_id': req.body._id }, (err, bookData) => {
            if (err) console.log(err);
            else {
                let book = new BookModel();
                book.title = bookData.title;
                book.subtitle = bookData.subtitle;
                book.author = bookData.author;
                book.published = bookData.published;
                book.publisher = bookData.publisher;
                book.genre = bookData.genre;
                book.language = bookData.language;
                book.borrowed = bookData.borrowed;
                book.amount = bookData.amount;
                book.review = bookData.review;
                book.photo = bookData.photo;

                book.save().then(resp => {
                    ReviewBookModel.deleteOne({ '_id': req.body._id }, (err, userData) => {
                        if (err) console.log(err);
                    })
                    res.json({ "message": "ok" });
                }).catch(err => {
                    console.log(err);
                    res.json({ "message": "ok" });
                })
            }
        })
    }

    decline = (req: express.Request, res: express.Response) => {
        ReviewBookModel.deleteOne({ '_id': req.body._id}, (err, userData) => {
            if (err) console.log(err);
            else res.json({ "message": "ok" });
        })
    }

};
