import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import {EventoPage} from '../evento/evento.page';
import { Router } from '@angular/router';
  @Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  events:any = [];
  fecha;

  constructor(private router:Router,private EventService: MoviesService,private modalCtrl: ModalController) {
  	this.fecha = "03/13/2020";

    this.EventService.getEvents().subscribe( data => {
     this.events = data;
     console.log(this.events);
    });
   }

  ngOnInit() {
  }
ircaca(caca){
this.router.navigate(['/evento',caca]);
}
doRefresh(event) {
    this.EventService.getEvents().subscribe( data => {
     this.events = data;
    });

    setTimeout(() => {
      event.target.complete();
    }, 1600);
  }


}
