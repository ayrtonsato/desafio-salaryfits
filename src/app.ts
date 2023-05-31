import express, { Application } from 'express';
import bodyParser from 'body-parser';
import weatherRouter from './routes/weather-routes';
import forecastRouter from './routes/forecast-route';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/weather', weatherRouter);
app.use('/forecast', forecastRouter);


export default app;
