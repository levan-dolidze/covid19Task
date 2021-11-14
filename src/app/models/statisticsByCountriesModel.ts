export class statisticsByCountriesModel {
    coordinates: {
        latitude: number;
        longitude: number;
    }
    name: string;
    code: string;
    population: number | null;
    updated_at: Date;
    today: {
        deaths: number,
        confirmed: number
 
    };
    latest_data: {
        deaths: number;
        confirmed: number;
        recovered: number;
        critical: number;
        calculated: {
            death_rate: number;
            recovery_rate: number;
            recovered_vs_death_ratio: number;
            cases_per_million_population: number;


        };
    };

    cacheHit: boolean;

    // constructor() {



    // }

}