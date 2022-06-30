import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hostBase: string= "http://localhost:3000/api/usuario/";
  invitedIn:boolean=false;
  constructor(private _http:HttpClient) { }

  public createUser(usuario:Usuario):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      }) 
      } 
      let body = JSON.stringify(usuario);
      console.log(body);
      return this._http.post(this.hostBase, body, httpOption);

  }
  public login(username: string, password: string):Observable<any> {
    const httpOption = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    }) 
    } 
    let body = JSON.stringify({ username: username, password: password });
    console.log(body);
    return this._http.post(this.hostBase + 'login', body, httpOption);
  }
  
  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("userid");
  } 
  
  public userLoggedIn(){
    var resultado = false;
    var usuario = sessionStorage.getItem("user");
    
    if(usuario!=null){
    resultado = true;
    }
    return resultado;
  }

  public userRolLoggedIn(){
    var rol= sessionStorage.getItem("rol");
    if(rol!="ADMINISTRADOR" && rol!="ENCARGADO")
      rol="BASICO";
    return rol;
  }

  public userLogged(){
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }

  public idLogged(){
    var id = sessionStorage.getItem("userid");
    return id;
  }

  public getUsuarioByPersona(idPersona:string):Observable<any>{
    console.log("id a buscar :"+idPersona);
    const httpOptions={
      headers: new HttpHeaders({
      
      }),
      params : new HttpParams()
      .append("idPersona",idPersona)
    }
    console.log(idPersona);
    return this._http.get(this.hostBase+"filtro/persona",httpOptions);
  }
  
}
