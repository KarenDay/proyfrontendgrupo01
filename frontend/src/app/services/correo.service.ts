import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CorreoService {
  
  constructor(private httpClient: HttpClient) {}

  public enviarCorreo(email: string, asunto: string, mensaje: string) {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    const body = new HttpParams()
      .set('email', email)
      .set('asunto', asunto)
      .set('mensaje', mensaje);

    return this.httpClient.post(
      'http://localhost:3000/envio',
      body,
      httpOptions
    );
  }
}

