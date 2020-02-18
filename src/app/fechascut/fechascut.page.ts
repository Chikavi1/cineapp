import { Component, OnInit,Input } from '@angular/core';
import { ModalController,ToastController,ActionSheetController  } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-fechascut',
  templateUrl: './fechascut.page.html',
  styleUrls: ['./fechascut.page.scss'],
})
export class FechascutPage implements OnInit {
@Input() dia_cut;
@Input() hora_cut;
@Input() titulo;
@Input() imagen;

    dia;
    fecha;
  constructor(private modalCtrl: ModalController,
              public toastController: ToastController,
              private localNotifications: LocalNotifications,
              public actionSheetController: ActionSheetController) { 

  }

  ngOnInit() {
    
    this.imagen = "https://image.tmdb.org/t/p/w500"+this.imagen;
  	this.dia = new Date(this.dia_cut);
    console.log(this.dia);

    var horacompleta = this.hora_cut.split(":",2);

    var hora = horacompleta[0];
    console.log(hora);

    var minuto = horacompleta[1];
    console.log(minuto);

    //dia completo
  	this.dia.setHours(hora,minuto);
  	console.log(this.dia);

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric' };
  	this.fecha = this.dia.toLocaleDateString("es-ES", options);
  	console.log(this.fecha)
  }


    regresar() {
    this.modalCtrl.dismiss();
  }

  disablebtn(){
    var element = <HTMLInputElement> document.getElementById("btnrecordar");
    element.disabled = true;
  }
  recordar(text){

    if(text == "1 hora antes"){
        this.eventRecord(1);
        this.disablebtn();
    }else if(text == "6 horas antes"){
        this.eventRecord(6);
        this.disablebtn();

    }else if(text == "1 dia antes"){
      this.eventRecord(24);
      this.disablebtn();
    }
  	this.mostrar_toast("Se te recordara "+text+" de la función.");
  }

  eventRecord(hora){

    this.dia.setHours(this.dia.getHours() - hora);
    console.log(this.dia);

  	this.localNotifications.schedule({
	   title: 'Aviso de pelicula',
     text: 'La pelicula empieza en '+ hora +' hr',
	   smallIcon: 'res://calendar',
     icon: 'https://image.flaticon.com/icons/png/512/1179/1179069.png',
     attachments: [this.imagen],
     lockscreen : true,
     priority: 2,
     groupSummary: true,
	   //trigger: {at: new Date(this.dia)},
     trigger: {at: this.dia },
	   led: 'FF0000',
	   sound: 'https://notificationsounds.com/soundfiles/9cf81d8026a9018052c429cc4e56739b/file-sounds-1145-when.mp3',
     vibrate: true,
     autoClear: true,
     foreground: true,
     actions: [
      { id: 'yes', title: 'Cerrar' }
      ]
	});
  }

   async mostrar_toast(texto) {
    const toast = await this.toastController.create({
      message: texto,
      mode: "ios",
      duration: 2000
    });
    toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '¿A qué hora te gustaría que te recordara?',
      mode: "md",
      buttons: [{
        text: '1 hora antes',
        
        handler: () => {
          this.recordar('1 hora antes');
        }
      }, {
        text: '6 horas antes',
        
        handler: () => {
          this.recordar('6 horas antes');
        }
      }, {
        text: '1 dia antes',
        
        handler: () => {
          this.recordar('1 dia antes');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('cancelo');
        }
      }]
    });
    await actionSheet.present();
  }


}
