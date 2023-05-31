import { PrismaClient } from '@prisma/client';
import { makeGetWeatherFromDb } from '../../usecases/factories';
import { GetWeatherFromDbController } from '../get-weather-from-db-controller';

export const makeGetWeatherFromDbController = (prisma: PrismaClient) => {
    const getWeather = makeGetWeatherFromDb(prisma);
    return new GetWeatherFromDbController(getWeather);
};
