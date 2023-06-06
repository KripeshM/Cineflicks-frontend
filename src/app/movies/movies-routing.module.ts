import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { WatchlaterComponent } from './watchlater/watchlater.component';
import { ViewMovieComponent } from './view-movie/view-movie.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
  {
     path: '', component: HomePageComponent 
  },
  {
    path:'allmovies',component:AllMoviesComponent
  },
  {
    path:'allmovies/watchlater',component:WatchlaterComponent
  },
  {
    path:'allmovies/view-movie/:id',component:ViewMovieComponent
  },
  {
    path:'allmovies/favourite',component:FavoriteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
