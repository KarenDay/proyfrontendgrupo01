import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../models/area';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  urlBase:string="http://localhost:3000/api/";

  constructor(private _http:HttpClient) { }

  public getAreas():Observable<any>{

    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
     
    }
    return this._http.get(this.urlBase+"area",httpOptions);
  }

  public createArea(area:Area):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams({

      })     
    }
    let body = JSON.stringify(area);
    console.log(area);
    return this._http.post(this.urlBase+"area",body,httpOptions);
  }
  
  public updateArea(area:Area):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams({

      })
    }
    let body = JSON.stringify(area);
    return this._http.put(this.urlBase+"area/update",body,httpOptions);
  }

  public getArea(id:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      .append("id",id)
    }
    return this._http.get(this.urlBase+"area/getArea",httpOptions);
  }

  public deleteArea(id:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      .append("id",id)
    }
    return this._http.delete(this.urlBase+"area/delete",httpOptions);
  }

  public addResponsable(idArea:string,responsable:Persona):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams()
      .append("id",idArea)     
      .append("idResponsable",responsable._id)
    }
    let body = JSON.stringify(responsable);
    return this._http.post(this.urlBase+"area/addResponsable",null,httpOptions);
  }

  public deleteResponsable(idArea:string,idResponsable:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      .append("id",idArea)
      .append("idResponsable",idResponsable)
    }
    return this._http.delete(this.urlBase+"area/deleteResponsable",httpOptions);
  }
}
