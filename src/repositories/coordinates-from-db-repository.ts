import { Coordinates } from '../entities/coordinates';
import { IsoCodeCountry } from '../entities/iso-code-country';

export interface CoordinatesFromDBRepository {
    fetchCoordinates(city: string, state: string, isoCodeCountry: IsoCodeCountry): Promise<Coordinates | null>;
    saveCoordinates(coordinates: Coordinates): Promise<Coordinates>;
}
