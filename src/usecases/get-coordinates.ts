import { Coordinates } from '../entities/coordinates';

export interface GetCoordinates {
    fetch(city: string, state: string, country: string): Promise<Coordinates>;
}
