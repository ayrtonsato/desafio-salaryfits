import { IsoCodeCountry } from './iso-code-country';

type CoordinatesType = {
    id?: number;
    isoCodeCountry: IsoCodeCountry;
    lat: number;
    lon: number;
    state: string;
    city: string;
    country: string;
};

export class Coordinates {
    public id?: number;
    public isoCodeCountry: IsoCodeCountry;
    public lat: number;
    public lon: number;
    public state: string;
    public city: string;
    public country: string;

    constructor(
        coordinates: CoordinatesType
    ) {
        this.id = coordinates.id;
        this.isoCodeCountry = coordinates.isoCodeCountry;
        this.lat = coordinates.lat;
        this.lon = coordinates.lon;
        this.state = coordinates.state;
        this.city = coordinates.city;
        this.country = coordinates.country;
    }
}
