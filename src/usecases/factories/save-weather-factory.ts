import { PrismaClient } from '@prisma/client';
import { MySqlWeatherDataSource } from '../../datasources/database/mysql-weather-datasource';
import { SaveWeatherToDb } from '../save-weather-to-db';

export const makeSaveWeather = (prisma: PrismaClient) => {
    const remoteRepository = new MySqlWeatherDataSource(prisma);
    return new SaveWeatherToDb(remoteRepository);
};
