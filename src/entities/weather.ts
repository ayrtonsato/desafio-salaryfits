export class Weather {
    public temp: number;
    public feelsLike: number;
    public tempMin: number;
    public tempMax: number;
    public pressure: number;
    public humidity: number;
    public description: string;
    public id?: string;
    public datetime?: Date;

    constructor(weather: {
        temp: number,
        feelsLike: number,
        tempMin: number,
        tempMax: number,
        pressure: number,
        humidity: number,
        description: string,
        id?: string,
        datetime?: Date,
    }) {
        this.temp = weather.temp;
        this.feelsLike = weather.feelsLike;
        this.tempMin = weather.tempMin;
        this.tempMax = weather.tempMax;
        this.pressure = weather.pressure;
        this.humidity = weather.humidity;
        this.description = weather.description;
        this.id = weather.id;
        this.datetime = weather.datetime;
    }
}
