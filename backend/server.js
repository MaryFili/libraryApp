import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connect } from './utils/db.js';



//set variables
process.NODE_ENV === 'production' ? dotenv.config() : dotenv.config({ path: './config/.env' });

dotenv.config();

console.log(process.env.NODE_ENV);
//create app
const app = express();
//connect to DB
connect()
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', "DELETE"]
}));



//body parser
app.use(express.json());





app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//apply routers


const port = process.env.PORT;
app.listen(port, console.log(`✅ Server is running at http://localhost:${port}/`));