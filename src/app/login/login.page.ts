import { Component, OnInit,ViewChild } from '@angular/core';
import { LoadingController, AlertController, NavController } from "@ionic/angular";
import { AuthService } from 'src/app/services/auth.service';
import {Tab1Page} from '../tab1/tab1.page.ts';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 codigo:any;
 nip:any;
  constructor(public authService:AuthService,public navCtrl: NavController) { }

  ngOnInit() {
  }

   ingresar(){

    this.navCtrl.navigateRoot('/');
  }

  login(){	
    var element = <HTMLInputElement> document.getElementById("login");
    element.disabled = true;

    this.authService.login(this.codigo,this.nip).subscribe((data)=>{
    	if(data._body == "incorrecto"){
            console.log("error");
            element.disabled = false;
            //m
          }else{
          	//m
            localStorage.setItem("clave",this.codigo);
            localStorage.setItem("nombre",data._body);
            this.ingresar();
          }
    })

          }

}

