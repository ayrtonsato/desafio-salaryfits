import { PrismaClient } from '@prisma/client';
import {
    makeGetCoordinateFromLocate,
    makeGetForecastFromOpenWeather,
    makeSaveForecastIntoDatabase
} from '../../usecases/factories';
import { GetForecastFromRemoteController } from '../get-forecast-from-remote-controller';

export const makeGetForecastFromRemoteController = (prisma: PrismaClient) => {
    const openWeather = makeGetForecastFromOpenWeather();
    const getCoordinates = makeGetCoordinateFromLocate(prisma);
    const saveForecast = makeSaveForecastIntoDatabase(prisma);
    return new GetForecastFromRemoteController(getCoordinates, openWeather, saveForecast);
};
