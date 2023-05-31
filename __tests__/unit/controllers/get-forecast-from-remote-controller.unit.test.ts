import { prismaMock } from '../../../singleton';
import prisma from '../../../src/prisma-client';
import { GetForecastFromRemoteController } from '../../../src/controllers/get-forecast-from-remote-controller';
import { MySqlWeatherDataSource } from '../../../src/datasources/database/mysql-weather-datasource';
import { OpenWeatherDataSource } from '../../../src/datasources/remote-api/openweather-datasource';
import { Forecast } from '../../../src/entities/forecast';
import { GetForecastFromOpenWeather } from '../../../src/usecases/forecast/get-forecast';
import { SaveForecastIntoDatabase } from '../../../src/usecases/forecast/save-forecast';
import { GetCoordinatesFromLocate } from '../../../src/usecases/get-coordinates-from-locate';
import { createFakeLatLon } from '../../fakes/coordinates';
import { createFakeForecast, createPrismaFakeWeather } from '../../fakes/forecast';

const mysqlDataSource = new MySqlWeatherDataSource(prisma);
const openWeather = new OpenWeatherDataSource();

const getCoordinates = new GetCoordinatesFromLocate(
    openWeather, mysqlDataSource, mysqlDataSource
);
const getForecast = new GetForecastFromOpenWeather(openWeather);
const saveForecast = new SaveForecastIntoDatabase(mysqlDataSource);
const sut = new GetForecastFromRemoteController(
    getCoordinates, getForecast, saveForecast
);

describe('GetForecastFromRemoteController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getDataAndStore', () => {
        it('should return a valid weather', async () => {
            prismaMock.countryCode.findFirst.mockResolvedValue({ code: 76, country: 'BR' });
            prismaMock.latLon.findFirst.mockResolvedValue(createFakeLatLon());
            prismaMock.forecast.create.mockResolvedValue(createPrismaFakeWeather());
            const spyOnFetchForecast = jest.spyOn(getForecast, 'fetchForecast');
            const mockFn = spyOnFetchForecast.mockResolvedValue(createFakeForecast());
            const result = await sut.getDataAndStore({ city: 'São Paulo', country: 'Brazil', state: 'SP' });
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(result instanceof Forecast).toBe(true);
            expect(result.id).toBe('uuid');
        });
    });
});
