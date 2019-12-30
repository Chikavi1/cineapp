import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
import { ActorComponent } from '../actor/actor.component';
import { ToastController } from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';
import { FechascutPage } from 'src/app/fechascut/fechascut.page';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  @Input() dia_cut;
  @Input() id;
  @Input() imagen;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline';
  mostrar = false;

  similares = {};
  director;
  video;
  videoUrl;
  slideOptActores = {
    slidesPerView: 2.97,
    freeMode: true,
    spaceBetween: 0
  };

slideOptSimilares  = {
   slidesPerView: 1.32,
    freeMode: true,
    spaceBetween: 0
}
  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController,
               private dataLocal: DataLocalService,
               public toastController: ToastController,public sanitizer: DomSanitizer ) {
            var dia = new Date(this.dia_cut);
            console.log(this.dia_cut);

             setTimeout(() => {
             this.mostrar = true;
            }, 2200);


                }
            
   async mostrarfechas(dia_cut,hora_cut,imagen){

      const modal = await this.modalCtrl.create({
      component: FechascutPage,
      componentProps: {
        dia_cut,
        hora_cut,
        imagen
      }
    });

    modal.present();
  }

  async showActor(id){

      const modal = await this.modalCtrl.create({
      component: ActorComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }


  async mostrar_toast(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

  async showMovie(id){
     this.moviesService.getPeliculaDetalle(id).subscribe( resp => {
          console.log("peli simi");
          console.log( resp );
        });

     this.regresar();

      const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

  ngOnInit() {
    // console.log('ID', this.id );
    this.moviesService.getVideos(this.id).subscribe( resp => {
            if(resp.results[0].key){
            this.videoUrl = "https://www.youtube.com/watch?v="+resp.results[0].key;
          }
        });


    this.dataLocal.existePelicula( this.id )
      .then( existe => this.estrella = ( existe ) ? 'remove' : 'bookmark' );
      
     this.moviesService.getSimilarMovies(this.id).subscribe( resp => {
         console.log("similar");
          console.log( resp['results']   );
          this.similares = resp['results'];
        });

    this.moviesService.getPeliculaDetalle( this.id )
        .subscribe( resp => {
          console.log( resp );
          this.pelicula = resp;
        });

    

    this.moviesService.getActoresPelicula( this.id )
        .subscribe( resp => {
          console.log( resp );
         var directors = [];
          resp.crew.forEach(function(entry){
              if (entry.job === 'Director') {
                  directors.push(entry.name);
              }
          })
          this.director = directors;
          console.log('Director: ' + directors.join(', '));

          this.actores = resp.cast;
        });

  }

  proponer(id){
    console.log("porponer");
    console.log(id);
    console.log(localStorage.getItem("clave"));

    this.moviesService.votarCartelera(id,localStorage.getItem("clave"))
      .subscribe( resp =>{
        this.mostrar_toast(resp)
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula( this.pelicula );
    this.estrella = ( existe ) ? 'remove' : 'bookmark';
  }

}
