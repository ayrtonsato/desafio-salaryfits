import { Prisma, Weather as PrismaWeather } from '@prisma/client';
import { Weather } from '../../src/entities/weather';

export function createFakeWeather(withId = false): Weather {
    return new Weather(
        {
            temp: 20.00, feelsLike: 20.00,
            tempMin: 12.00, tempMax: 21.00,
            humidity: 22.11, pressure: 32.23,
            datetime: new Date(),
            description: 'tempo seco', id: withId ? 'uuid' : undefined
        }
    );
}

export function createFakePrismaWeather(): PrismaWeather {
    return {
        temp: new Prisma.Decimal(20.00),
        feelsLike: new Prisma.Decimal(20.00),
        tempMin: new Prisma.Decimal(20.00),
        tempMax: new Prisma.Decimal(20.00),
        pressure: new Prisma.Decimal(20.00),
        humidity: new Prisma.Decimal(20.00),
        description: 'tempo seco',
        latLonId: 10,
        id: 'uuid',
        forecastId: null,
        datetime: new Date()
    };
}
