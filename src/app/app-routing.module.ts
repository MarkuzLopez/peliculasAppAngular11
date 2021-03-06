import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }, 
  {
    path: 'movie/:id',
    component: MovieComponent
  },
   {
     path: 'search/:word',
     component: SearchComponent
   },
   {
     path: '**',
     redirectTo: '/home'
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
