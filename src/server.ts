import app from './app';

const PORT = process.env.WEB_PORT;

app.listen(PORT, (): void => console.log(`Running on port ${PORT}`));
