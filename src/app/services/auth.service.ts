import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: Http) { }

  login(codigo,nip):any{
    let headers = new Headers();
    return this.http.get("http://api.chikavi.com/api/authchikavi?codigo="+codigo+"&nip="+nip,{headers: headers});
  }
}
