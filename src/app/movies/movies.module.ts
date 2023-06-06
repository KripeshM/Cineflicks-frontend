import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { WatchlaterComponent } from './watchlater/watchlater.component';
import { ViewMovieComponent } from './view-movie/view-movie.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    MoviesComponent,
    AllMoviesComponent,
    WatchlaterComponent,
    ViewMovieComponent,
    FavoriteComponent,
    HeaderComponent,
    FooterComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
    DatePipe
  ]
})
export class MoviesModule { }
