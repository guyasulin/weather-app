import { Component, OnInit } from '@angular/core';
import { WeatherModel } from '../models/weatherModel';
import { FavoritesService } from '../services/favorites.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public favorites: WeatherModel[];

  constructor(
    public favoritesService: FavoritesService,
    public route: ActivatedRoute, public router:Router
    ) {     }

  ngOnInit() {
    this.favorites = this.favoritesService.getFaivorites()
  }

  navigateHome(day){
    this.router.navigate(['home', day])
  }
}