import {
    Forecast as PrismaForecast, LatLon, CountryCode, Weather as PrismaWeather
} from '@prisma/client';
import { createFakePrismaWeather, createFakeWeather } from './weather';
import { createFakeCoordinates, createFakeLatLon } from './coordinates';
import { Coordinates } from '../../src/entities/coordinates';
import { Forecast } from '../../src/entities/forecast';

type PrismaFakeWeather = PrismaForecast & {
    latLon: LatLon & {
        countryCode: CountryCode;
    };
    weather: PrismaWeather[];
};
export function createPrismaFakeWeather(): PrismaFakeWeather {
    return {
        id: 'uuid',
        latLonId: 10,
        weather: [
            {
                ...createFakePrismaWeather(),
                forecastId: 'uuid',
            }, {
                ...createFakePrismaWeather(),
                forecastId: 'uuid',
            }, {
                ...createFakePrismaWeather(),
                forecastId: 'uuid',
            },
        ],
        latLon: createFakeLatLon(),
    };
}

export function createFakePrismaForecast(): PrismaForecast {
    return {
        id: 'uuid',
        latLonId: 10,
    };
}

export function createFakeForecast(): Forecast {
    return new Forecast({
        coordinates: createFakeCoordinates() as Required<Coordinates>,
        weathersForecast: [
            createFakeWeather(), createFakeWeather(), createFakeWeather()
        ]
    });
}
