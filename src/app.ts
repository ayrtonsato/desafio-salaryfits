import express, { Application } from 'express';
import bodyParser from 'body-parser';
import weatherRouter from './routes/weather-routes';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/weather', weatherRouter);


export default app;
