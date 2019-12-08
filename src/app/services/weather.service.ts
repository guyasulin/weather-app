import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { WeatherModel } from '../models/weatherModel';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public params: WeatherModel;

  apiKey = 'J8PZonyj99Kwid9N5H9dmk3d4OUIGc98';

  constructor(private http: HttpClient) { }

  searchCity(city: string): Observable<any> {
    return this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${city}`)
  }

  findMe(latitude: number, longitude: number): Observable<any> {
    return this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${latitude},${longitude}`)
  }

  getWeatherToday(key: WeatherModel[]): Observable<any> {
    return this.http.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${this.apiKey}`)
  }

  getFiveDayForecast(key: WeatherModel[], metric: boolean = true): Observable<any> {
    return this.http.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${this.apiKey}&details=true&metric=${metric}`)
    // metric=true
  }
}
