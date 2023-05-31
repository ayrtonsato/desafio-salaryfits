import { PrismaClient } from '@prisma/client';
import { OpenWeatherDataSource } from '../../../src/datasources/remote-api/openweather-datasource';
import { GetWeatherFromRemote } from '../../../src/usecases/get-weather-from-remote';
import { createFakeCoordinates } from '../../fakes/coordinates';

describe('GetWeatherByCoordinates Class', () => {
    const prisma = new PrismaClient();

    afterAll(() => {
        prisma.$disconnect();
    });

    describe('fetchWeatherFromAPI', () => {
        it('should return a valid Weather class', async () => {
            const weatherRepository = new OpenWeatherDataSource();
            const getWeatherFromRemote = new GetWeatherFromRemote(
                weatherRepository
            );
            const response = await getWeatherFromRemote.fetchWeatherFromAPI(createFakeCoordinates());
            expect(typeof response.description).toBe('string');
            expect(typeof response.temp).toBe('number');
            expect(typeof response.feelsLike).toBe('number');
            expect(typeof response.tempMin).toBe('number');
            expect(typeof response.tempMax).toBe('number');
            expect(typeof response.pressure).toBe('number');
            expect(typeof response.humidity).toBe('number');
        });
    });
});
