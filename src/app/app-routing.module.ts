import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
     path: 'movies', loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule) 
    },
  {
    path:'',redirectTo:'movies',pathMatch:'full'
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  
  {
    path:'**',component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
