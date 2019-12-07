import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherModel } from '../models/weatherModel';
import { FavoritesService } from '../services/favorites.service';
import { TodeyWeatherComponent } from '../todey-weather/todey-weather.component';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit, OnChanges {

  public days: WeatherModel[]
  public currentWeather: WeatherModel;
  public color: boolean;
  public metric: boolean;

  @Input() cityNameKey: WeatherModel;
  @Input() cityeName: string;
  @ViewChild('todeyWeather', { static: false }) todeyWeather: TodeyWeatherComponent;

  constructor(private weatherService: WeatherService, private favoritesService: FavoritesService) { }

  ngOnInit() {
  }

  getFiveDayForecast(cityNameKey) {
    this.weatherService.getFiveDayForecast(cityNameKey, this.metric)
      .subscribe(res => {
        this.days = res.DailyForecasts;
      })
  }

  getWeatherToday(key) {
    this.weatherService.getWeatherToday(key)
      .subscribe(res => {
        this.currentWeather = res[0];
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["cityNameKey"] && this.cityNameKey) {
      this.getWeatherToday(this.cityNameKey.Key);
      this.getFiveDayForecast(this.cityNameKey.Key);
    }
  }

  saveOrDelete() {
    this.currentWeather.cityeName = this.cityeName;
    this.currentWeather.Key = this.cityNameKey.Key;
    this.favoritesService.saveOrDelete(this.currentWeather)
    this.favoritesService.selectedCity = !this.favoritesService.selectedCity;
  }

  changeMetricToF() {
    this.metric = true;
    this.todeyWeather.changeMetricDataC()
    this.getFiveDayForecast(this.cityNameKey.Key)
  }

  changeMetricToC() {
    this.metric = false;
    this.todeyWeather.changeMetricDataF()
    this.getFiveDayForecast(this.cityNameKey.Key)
  }

}
