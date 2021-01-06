import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input()
  movies: Movie[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {    
  }

  onMovieClick(movie: Movie)  { 
    this.router.navigate(['movie', movie.id]);
  }

}
