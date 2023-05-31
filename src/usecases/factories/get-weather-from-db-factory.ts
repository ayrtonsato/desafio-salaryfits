import { PrismaClient } from '@prisma/client';
import { MySqlWeatherDataSource } from '../../datasources/database/mysql-weather-datasource';
import { GetWeatherFromDb } from '../get-weather-from-db';

export const makeGetWeatherFromDb = (prisma: PrismaClient) => {
    const remoteRepository = new MySqlWeatherDataSource(prisma);
    return new GetWeatherFromDb(remoteRepository);
};
