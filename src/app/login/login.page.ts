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
    localStorage.setItem("login","true");
  }

  login(){	
    var element = <HTMLInputElement> document.getElementById("login");
    element.disabled = true;

    this.authService.login(this.codigo,this.nip).subscribe((data)=>{


      console.log(data);
    	if(data == "incorrecto"){
            console.log("error");

            element.disabled = false;
            this.presentAlert("Error","Verifica tu código y nip");
          }else{
            data = "¡HOLA "+data+ " !";
            this.presentAlert("Bienvenido ",data);
            localStorage.setItem("clave",this.codigo);
            localStorage.setItem("nombre",data);
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

