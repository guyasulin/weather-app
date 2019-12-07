import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WeatherModel } from '../models/weatherModel';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public cityNames: WeatherModel[];
  public stateCtrl = new FormControl();
  public cityName: string;
  public cityNameKey: WeatherModel;
  public selectedCityName: string;
  public longitude: number;
  public latitude: number;

  constructor(
    private weatherService: WeatherService,
    public route: ActivatedRoute,
    private favoritesService: FavoritesService) {}

  ngOnInit() {
    let day = this.route.snapshot.paramMap.get("day");
    if (day) {
      this.cityName = day;
    } else {
      this.findMe();
    }
    // this.selectedCityName = this.cityName;
  }

  searchCity() {
    this.weatherService.searchCity(this.cityName)
      .subscribe(res => {
        if (!this.cityNameKey) {
          this.cityNameKey = res[0];
        }
        this.cityNames = res;
      })
  }

  findMe() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.weatherService.findMe(this.latitude,this.longitude)
        .subscribe(res => {
          this.selectedCityName = res.LocalizedName
          this.cityName = res.LocalizedName
        })
      });
    }
  }
  
//Selecting an option in autocomplete
  getOption(event) {
    this.cityNameKey = event.option.value
    this.cityName = this.cityNameKey.LocalizedName;
    this.selectedCityName = this.cityName;
    //Check if the city favorite
    if (this.cityNameKey = this.cityNameKey) {
      this.favoritesService.selectedCity = false;
    } else {
      this.favoritesService.selectedCity = true;
    }
  }
}
