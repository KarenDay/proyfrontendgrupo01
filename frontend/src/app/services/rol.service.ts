import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  urlBase:string="http://localhost:3000/api/";
  constructor(private _http:HttpClient) { }

  public getRoles():Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
      }),
      params : new HttpParams()
    }
    return this._http.get(this.urlBase+"rol",httpOptions);
  }

  public createRol(rol:Rol):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams({
      })     
    }
    let body = JSON.stringify(rol);
    console.log(rol);
    return this._http.post(this.urlBase+"rol",body,httpOptions);
  }
  
  public updateRol(rol:Rol):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams({

      })
    }
    let body = JSON.stringify(rol);
    return this._http.put(this.urlBase+"rol/"+rol._id,body,httpOptions);
  }

  public getRol(id:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
      }),
      params : new HttpParams()
      //.append("id",id)
    }
    return this._http.get(this.urlBase+"rol/"+id,httpOptions);
  }

  public deleteRol(id:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
      }),
      params : new HttpParams()
      //.append("id",id)
    }
    return this._http.delete(this.urlBase+"rol/eliminar/"+id,httpOptions);
  }
  
  public buscarRolPorNombre(nombreRol:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
      }),
      params : new HttpParams()
      .append("nombreRol",nombreRol)
    }
    return this._http.get(this.urlBase+"rol/nombre",httpOptions);
  }
}
