import { Component, OnInit, Input  } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-cut',
  templateUrl: './slideshow-cut.component.html',
  styleUrls: ['./slideshow-cut.component.scss']
})
export class SlideshowCutComponent implements OnInit {
@Input() peliculas: Pelicula[] = [];

  constructor(private modalCtrl: ModalController) { }
  slideOpts = {
    slidesPerView: 3,
    freeMode: false
  };

  ngOnInit() {
  }


  async verDetalle( id: string,dia_cut: string,hora_cut: string,imagen: string  ) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
         id,
         dia_cut,
         hora_cut,
         imagen

      }
    });

    modal.present();

  }

}
