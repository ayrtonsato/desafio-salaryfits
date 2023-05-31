import { PrismaClient } from '@prisma/client';
import { MySqlWeatherDataSource } from '../../datasources/database/mysql-weather-datasource';
import { OpenWeatherDataSource } from '../../datasources/remote-api/openweather-datasource';
import { GetCoordinatesFromLocate } from '../get-coordinates-from-locate';

export const makeGetCoordinateFromLocate = (prisma: PrismaClient) => {
    const openWeather = new OpenWeatherDataSource();
    const remoteRepository = new MySqlWeatherDataSource(prisma);
    return new GetCoordinatesFromLocate(openWeather, remoteRepository, remoteRepository);
};
