import { PrismaClient } from '@prisma/client';
import { MySqlWeatherDataSource } from '../../datasources/database/mysql-weather-datasource';
import { SaveForecastIntoDatabase } from '../forecast/save-forecast';

export const makeSaveForecastIntoDatabase = (prisma: PrismaClient) => {
    const remoteRepository = new MySqlWeatherDataSource(prisma);
    return new SaveForecastIntoDatabase(remoteRepository);
};
