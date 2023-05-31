import axios from 'axios';
import { CoordinatesFromAPIRepository } from '../../repositories/coordinates-from-api-repository';
import { Coordinates } from '../../entities/coordinates';
import axiosInstance from '../base/axios-client';
import { UnexpectedError } from '../errors/unexpeted-error';
import { ApiKeyError } from '../errors/api-key-error';
import { NotFoundError } from '../errors/not-found';
import { IsoCodeCountry } from '../../entities/iso-code-country';
import { WeatherFromApiRepository } from '../../repositories/weather-from-api-repository';
import { Weather } from '../../entities/weather';

export class OpenWeatherDataSource implements CoordinatesFromAPIRepository, WeatherFromApiRepository {
    async fetchForecast(lat: number, lon: number): Promise<Weather[]> {
        try {
            const { data } = await axiosInstance.get('/data/2.5/forecast', {
                params: {
                    lat: lat,
                    lon: lon,
                    units: 'metric',
                    lang: 'pt_br',
                    cnt: 24, // only 72 hours of forecast
                }
            });
            if (!data) {
                throw new NotFoundError('Forecast not found!');
            }
            const weathers: Weather[] = data.list.map((w: { dt: number, main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number; }; weather: { description: string; }[]; }) => {
                return new Weather({
                    temp: w.main.temp,
                    feelsLike: w.main.feels_like,
                    tempMin: w.main.temp_min,
                    tempMax: w.main.temp_max,
                    pressure: w.main.pressure,
                    humidity: w.main.humidity,
                    description: w.weather[0].description,
                    datetime: new Date(w.dt),
                });
            });
            return weathers;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const status = err?.response?.status || 0;
                if (status === 401) {
                    throw new ApiKeyError();
                }
                if (status === 400) {
                    throw new NotFoundError(err.response?.data.message);
                }
                throw new UnexpectedError('');
            } else {
                throw new UnexpectedError('');
            }
        }
    }

    async fetchWeatherNow(lat: number, lon: number): Promise<Weather> {
        try {
            const { data } = await axiosInstance.get('/data/2.5/weather', {
                params: {
                    lat: lat,
                    lon: lon,
                    units: 'metric',
                    lang: 'pt_br',
                }
            });
            if (!data) {
                throw new NotFoundError('Weather not found!');
            }
            const weather = new Weather({
                temp: data.main.temp,
                feelsLike: data.main.feels_like,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                description: data.weather[0].description,
            });
            return weather;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const status = err?.response?.status || 0;
                if (status === 401) {
                    throw new ApiKeyError();
                }
                if (status === 400) {
                    throw new NotFoundError(err.response?.data.message);
                }
                throw new UnexpectedError('');
            } else {
                throw new UnexpectedError('');
            }
        }

    }

    async fetchCoordinates(city: string, state: string, isoCodeCountry: IsoCodeCountry): Promise<Coordinates> {
        try {
            const { data } = await axiosInstance.get('/geo/1.0/direct', {
                params: {
                    q: `${city},${state},${isoCodeCountry.code}`,
                    limit: 1
                }
            });
            const { name, lat, lon, state: state_, country } = data[0];
            return new Coordinates({
                city: name,
                state: state_,
                lat,
                lon,
                isoCodeCountry,
                country,
            });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const status = err?.response?.status || 0;
                if (status === 401) {
                    throw new ApiKeyError();
                }
                if (status >= 500) {
                    throw new UnexpectedError('');
                }
                throw new NotFoundError('Coordinates not found!');
            } else {
                throw new UnexpectedError('');
            }
        }
    }

}
