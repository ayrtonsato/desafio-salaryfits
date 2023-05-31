/* eslint-disable @typescript-eslint/no-unused-vars */
import { prismaMock } from '../../../singleton';
import { OpenWeatherDataSource } from '../../../src/datasources/remote-api/openweather-datasource';
import { MySqlWeatherDataSource } from '../../../src/datasources/database/mysql-weather-datasource';
import prismaClient from '../../../src/prisma-client';
import { GetCoordinatesFromLocate } from '../../../src/usecases/get-coordinates-from-locate';
import { Coordinates } from '../../../src/entities/coordinates';
import { IsoCodeCountry } from '../../../src/entities/iso-code-country';
import { Prisma } from '@prisma/client';

const fakeLatLonResult = {
    lat: new Prisma.Decimal(-23.5506507),
    lon: new Prisma.Decimal(-46.6333824),
    city: 'São Paulo',
    state: 'São Paulo',
    cc_id: 76,
    country: 'BR',
    id: 10,
};

const fakeCoordinates = {
    lat: -23.5506507,
    lon: -46.6333824,
    city: 'São Paulo',
    state: 'São Paulo',
    country: 'BR',
    id: 10,
    isoCodeCountry: new IsoCodeCountry('BR', 76)
};

describe('GetCoordinatesFromLocate tests', () => {
    describe('fetch()', () => {
        const weatherRepository = new OpenWeatherDataSource();
        const mysqlDataSource = new MySqlWeatherDataSource(prismaClient);

        it('should get coordinates from database', async () => {
            prismaMock.countryCode.findFirst.mockResolvedValue({ code: 76, country: 'BR' });
            prismaMock.latLon.findFirst.mockResolvedValue(fakeLatLonResult);
            const getCoordinatesFromLocate = new
                GetCoordinatesFromLocate(weatherRepository, mysqlDataSource, mysqlDataSource);
            const coordinatesResult = await getCoordinatesFromLocate.fetch('São Paulo', 'SP', 'Brazil');
            const expectedResult = new Coordinates(fakeCoordinates);
            expect(coordinatesResult).toStrictEqual(expectedResult);
        });

        it('should get coordinates from API and save to database', async () => {
            prismaMock.countryCode.findFirst.mockResolvedValue({ code: 76, country: 'BR' });
            prismaMock.latLon.create.mockResolvedValue({ ...fakeLatLonResult });
            const mockFetchCoordinates = jest.spyOn(weatherRepository, 'fetchCoordinates');
            const mockFn = mockFetchCoordinates.mockImplementation(
                async () => new Coordinates(fakeCoordinates)
            );
            const getCoordinatesFromLocate = new
                GetCoordinatesFromLocate(weatherRepository, mysqlDataSource, mysqlDataSource);
            const coordinatesResult = await getCoordinatesFromLocate.fetch('São Paulo', 'SP', 'Brazil');
            const expectedResult = new Coordinates(fakeCoordinates);
            expect(coordinatesResult).toStrictEqual(expectedResult);
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(prismaMock.latLon.create).toHaveBeenCalledTimes(1);
        });
    });
});
