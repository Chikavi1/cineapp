import { Component, OnInit,Input } from '@angular/core';
import { ModalController,ToastController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-fechascut',
  templateUrl: './fechascut.page.html',
  styleUrls: ['./fechascut.page.scss'],
})
export class FechascutPage implements OnInit {
@Input() dia_cut;
@Input() hora_cut;

  constructor(private modalCtrl: ModalController,public toastController: ToastController,private localNotifications: LocalNotifications) { 

  }

  ngOnInit() {
  	var dia = new Date(this.dia_cut);
    console.log(this.hora_cut);

    var horacompleta = this.hora_cut.split(":",2);
    console.log(horacompleta);  

    var hora = horacompleta[0];
    console.log(hora);

    var minuto = horacompleta[1].slice(0,-3);
    console.log(minuto);

  	dia.setHours(hora,minuto);
  	console.log(dia);
 
  	dia.setHours(dia.getHours() - 1);
  	console.log(dia);

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric' };
  	var fecha = new Date(this.dia_cut);

  	this.dia_cut = dia.toLocaleDateString("es-ES", options);
  	console.log(this.dia_cut)
  }


    regresar() {
    this.modalCtrl.dismiss();
  }
  recordar(){
  	this.mostrar_toast("Se te recordara una hora antes de la función.");
  }

  eventRecord(){
  	this.localNotifications.schedule({
	   text: 'Pelicula 1',
	   smallIcon: 'res://calendar',
       icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
       attachments: ['https://image.tmdb.org/t/p/w600_and_h900_bestv2/xV53cRJDjJEyLVDDcumxx3O6CTB.jpg'],
	   trigger: {at: new Date(this.dia_cut)},
	   led: 'FF0000',
	   sound: 'file://sound.mp3'
	});
  }

   async mostrar_toast(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

}
