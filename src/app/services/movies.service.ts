import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { environment } from '../../environments/environment';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl: string = 'https://api.themoviedb.org/3';
  carteleraPage = 1;
  cargando: boolean = false;

  constructor(private http: HttpClient) { }

  get params(){
    return { 
      api_key: '1c07947338be9b264658ad8dbbcbb30e',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera():Observable<Movie[]>{
    if(this.cargando){
      // cargando peliculas
      return of([]); // el of emite un observable, pero de acuerdo a el tipo en este caso es de un arreglo
    }
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`, {
      params: this.params
    }).pipe(
      map(( resp) => resp.results),
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    )
  }
  resetCarteleraPage(){
    this.carteleraPage = 1;
  }
  // https://api.themoviedb.org/3/search/movie
  buscarPelicula(texto: string): Observable<Movie[]> {
    const params = ({...this.params, page: '1', query: texto});
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie` , {
      params
    }).pipe( 
      map(resp => resp.results) 
    )
  }

  getPeluculaDetail(id: string) { 
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError(err => of(null))
    )
  }

  getCast(id: string): Observable<Cast[]> { 
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`,{
      params: this.params
    }).pipe(
      map(resp => resp.cast),
      catchError(err => of([]))
    );
  }
}
