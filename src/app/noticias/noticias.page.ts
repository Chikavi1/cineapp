import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import {EventoPage} from '../evento/evento.page';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  events:any = [];
  fecha;
  constructor(private EventService: MoviesService,private modalCtrl: ModalController) { 
  	this.fecha = "03/13/2020";

    this.EventService.getEvents().subscribe( data => {
      console.log("eventos cut")
     this.events = data;
     console.log(data);
    });

  }
  ngOnInit() {

  }
 async irEvento( title: string, image: string, description: string, fecha: string  ) {

    const modal = await this.modalCtrl.create({
      component: EventoPage,
      componentProps: {
         title,
         image,
         description,
         fecha
      }
    });

    modal.present();

  }

}
