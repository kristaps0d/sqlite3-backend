// General imports
import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Module imports
import database from './database/index.js';
import router from './core/router/index.js'; 
import diagnostic from './core/diagnostic/index.js';

// Env variables
dotenv.config();

// Debugs env
diagnostic();

// Module setup
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.SITE_HOST],
    credentials: true
}));

// Database sync and listener initiation
database.sync().then(() => {
    console.info(`\n${process.env.DB_HOST && 
        "[info]: Database succesfully synced!" || '\x1b[31m[error]: ' + "Running in memory mode!"}` + '\x1b[0m');

    app.use("/", router).listen(process.env.PORT, () => {
        console.info('[info]: Server started on port ' + '\x1b[41m' + `:${process.env.PORT}` + '\x1b[0m');
    });
})