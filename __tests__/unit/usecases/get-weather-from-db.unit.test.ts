import { prismaMock } from '../../../singleton';
import { GetWeatherFromDb } from '../../../src/usecases/get-weather-from-db';
import { MySqlWeatherDataSource } from '../../../src/datasources/database/mysql-weather-datasource';
import prismaClient from '../../../src/prisma-client';
import { Prisma } from '@prisma/client';

const sut = new GetWeatherFromDb(new MySqlWeatherDataSource(prismaClient));

describe('GetWeatherFromDb', () => {
    describe('fetchById', () => {
        it('should return a Weather', async () => {
            prismaMock.weather.findFirst.mockResolvedValue({
                temp: new Prisma.Decimal(20.00),
                tempMin: new Prisma.Decimal(20.00),
                tempMax: new Prisma.Decimal(20.00),
                pressure: new Prisma.Decimal(20.00),
                humidity: new Prisma.Decimal(20.00),
                feelsLike: new Prisma.Decimal(20.00),
                description: 'tempo frio',
                id: 'uuid',
                latLonId: 10,
            });
            const result = await sut.fetchById('uuid');
            expect(result.id).toBe('uuid');
            expect(result.temp).toBe(20.00);
        });
    });
});
