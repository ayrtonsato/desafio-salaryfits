import { OpenWeatherDataSource } from '../../../../src/datasources/remote-api/openweather-datasource';
import { Coordinates } from '../../../../src/entities/coordinates';
import { prismaMock } from '../../../../singleton';

describe('OpenWeather DataSource Integration Tests', () => {
    const openWeatherDataSource = new OpenWeatherDataSource();

    describe('fetchCoordinates', () => {
        it('should return a coordinate', async () => {
            const expectedCoordinates = new Coordinates({
                lat: -23.5506507,
                lon: -46.6333824,
                city: 'São Paulo',
                state: 'São Paulo',
                isoCodeCountry: { code: 76, country: 'BR' },
                country: 'BR'
            });

            prismaMock.countryCode.findFirst.mockResolvedValue({ code: 76, country: 'BR' });

            const result = await openWeatherDataSource
                .fetchCoordinates('São Paulo', 'SP', { code: 76, country: 'BR' });
            expect(result).toStrictEqual(expectedCoordinates);
        });
    });

    describe('fetchWeatherNow', () => {
        it('should return a valid Weather', async () => {
            const coordinates = {
                lat: -23.5506507,
                lon: -46.6333824,
            };
            const result = await openWeatherDataSource.fetchWeatherNow(coordinates.lat, coordinates.lon);
            expect(typeof result.temp).toBe('number');
            expect(typeof result.feelsLike).toBe('number');
            expect(typeof result.tempMin).toBe('number');
            expect(typeof result.tempMax).toBe('number');
            expect(typeof result.pressure).toBe('number');
            expect(typeof result.humidity).toBe('number');
            expect(typeof result.description).toBe('string');
        });
    });

    describe('fetchForecast', () => {
        it('should return a valid Weather[]', async () => {
            const coordinates = {
                lat: -23.5506507,
                lon: -46.6333824,
            };
            const result = await openWeatherDataSource.fetchForecast(coordinates.lat, coordinates.lon);
            expect(result).toHaveLength(24);
            expect(typeof result[0].temp).toBe('number');
            expect(typeof result[0].feelsLike).toBe('number');
            expect(typeof result[0].tempMin).toBe('number');
            expect(typeof result[0].tempMax).toBe('number');
            expect(typeof result[0].pressure).toBe('number');
            expect(typeof result[0].humidity).toBe('number');
            expect(typeof result[0].description).toBe('string');
            expect(typeof result[result.length - 1].temp).toBe('number');
            expect(typeof result[result.length - 1].feelsLike).toBe('number');
            expect(typeof result[result.length - 1].tempMin).toBe('number');
            expect(typeof result[result.length - 1].tempMax).toBe('number');
            expect(typeof result[result.length - 1].pressure).toBe('number');
            expect(typeof result[result.length - 1].humidity).toBe('number');
            expect(typeof result[result.length - 1].description).toBe('string');
        });
    });

});
