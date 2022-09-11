import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './router/user.router';
import adminRouter from './router/admin.router';
import mainRouter from './router/main.router';
import bookRouter from './router/book.router';
import commentRouter from './router/comment.router';


const app = express();
app.use(cors());
app.use(express.json());
//
// var bodyParser = require('body-parser');

// require('dotenv/config');
//

mongoose.connect('mongodb://localhost:27017/library')
const connection = mongoose.connection
connection.once('open', ()=>{console.log('db connected')})

const router = express.Router();


router.use('', mainRouter);
router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/book', bookRouter);
router.use('/comment', commentRouter);


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

//
// Step 3 - code was added to ./models.js

// Step 4 - set up EJS

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// // Set EJS as templating engine
// app.set("view engine", "ejs");
// //

// // Step 5 - set up multer for storing uploaded files
  
// var multer = require('multer');
  
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
  
// var upload = multer({ storage: storage });
//
// Step 6 - load the mongoose model for Image

