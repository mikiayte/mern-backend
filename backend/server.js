import express from 'express';
import path from 'path';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js';
dotenv.config()
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js';
connectDB()
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser())
app.use('/api/users', userRoutes)
//  if(process.env.NODE_ENV === 'production')
//  {
//     const __dirname = path.resolve();

//     app.use(express.static(path.join(__dirname, 'frontend/dist')))

//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'index.html')));

//  }

//  else {
//     app.get('/', (req, res) => res.send('server is ready'))

//  }
 
app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log('listening on port', port))
