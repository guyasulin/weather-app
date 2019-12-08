export class WeatherModel {
    id?: string;
    LocalizedName?: string;
    DailyForecasts?: string;
    Key?: string;
    Day?: string
    Unit?: string;
    Temperature?: Temperature;
    WeatherText?: string;
    cityeName?: string;
    long?: string;
    leti?: string;
    Region?: string
    Date?: string;
}

export class Temperature {
    Metric: {
        Value: number;
        Unit: string;
    }

    Imperial: {
        Value: number;
        Unit: string;
    }

    Minimum: {
        Value: number;
        Unit: string;
    }
}



