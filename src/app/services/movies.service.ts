import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL    = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>( query: string ) {

    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;

    return this.http.get<T>( query );

  }

  getPopulares() {

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;

    return this.ejecutarQuery<RespuestaMDB>(query);

  }

  buscarPeliculas( texto: string ) {
    return this.ejecutarQuery(`/search/movie?query=${ texto }`);

  }


  getFeature() {

    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;

    if ( mes < 10 ) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }


    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin    = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;


    // tslint:disable-next-line:max-line-length
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);


  }
  getCarteleraCut(){
            return this.http.get("https://assets.chikavi.com/api/movies");
  }

  getVotos(){
    return this.http.get("https://assets.chikavi.com/api/estadisticas");
  }
  votarCartelera(id_movie,code){
    return this.http.get("https://assets.chikavi.com/api/votes/create?id_movie="+id_movie+"&code="+code);
  }

  getEvents(){
    return this.http.get("https://assets.chikavi.com/api/events");
  }

  getEvent(id_event){
    return this.http.get("https://assets.chikavi.com/api/events/"+id_event);
  }




  getPeliculaDetalle( id: string ) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  getActoresPelicula( id: string ) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
  }

  getSimilarMovies(id: string){
     return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/similar?a=1`);
  }

  getVideos(id:string){
    return this.ejecutarQuery<any>(`/movie/${ id }/videos?a=1`);
  }

  getPerson(person_id){
    return this.ejecutarQuery<RespuestaCredits>(`/person/${ person_id }?a=1`);
  }

  cargarGeneros(): Promise<Genre[]> {

    return new Promise( resolve => {

      this.ejecutarQuery(`/genre/movie/list?a=1`)
        .subscribe( resp => {
          this.generos = resp['genres'];
          console.log(this.generos);
          resolve(this.generos);
        });

    });


  }

}
