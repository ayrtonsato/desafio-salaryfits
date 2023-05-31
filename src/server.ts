import app from './app';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.WEB_PORT;

app.listen(PORT, (): void => console.log(`Running on port ${PORT}`));
