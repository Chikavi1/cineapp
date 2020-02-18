 import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {
dia;
fecha;
hora;
@Input() title;
id;
  event:any = [];
  constructor(private EventService: MoviesService,private route: ActivatedRoute) { 
      
   this.id =  this.route.snapshot.paramMap.get('id');

  	 
  	
    this.EventService.getEvent(this.id).subscribe( data => {
      console.log("eventos cut")
     this.event = data;
     this.fecha = this.event.fecha;
     this.hora = this.event.hora;
     console.log(data);
    });

    this.dia = new Date(this.fecha);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric' };
    this.fecha = this.dia.toLocaleDateString("es-ES", options);


  }

  ngOnInit() {
  }

}
