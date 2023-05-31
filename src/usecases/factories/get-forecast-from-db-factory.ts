import { PrismaClient } from '@prisma/client';
import { MySqlWeatherDataSource } from '../../datasources/database/mysql-weather-datasource';
import { GetForecastFromDatabase } from '../forecast/get-forecast';

export const makeGetForecastFromDb = (prisma: PrismaClient) => {
    const remoteRepository = new MySqlWeatherDataSource(prisma);
    return new GetForecastFromDatabase(remoteRepository);
};
