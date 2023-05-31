import { Prisma, PrismaClient } from '@prisma/client';
import { IsoCodeCountry } from '../../../../src/entities/iso-code-country';
import { MySqlWeatherDataSource } from '../../../../src/datasources/database/mysql-weather-datasource';
import { Weather } from '../../../../src/entities/weather';
import { latLonToCoordinates } from '../../../../src/datasources/database/helpers/converters';
import { Forecast } from '../../../../src/entities/forecast';
import { Coordinates } from '../../../../src/entities/coordinates';

describe('MysqlWeather DataSource Integration Tests', () => {
    const prismaClient = new PrismaClient();
    const mySqlWeatherDataSource = new MySqlWeatherDataSource(prismaClient);

    describe('fetchCodeCountry', () => {
        it('should return an isoCodeCountry', async () => {
            const result = await mySqlWeatherDataSource.fetchCodeCountry('Brazil');
            const expectedIsoCode = new IsoCodeCountry('Brazil', 76);
            expect(result).toStrictEqual(expectedIsoCode);
        });
    });

    describe('saveWeather', () => {
        it('should return a valid Weather when save a Weather', async () => {
            const fakeCoordinate = await new PrismaClient().latLon.create({
                data: {
                    city: 'SP',
                    country: 'BR',
                    lat: 122222.22,
                    lon: 12222.11,
                    state: 'SP',
                    cc_id: 76,
                },
            });
            const weather = new Weather({
                temp: 20.00, feelsLike: 20.00,
                tempMin: 12.00, tempMax: 21.00,
                humidity: 22.11, pressure: 32.23,
                description: 'tempo seco'
            });
            const result = await mySqlWeatherDataSource.saveWeather(weather, fakeCoordinate.id);
            expect(typeof result.id).toBe('string');
            expect(result.description).toBe(weather.description);
            expect(result.feelsLike).toBe(weather.feelsLike);
            expect(result.humidity).toBe(weather.humidity);
            expect(result.temp).toBe(weather.temp);
        });
    });

    describe('saveForecast', () => {
        it('should save forecast into database', async () => {
            const latLon = await prismaClient.latLon.create({
                data: {
                    city: 'Rio de Janeiro',
                    lat: new Prisma.Decimal(-22.9035),
                    lon: new Prisma.Decimal(-43.2096),
                    state: 'RJ',
                    country: 'BR',
                    cc_id: 76,
                },
                include: {
                    countryCode: true
                }
            });
            const coordinates = latLonToCoordinates(latLon) as Required<Coordinates>;
            const weathers = [new Weather({
                temp: 20.00, feelsLike: 20.00,
                tempMin: 12.00, tempMax: 21.00,
                humidity: 22.11, pressure: 32.23,
                description: 'tempo seco'
            }), new Weather({
                temp: 20.00, feelsLike: 20.00,
                tempMin: 12.00, tempMax: 21.00,
                humidity: 22.11, pressure: 32.23,
                description: 'tempo seco'
            }), new Weather({
                temp: 20.00, feelsLike: 20.00,
                tempMin: 12.00, tempMax: 21.00,
                humidity: 22.11, pressure: 32.23,
                description: 'tempo seco'
            })];
            const forecast = new Forecast({
                coordinates,
                weathersForecast: weathers,
            });
            const result = await mySqlWeatherDataSource.saveForecast(forecast);
            expect(result).toHaveProperty('coordinates');
            expect(result).toHaveProperty('weathersForecast');
            expect(result).toHaveProperty('id');
            expect(typeof result.id).toBe('string');
            expect(result.weathersForecast).toHaveLength(3);
        });
    });

});
