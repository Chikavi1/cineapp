import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];
  votos;
  constructor( private dataLocal: DataLocalService,
               private moviesService: MoviesService,
               private modalCtrl: ModalController ) {

        this.moviesService.getVotos().subscribe(
          data =>{
            this.votos = data;
            console.log(data);

          } 
        );


      }


  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.pelisPorGenero( this.generos, this.peliculas );
  }

async verDetalle( id: string) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
         id
      }
    });

    modal.present();
}

  pelisPorGenero( generos: Genre[], peliculas: PeliculaDetalle[]  ) {


    this.favoritoGenero = [];

    generos.forEach( genero => {

      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find( genre => genre.id === genero.id );
        })
      });

    });

    console.log(this.favoritoGenero);


  }

  ionViewDidEnter() {
  }



}
