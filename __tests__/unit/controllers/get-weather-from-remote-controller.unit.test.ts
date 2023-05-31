import { Prisma } from '@prisma/client';
import { prismaMock } from '../../../singleton';
import { GetWeatherFromRemoteController } from '../../../src/controllers/get-weather-from-remote-controller';
import { GetCoordinatesFromLocate } from '../../../src/usecases/get-coordinates-from-locate';
import { GetWeatherFromRemote } from '../../../src/usecases/get-weather-from-remote';
import { SaveWeatherToDb } from '../../../src/usecases/save-weather-to-db';
import { MySqlWeatherDataSource } from '../../../src/datasources/database/mysql-weather-datasource';
import { OpenWeatherDataSource } from '../../../src/datasources/remote-api/openweather-datasource';
import { Weather } from '../../../src/entities/weather';

const fakeLatLonResult = {
    lat: new Prisma.Decimal(-23.5506507),
    lon: new Prisma.Decimal(-46.6333824),
    city: 'São Paulo',
    state: 'São Paulo',
    cc_id: 76,
    country: 'BR',
    id: 10,
};

const fakeWeather = new Weather(
    {
        temp: 20.00, feelsLike: 20.00,
        tempMin: 12.00, tempMax: 21.00,
        humidity: 22.11, pressure: 32.23,
        description: 'tempo seco', id: 'uuid'
    }
);
const fakeWeatherDTO = {
    temp: new Prisma.Decimal(20.00),
    feelsLike: new Prisma.Decimal(20.00),
    tempMin: new Prisma.Decimal(20.00),
    tempMax: new Prisma.Decimal(20.00),
    pressure: new Prisma.Decimal(20.00),
    humidity: new Prisma.Decimal(20.00),
    description: 'tempo seco',
    latLonId: 10,
    id: 'uuid',
    forecastId: null
};
const mysqlDataSource = new MySqlWeatherDataSource(prismaMock);
const openWeather = new OpenWeatherDataSource();

const getCoordinates = new GetCoordinatesFromLocate(
    openWeather, mysqlDataSource, mysqlDataSource
);
const getWeather = new GetWeatherFromRemote(openWeather);
const saveWeather = new SaveWeatherToDb(mysqlDataSource);
const sut = new GetWeatherFromRemoteController(
    getCoordinates, getWeather, saveWeather
);

describe('GetWeatherFromRemoteController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getDataAndStore', () => {
        it('should return a valid weather', async () => {
            prismaMock.countryCode.findFirst.mockResolvedValue({ code: 76, country: 'BR' });
            prismaMock.latLon.findFirst.mockResolvedValue({ ...fakeLatLonResult });
            prismaMock.weather.create.mockResolvedValue(fakeWeatherDTO);
            const spyOnFetchWeather = jest.spyOn(getWeather, 'fetchWeatherFromAPI');
            const mockFn = spyOnFetchWeather.mockResolvedValue(fakeWeather);
            const result = await sut.getDataAndStore({ city: 'São Paulo', country: 'Brazil', state: 'SP' });
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(result instanceof Weather).toBe(true);
            expect(result.id).toBe('uuid');
        });
    });
});
