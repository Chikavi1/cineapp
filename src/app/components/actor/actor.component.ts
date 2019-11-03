import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit {
@Input() id;
actor;
  constructor(private moviesService: MoviesService,private modalCtrl: ModalController) {

   }

  ngOnInit() {
  	    this.moviesService.getPerson(this.id).subscribe( resp => {
          console.log("Actor");
          this.actor = resp;
          console.log( resp );
        });
    }

    regresar() {
    this.modalCtrl.dismiss();
  }


}
