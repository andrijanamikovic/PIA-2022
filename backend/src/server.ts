import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './router/user.router';
import adminRouter from './router/admin.router';
import mainRouter from './router/main.router';
import bookRouter from './router/book.router';


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/library')
const connection = mongoose.connection
connection.once('open', ()=>{console.log('db connected')})

const router = express.Router();


router.use('', mainRouter);
router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/book', bookRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));