import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  pelicula!: MovieResponse;
  cast: Cast[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private movieService: MoviesService,
              private location: Location,
              private router: Router ) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    // recibe una cantidad x de observables y regresa un opbjeto, que en realidad es un arreglo
    // reduce bastante codigo
    combineLatest([
      this.movieService.getPeluculaDetail(id),
      this.movieService.getCast(id)
    ]).subscribe(([peliculaDetail, castArray]) => { 
      if(!peliculaDetail){
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = peliculaDetail;
      this.cast = castArray;
    })
  }

  // getMovieDetail(id: string){
  //   this.movieService.getPeluculaDetail(id).subscribe( detail => {
  //     if(!detail){
  //       this.router.navigateByUrl('/home');
  //       return;
  //     }
  //     this.pelicula = detail;
  //   });
  // }

  onRegresar(){
    this.location.back();
  }

  // getCast(id: string){
  //   this.movieService.getCast(id).subscribe(cast => {
  //     this.cast = cast.filter(actor => actor.profile_path !== null);
  //   })
  // }
}
