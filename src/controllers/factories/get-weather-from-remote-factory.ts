import { PrismaClient } from '@prisma/client';
import { makeGetCoordinateFromLocate, makeGetWeather, makeSaveWeather } from '../../usecases/factories';
import { GetWeatherFromRemoteController } from '../get-weather-from-remote-controller';

export const makeGetWeatherFromRemoteControllerFactory = (prisma: PrismaClient) => {
    const getCoordinates = makeGetCoordinateFromLocate(prisma);
    const getWeather = makeGetWeather();
    const saveWeather = makeSaveWeather(prisma);
    return new GetWeatherFromRemoteController(getCoordinates, getWeather, saveWeather);
};
