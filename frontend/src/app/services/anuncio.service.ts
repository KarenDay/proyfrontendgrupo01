import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../models/anuncio';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  urlBase:string="http://localhost:3000/api/";
  constructor(private _http:HttpClient) { }

  public getAnuncios():Observable<any>{

    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
     
    }
    return this._http.get(this.urlBase+"anuncio/",httpOptions);
  }

  public obtenerCodigoQR(url:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      .append("url",url)
    }
    return this._http.get(this.urlBase+"anuncio/codigoqr",httpOptions);
  }

  public createAnuncio(anuncio:Anuncio):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams({

      })     
    }
    let body = JSON.stringify(anuncio);
     console.log("Enviado al backend: ");
     console.log(anuncio);

    return this._http.post(this.urlBase+"anuncio/",body,httpOptions);
  }
  
  public updateAnuncio(anuncio:Anuncio):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams({

      })
    }
    let body = JSON.stringify(anuncio);
    return this._http.put(this.urlBase+"anuncio/"+anuncio._id,body,httpOptions);
  }

  public getAnuncio(id:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      // .append("id",id)
    }
    return this._http.get(this.urlBase+"anuncio/"+id,httpOptions);
  }

  public deleteAnuncio(id:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      //.append("id",id)
    }
    return this._http.delete(this.urlBase+"anuncio/eliminar/"+id,httpOptions);
  }

  public getAnuncioPorArea(idArea:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      .append("area",idArea)
    }
    return this._http.get(this.urlBase+"anuncio/filtro/area",httpOptions);
  }

  public getAnuncioPorRedactor(idRedactor:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      .append("redactor",idRedactor)
    }
    return this._http.get(this.urlBase+"anuncio/filtro/redactor",httpOptions);
  }

  public getAnuncioPorAutorizar(idArea:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      .append("area",idArea)
    }
    return this._http.get(this.urlBase+"anuncio/filtro/areaYestado",httpOptions);
  }


}
