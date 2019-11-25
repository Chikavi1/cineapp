import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {
peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  slideOpts = {
    slidesPerView: 3,
    freeMode: true
  };
  favoritoGenero: any[] = [];
   constructor( private storage: Storage,
               private dataLocal: DataLocalService,
               private moviesService: MoviesService,
               public alertController: AlertController  ) { }

 ngOnInit() {
  }
 async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.pelisPorGenero( this.generos, this.peliculas );
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
  }

   async eliminar() {
    const alert = await this.alertController.create({
      header: '¿estas seguro?',
      message: 'Se eliminara todos las peliculas guardadas',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Si,Eliminar',
          cssClass: 'alertCustomCss',
          handler: () => {
            this.eliminapeliculas();
          }
        }
      ]
    });

    await alert.present();
  }

   eliminapeliculas(){
     this.storage.remove('peliculas');
    this.doRefresh(null);
  }

 async doRefresh(event) {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.pelisPorGenero( this.generos, this.peliculas );

    setTimeout(() => {
      event.target.complete();
    }, 1600);
  }
}
