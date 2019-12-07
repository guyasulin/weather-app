import { Injectable } from '@angular/core';
import { WeatherModel } from '../models/weatherModel';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  public favoriteCities:WeatherModel[] = [];
  public selectedCity:boolean = false;

  constructor() { }

  getFaivorites() {
   return this.favoriteCities;
  }

  saveCity(city:WeatherModel) {
    this.favoriteCities.push(city);
  }
  
  deleteCity(city:WeatherModel) {
    for (let i = 0; i < this.favoriteCities.length;i++) {
      const element = this.favoriteCities[i];
      if (element.Key == city.Key) {
        this.favoriteCities.splice(i, 1)
        break;
      }
    }
  }

  saveOrDelete(city:WeatherModel){
    let isExists = this.favoriteCities.some(x => {
      if (x.Key == city.Key) {
        return true;
      } else {
         return false;
      }
    });
    if (isExists) {
      this.deleteCity(city)
    } else {
      this.saveCity(city)
    }
  }
}
