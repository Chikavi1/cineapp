import { Component, OnInit,ViewChild } from '@angular/core';
import { LoadingController, AlertController, NavController } from "@ionic/angular";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 codigo:any;
 nip:any;
  constructor(public authService:AuthService,public navCtrl: NavController,public alertController:AlertController) { }

  ngOnInit() {
  }

   ingresar(){

    this.navCtrl.navigateRoot('/tab1');
  }

  login(){	
    var element = <HTMLInputElement> document.getElementById("login");
    element.disabled = true;

    this.authService.login(this.codigo,this.nip).subscribe((data)=>{
    	if(data._body == "incorrecto"){
            console.log("error");
            element.disabled = false;
            this.presentAlert("Error","Verifica tu código y nip");
          }else{
          	this.presentAlert("Bienvenido","¡Hola "+data._body+" !");
            localStorage.setItem("clave",this.codigo);
            localStorage.setItem("nombre",data._body);
            this.ingresar();
          }
    })

          }

  async presentAlert(status,mensaje) {
    const alert = await this.alertController.create({
      header: status,
      message: mensaje,
      buttons: ['Entendido']
    });

    await alert.present();
  }

}

