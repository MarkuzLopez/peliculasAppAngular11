import { Component } from '@angular/core';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba';
  // constructor(private moviesService: MoviesService){
  //   this.moviesService.getCartelera().subscribe( res =>  {
  //     console.log(res);
  //   })
  // }
}
