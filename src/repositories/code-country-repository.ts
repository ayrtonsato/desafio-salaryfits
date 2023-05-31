import { IsoCodeCountry } from '../entities/iso-code-country';

export interface CodeCountryRepository {
    fetchCodeCountry(country: string): Promise<IsoCodeCountry>;
}
