import express from 'express';
import {routes} from './routes/routes.js';
import mongoose from 'mongoose';
import {config} from 'dotenv';
import cors from 'cors';

//config env
config();

//variables
const app = express();
const PORT = 8080;

//middlewares
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}));
app.use("/", routes);

//mongoose
mongoose.connect(process.env.DATABASE_URL);

//launching server
app.listen(PORT, () => {    
    console.log(`listening to port: ${PORT}`);
})