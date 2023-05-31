import { MySqlWeatherDataSource } from '../../../src/datasources/database/mysql-weather-datasource';
import { OpenWeatherDataSource } from '../../../src/datasources/remote-api/openweather-datasource';
import { PrismaClient } from '@prisma/client';
import { GetCoordinatesFromLocate } from '../../../src/usecases/get-coordinates-from-locate';
import { GetWeatherFromRemote } from '../../../src/usecases/get-weather-from-remote';

describe('GetWeatherByCoordinates Class', () => {
    const prisma = new PrismaClient({
        log: [
            {
                emit: 'event',
                level: 'query',
            },
            {
                emit: 'stdout',
                level: 'error',
            },
            {
                emit: 'stdout',
                level: 'info',
            },
            {
                emit: 'stdout',
                level: 'warn',
            },
        ],
    });

    prisma.$on('query', (e) => {
        console.log('Query: ' + e.query);
        console.log('Params: ' + e.params);
        console.log('Duration: ' + e.duration + 'ms');
    });

    afterAll(() => {
        prisma.$disconnect();
    });

    describe('fetchWeatherFromAPI', () => {
        it('should return a valid Weather class', async () => {
            const weatherRepository = new OpenWeatherDataSource();
            const mySqlWeatherDataSource = new MySqlWeatherDataSource(prisma);
            const getCoordinatesFromLocate = new GetCoordinatesFromLocate(
                weatherRepository, mySqlWeatherDataSource, mySqlWeatherDataSource
            );
            const getWeatherFromRemote = new GetWeatherFromRemote(
                weatherRepository,
                getCoordinatesFromLocate
            );
            const response = await getWeatherFromRemote.fetchWeatherFromAPI('São Paulo', 'SP', 'Brazil');
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
