import { PrismaClient, Prisma } from '@prisma/client';
import { Weather as PrismaWeather } from '@prisma/client';
import { IsoCodeCountry } from '../../entities/iso-code-country';
import { CodeCountryRepository } from '../../repositories/code-country-repository';
import { NotFoundError } from '../errors/not-found';
import { CoordinatesFromDBRepository } from '../../repositories/coordinates-from-db-repository';
import { Coordinates } from '../../entities/coordinates';
import { WeatherFromDbRepository } from '../../repositories/weather-from-db-repository';
import { Weather } from '../../entities/weather';
import { InsertToDatabaseError } from '../errors/insert-to-database-error';
import { Forecast } from '../../entities/forecast';
import { latLonToCoordinates } from './helpers/converters';

export class MySqlWeatherDataSource implements
    CodeCountryRepository,
    CoordinatesFromDBRepository,
    WeatherFromDbRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async saveForecast(forecast: Forecast): Promise<Forecast> {
        const prismaWeather = forecast.weathersForecast.map((w: Weather) => {
            return {
                temp: new Prisma.Decimal(w.temp),
                feelsLike: new Prisma.Decimal(w.feelsLike),
                tempMin: new Prisma.Decimal(w.tempMin),
                tempMax: new Prisma.Decimal(w.tempMax),
                pressure: new Prisma.Decimal(w.pressure),
                humidity: new Prisma.Decimal(w.humidity),
                description: w.description,
                datetime: w.datetime,
            };
        });
        const result = await this.prisma.forecast.create({
            data: {
                latLonId: forecast.coordinates.id,
                weather: {
                    createMany: {
                        data: prismaWeather,
                    }
                },
            },
            include: {
                latLon: {
                    include: {
                        countryCode: true,
                    }
                },
                weather: true,
            }
        });
        return new Forecast({
            id: result.id,
            coordinates: latLonToCoordinates(result.latLon) as Required<Coordinates>,
            weathersForecast: result.
        });
    }

    async fetchById(id: string): Promise<Weather> {
        const result = await this.prisma.weather.findFirst({
            where: {
                id,
            }
        });
        if (!result) {
            throw new NotFoundError('Weather Not Found');
        }
        return new Weather({
            temp: result.temp.toNumber(),
            feelsLike: result.feelsLike.toNumber(),
            tempMin: result.tempMin.toNumber(),
            tempMax: result.tempMax.toNumber(),
            pressure: result.pressure.toNumber(),
            humidity: result.humidity.toNumber(),
            description: result.description,
            id: result.id,
        });
    }

    async saveWeather(weather: Weather, coordinatesId: number): Promise<Weather> {
        const result = await this.prisma.weather.create({
            data: {
                description: weather.description,
                feelsLike: new Prisma.Decimal(weather.feelsLike),
                temp: new Prisma.Decimal(weather.temp),
                tempMax: new Prisma.Decimal(weather.tempMax),
                tempMin: new Prisma.Decimal(weather.tempMin),
                humidity: new Prisma.Decimal(weather.humidity),
                pressure: new Prisma.Decimal(weather.pressure),
                // ...weather,
                latLonId: coordinatesId
            }
        });
        if (!result) {
            throw new InsertToDatabaseError('Insert weather error');
        }
        return new Weather({
            temp: new Prisma.Decimal(result.temp).toNumber(),
            feelsLike: new Prisma.Decimal(result.feelsLike).toNumber(),
            tempMin: new Prisma.Decimal(result.tempMin).toNumber(),
            tempMax: new Prisma.Decimal(result.tempMax).toNumber(),
            pressure: new Prisma.Decimal(result.pressure).toNumber(),
            humidity: new Prisma.Decimal(result.humidity).toNumber(),
            description: result.description,
            id: result.id,
        });
    }

    async fetchCoordinates(city: string, state: string, isoCodeCountry: IsoCodeCountry): Promise<Coordinates | null> {
        const result = await this.prisma.latLon.findFirst({
            where: {
                city,
                state,
                countryCode: isoCodeCountry,
            }
        });
        if (!result) {
            return null;
        }
        return new Coordinates({
            city: result.city,
            isoCodeCountry: isoCodeCountry,
            lat: new Prisma.Decimal(result.lat).toNumber(),
            lon: new Prisma.Decimal(result.lon).toNumber(),
            state: result.state,
            id: result.id,
            country: result.country,
        });
    }

    async saveCoordinates(coordinates: Coordinates): Promise<Coordinates> {
        const result = await this.prisma.latLon.create({
            data: {
                city: coordinates.city,
                country: coordinates.country,
                lat: coordinates.lat,
                lon: coordinates.lon,
                state: coordinates.state,
                cc_id: coordinates.isoCodeCountry.code
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { cc_id, country, lat, lon, ...data } = result;
        return new Coordinates({
            lat: new Prisma.Decimal(lat).toNumber(),
            lon: new Prisma.Decimal(lon).toNumber(),
            ...data,
            country: country,
            isoCodeCountry: coordinates.isoCodeCountry
        });
    }

    async fetchCodeCountry(country: string): Promise<IsoCodeCountry> {
        const result = await this.prisma.countryCode.findFirst({
            where: {
                country: {
                    contains: country
                }
            }
        });
        if (!result) {
            throw new NotFoundError('Country Not Found');
        }
        return new IsoCodeCountry(result.country, result.code);
    }
}
