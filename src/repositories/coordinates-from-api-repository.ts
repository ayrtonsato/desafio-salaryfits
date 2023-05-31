import { Coordinates } from '../entities/coordinates';
import { IsoCodeCountry } from '../entities/iso-code-country';

export interface CoordinatesFromAPIRepository {
    fetchCoordinates(city: string, state: string, isoCodeCountry: IsoCodeCountry): Promise<Coordinates>;
}
