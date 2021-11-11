export class generalStatisticsModel {
    active: number;
    date: string;
    updated_at: string;
    confirmed: number;
    new_confirmed: number;
    recovered: number;
    new_recovered: number;
    deaths: number;
    new_deaths: number;



    constructor(active: number, date: string, updated_at: string, confirmed: number, new_confirmed: number, recovered: number, new_recovered: number, deaths: number, new_deaths: number) {
        this.active = active;
        this.date = date;
        this.updated_at = updated_at;
        this.confirmed = confirmed;
        this.new_confirmed = new_confirmed;
        this.recovered = recovered;
        this.new_recovered = new_recovered;
        this.deaths = deaths;
        this.new_deaths = new_deaths;
    }


}



