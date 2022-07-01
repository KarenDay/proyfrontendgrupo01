import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medio } from '../models/medio';

@Injectable({
  providedIn: 'root'
})
export class MedioService {

  urlBase:string="http://localhost:3000/api/";
  constructor(private _http:HttpClient) { }

  public getMedios():Observable<any>{

    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
     
    }
    return this._http.get(this.urlBase+"medio",httpOptions);
  }

  public createMedio(medio:Medio):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams({

      })     
    }
    let body = JSON.stringify(medio);
    console.log(medio);
    return this._http.post(this.urlBase+"medio",body,httpOptions);
  }
  
  public updateMedio(medio:Medio):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        "Content-Type" : "application/json"
      }),
      params : new HttpParams({

      })
    }
    let body = JSON.stringify(medio);
    return this._http.put(this.urlBase+"medio/"+medio._id,body,httpOptions);
  }

  public getMedio(id:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      // .append("id",id)
    }
    return this._http.get(this.urlBase+"medio/"+id,httpOptions);
  }

  public deleteMedio(id:string):Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
      //.append("id",id)
    }
    return this._http.delete(this.urlBase+"medio/eliminar/"+id,httpOptions);
  }
}
