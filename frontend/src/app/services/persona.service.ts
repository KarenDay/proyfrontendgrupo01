import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  urlBase:string="http://localhost:3000/api/";

  constructor(private _http:HttpClient) { }

  public getPersonas():Observable<any>{

    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
     
    }
    return this._http.get(this.urlBase+"persona",httpOptions);
  }

  public createPersona(persona:Persona):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams({

      })     
    }
    let body = JSON.stringify(persona);
    console.log(persona);
    return this._http.post(this.urlBase+"persona",body,httpOptions);
  }
  
  public updatePersona(persona:Persona):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams({

      })
    }
    let body = JSON.stringify(persona);
    console.log(persona);
    return this._http.put(this.urlBase+"persona/update",body,httpOptions);
  }

  public getPersona(id:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      .append("id",id)
    }
    return this._http.get(this.urlBase+"persona/getPersona",httpOptions);
  }

  public deletePersona(id:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      .append("id",id)
    }
    return this._http.delete(this.urlBase+"persona/delete",httpOptions);
  }

  public addRol(rol:Rol,idPersona:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams()
      .append("id",idPersona)     
      .append("idRol",rol._id)
    }
    let body = JSON.stringify(rol);
    //console.log(rol);
    return this._http.put(this.urlBase+"persona/addRol",null,httpOptions);
  }

  public deleteRol(idPersona:string,idRol:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      .append("id",idPersona)
      .append("idRol",idRol)
    }
    return this._http.delete(this.urlBase+"persona/deleteRol",httpOptions);
  }

  public getPersonaByDni(dni:number):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      .append("dni",dni)
    }
    return this._http.get(this.urlBase+"persona/filtro/dni",httpOptions);
  }
}
