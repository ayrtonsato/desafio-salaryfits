import { CountryCode, LatLon, Prisma, Weather as PrismaWeather } from '@prisma/client';
import { Coordinates } from '../../../entities/coordinates';
import { Weather } from '../../../entities/weather';

export const latLonToCoordinates = (latLon: LatLon & {
    countryCode: CountryCode;
}): Coordinates => {
    return new Coordinates({
        city: latLon.city,
        country: latLon.country,
        isoCodeCountry: latLon.countryCode,
        lat: new Prisma.Decimal(latLon.lat).toNumber(),
        lon: new Prisma.Decimal(latLon.lat).toNumber(),
        state: latLon.state,
        id: latLon.id,
    });
};

export const prismaWeatherToWeather = (prismaWeather: PrismaWeather) => {
    return new Weather({
        temp: prismaWeather.temp.toNumber(),
        feelsLike: prismaWeather.feelsLike.toNumber(),
        tempMin: prismaWeather.tempMin.toNumber(),
        tempMax: prismaWeather.tempMax.toNumber(),
        pressure: prismaWeather.pressure.toNumber(),
        humidity: prismaWeather.humidity.toNumber(),
        description: prismaWeather.description,
        id: prismaWeather.id,
        datetime: prismaWeather.datetime,
    });
};
