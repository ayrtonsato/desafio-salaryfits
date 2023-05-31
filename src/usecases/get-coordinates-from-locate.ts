import { Coordinates } from '../entities/coordinates';
import { GetCoordinates } from './get-coordinates';
import { CodeCountryRepository } from '../repositories/code-country-repository';
import { CoordinatesFromAPIRepository } from '../repositories/coordinates-from-api-repository';
import { CoordinatesFromDBRepository } from '../repositories/coordinates-from-db-repository';

export class GetCoordinatesFromLocate implements GetCoordinates {
    constructor(
        private readonly coordinatesFromAPIRepository: CoordinatesFromAPIRepository,
        private readonly codeCountryRepository: CodeCountryRepository,
        private readonly coordinatesFromDBRepository: CoordinatesFromDBRepository,
    ) { }

    async fetch(city: string, state: string, country: string): Promise<Coordinates> {
        const countryCode = await this.codeCountryRepository.fetchCodeCountry(country);
        const coordinatesFromDB = await this.coordinatesFromDBRepository.fetchCoordinates(city, state, countryCode);
        if (!coordinatesFromDB) {
            const coordinates = await this.coordinatesFromAPIRepository.fetchCoordinates(city, state, countryCode);
            const savedCoordinates = await this.coordinatesFromDBRepository.saveCoordinates({ ...coordinates, state });
            return savedCoordinates;
        }
        return coordinatesFromDB;
    }
}
