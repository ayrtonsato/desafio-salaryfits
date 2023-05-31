export class Weather {
    constructor(
        public temp: number,
        public feelsLike: number,
        public tempMin: number,
        public tempMax: number,
        public pressure: number,
        public humidity: number,
        public description: string,
        public id?: string,
    ) { }
}
