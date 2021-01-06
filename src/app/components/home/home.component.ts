import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  constructor(private moviesService: MoviesService) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

   if(pos > max){
     //* llamar el servicio
     this.moviesService.getCartelera().subscribe( movie => { 
       this.movies.push(...movie);
     })
   } 
  }

  ngOnInit(): void {
    this.getMovies(); 
  }

  ngOnDestroy(){
    this.moviesService.resetCarteleraPage();
  }

  getMovies(){
    this.moviesService.getCartelera().subscribe(movies => {
      this.movies = movies;
      this.moviesSlideShow = movies;
    })
  }

}
