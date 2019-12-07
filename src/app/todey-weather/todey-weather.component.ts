import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherModel } from '../models/weatherModel';

@Component({
  selector: 'app-todey-weather',
  templateUrl: './todey-weather.component.html',
  styleUrls: ['./todey-weather.component.scss']
})
export class TodeyWeatherComponent implements OnInit {
  
  @Input() WeatherText:boolean = false;
  @Input() today:WeatherModel;
  @Input() cityeName:string;;
  @Output() changeMetricC = new EventEmitter()
  @Output() changeMetricF = new EventEmitter()

  public showTemperatureF:boolean ;
  public showTemperatureC:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  changeMetricDataC() {
    this.changeMetricC.emit()
    if(this.showTemperatureC = true) {
      this.showTemperatureF = false
    }
  }

  changeMetricDataF() {
    this.changeMetricF.emit()
    if(this.showTemperatureF = true) {
      this.showTemperatureC = false
    }
  }
}
