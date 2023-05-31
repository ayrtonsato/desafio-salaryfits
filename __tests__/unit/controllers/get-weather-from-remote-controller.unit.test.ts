import { prismaMock } from '../../../singleton';
import { GetWeatherFromRemoteController } from '../../../src/controllers/get-weather-from-remote-controller';
import { MySqlWeatherDataSource } from '../../../src/datasources/database/mysql-weather-datasource';
import { OpenWeatherDataSource } from '../../../src/datasources/remote-api/openweather-datasource';
import { Weather } from '../../../src/entities/weather';
import { GetCoordinatesFromLocate } from '../../../src/usecases/get-coordinates-from-locate';
import { GetWeatherFromRemote } from '../../../src/usecases/get-weather-from-remote';
import { SaveWeatherToDb } from '../../../src/usecases/save-weather-to-db';
import { createFakeLatLon } from '../../fakes/coordinates';
import { createFakePrismaWeather } from '../../fakes/weather';

const fakeWeather = new Weather(
    {
        temp: 20.00, feelsLike: 20.00,
        tempMin: 12.00, tempMax: 21.00,
        humidity: 22.11, pressure: 32.23,
        description: 'tempo seco', id: 'uuid'
    }
);
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
            prismaMock.latLon.findFirst.mockResolvedValue(createFakeLatLon());
            prismaMock.weather.create.mockResolvedValue(createFakePrismaWeather());
            const spyOnFetchWeather = jest.spyOn(getWeather, 'fetchWeatherFromAPI');
            const mockFn = spyOnFetchWeather.mockResolvedValue(fakeWeather);
            const result = await sut.getDataAndStore({ city: 'São Paulo', country: 'Brazil', state: 'SP' });
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(result instanceof Weather).toBe(true);
            expect(result.id).toBe('uuid');
        });
    });
});
