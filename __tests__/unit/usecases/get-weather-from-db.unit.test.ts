import { prismaMock } from '../../../singleton';
import { MySqlWeatherDataSource } from '../../../src/datasources/database/mysql-weather-datasource';
import prismaClient from '../../../src/prisma-client';
import { GetWeatherFromDb } from '../../../src/usecases/get-weather-from-db';
import { createFakePrismaWeather } from '../../fakes/weather';

const sut = new GetWeatherFromDb(new MySqlWeatherDataSource(prismaClient));

describe('GetWeatherFromDb', () => {
    describe('fetchById', () => {
        it('should return a Weather', async () => {
            prismaMock.weather.findFirst.mockResolvedValue(createFakePrismaWeather());
            const result = await sut.fetchById('uuid');
            expect(result.id).toBe('uuid');
            expect(result.temp).toBe(20.00);
        });
    });
});
