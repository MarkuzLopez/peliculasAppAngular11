import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public texto: string = '';
  public moviesSearch: Movie[] = [];

  constructor(private activatedRouter: ActivatedRoute,
              private moviServices: MoviesService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( params =>  {
      this.texto = params.word;
      this.moviServices.buscarPelicula(params.word ).subscribe(resp => {
        this.moviesSearch = resp;
      })
    })
  }

}
