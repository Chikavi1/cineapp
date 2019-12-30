import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  login(codigo,nip):any{
    //let headers = new Headers();
    return this.http.get("http://api.chikavi.com/api/authchikavi?codigo="+codigo+"&nip="+nip,{responseType: 'text'});
  }
}
