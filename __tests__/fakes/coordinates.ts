import { CountryCode, LatLon, Prisma } from '@prisma/client';
import { Coordinates } from '../../src/entities/coordinates';

type PrismaFakeLatLonType = LatLon & {
    countryCode: CountryCode;
};

export function createFakeCoordinates(): Coordinates {
    return {
        country: 'BR',
        lat: -23.5506507,
        lon: -46.6333824,
        city: 'São Paulo',
        state: 'São Paulo',
        isoCodeCountry: {
            code: 76,
            country: 'Brazil',
        },
        id: 10,
    };
}

export function createFakeLatLon(): PrismaFakeLatLonType {
    return {
        cc_id: 76,
        city: 'São Paulo',
        country: 'BR',
        countryCode: {
            code: 76,
            country: 'Brazil',
        },
        id: 10,
        lat: new Prisma.Decimal(1222.00),
        lon: new Prisma.Decimal(1222.00),
        state: 'SP'
    };
}
