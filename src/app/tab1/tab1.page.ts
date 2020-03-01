import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { NavController } from "@ionic/angular";
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { Tab3Page } from '../tab3/tab3.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];
  nombre;
  peliculas;
  usuario_verificado;

  constructor( private moviesService: MoviesService,private modalCtrl: ModalController,public navCtrl: NavController) {
    this.nombre = localStorage.getItem("nombre");
    this.usuario_verificado  = localStorage.getItem("clave");
  }

 async verDetalle( id: string ) {

    const modal = await this.modalCtrl.create({
      component: Tab3Page,
      componentProps: {
        id
      }
    });
    
    modal.present();
  
  }
doRefresh(event) {
    this.moviesService.getCarteleraCut().subscribe( data => {
      console.log("cartelera cut")
     this.peliculas = data;
     console.log(data);
    });

    setTimeout(() => {
      event.target.complete();
    }, 1600);
  }

cerrar_sesion(){
  this.navCtrl.navigateRoot("/login");
  localStorage.removeItem("login");
  localStorage.removeItem("clave");
  localStorage.removeItem("nombre");
}
  ngOnInit() {

    this.moviesService.getCarteleraCut().subscribe( data => {
      console.log("cartelera cut")
     this.peliculas = data;
     console.log(data);
    });

    this.moviesService.getFeature()
      .subscribe( resp => {
        this.peliculasRecientes = resp.results;
      });

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares()
    .subscribe( resp => {
      // console.log('Populares', resp.results);
      const arrTemp = [ ...this.populares, ...resp.results ];
      this.populares = arrTemp;

    });
  }

}
