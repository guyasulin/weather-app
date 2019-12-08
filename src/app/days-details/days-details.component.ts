import { Component, OnInit, Input } from '@angular/core';
import { WeatherModel } from '../models/weatherModel';

@Component({
  selector: 'app-days-details',
  templateUrl: './days-details.component.html',
  styleUrls: ['./days-details.component.scss']
})
export class DaysDetailsComponent implements OnInit {

  @Input() day:WeatherModel;
  
  constructor() { }

  ngOnInit() {
  }

}
