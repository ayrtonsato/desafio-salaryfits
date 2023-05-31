import axios from 'axios';
import { OPEN_WEATHER_KEY } from '../../constants';

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/',
    params: {
        appid: OPEN_WEATHER_KEY
    }
});
instance.interceptors.request.use(config => {
    console.log(`Calling ${config.baseURL}${config.url}`);
    return config;
});
export default instance;
