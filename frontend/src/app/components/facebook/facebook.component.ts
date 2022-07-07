import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';


@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css'],
})
export class FacebookComponent implements OnInit {
  mensaje: string = '';
  url: string = '';
  stringimage: string = '';
  /**
   * Identificador de la página: "101539232629766"
   * Identificador de la app: "1677990999229697"
   */

  constructor(private fb: FacebookService) {
    this.iniciarFb();
  }

  ngOnInit(): void {}

  /**
   * Postear solo texto
   */
  postFb() {  
    var apiMethod: ApiMethod = 'post';
    //aqui va el Identificador de la página
    this.fb.api('/101539232629766/feed', apiMethod, {
      message: this.mensaje,
      access_token:
        'EAAX2H7lyBQEBAG7bAYBM1VIb7C4v8XWmm8Jd4fcLktWIqSAAGLeK2JycWaMeMesmYQSxZAVbliSWZCSrERSNE8BZC7FaWr6ioz7SIGDpIzyDjejwIQVTjZCfHN0qZAiZBmd8HwzDnP90GdqmBwss6ZCa3T9610EbkPtpTOcVVWmSwsHfUbi3N7bDzYO6XGvom2YJUj3NRlIm7z0ToER3Fi4',
    });
  }

  /**
   * Postear con IMG via URL
   */
  postFbConURLFoto(urlFb:string,mensajeFb:string) {
    var apiMethod: ApiMethod = 'post';
    //aqui va el Identificador de la página
    this.fb.api('/101539232629766/photos', apiMethod, {
      url:urlFb,
      message:mensajeFb,
      access_token:
        'EAAX2H7lyBQEBAG7bAYBM1VIb7C4v8XWmm8Jd4fcLktWIqSAAGLeK2JycWaMeMesmYQSxZAVbliSWZCSrERSNE8BZC7FaWr6ioz7SIGDpIzyDjejwIQVTjZCfHN0qZAiZBmd8HwzDnP90GdqmBwss6ZCa3T9610EbkPtpTOcVVWmSwsHfUbi3N7bDzYO6XGvom2YJUj3NRlIm7z0ToER3Fi4',
    });
  }

   iniciarFb() {
    let initParams: InitParams = {
      appId: '1677990999229697',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v14.0',
    };
    this.fb.init(initParams);
  } 
  //NO EN uSO

  // postFbConFoto() {
  //   var apiMethod: ApiMethod = 'post';
  //   //aqui va el Identificador de la página
  //   this.fb.api('/101539232629766/uploads', apiMethod, {
  //     file_type: 'image/png',
  //     file_length: this.stringimage,
  //     access_token:
  //       'EAAX2H7lyBQEBAG7bAYBM1VIb7C4v8XWmm8Jd4fcLktWIqSAAGLeK2JycWaMeMesmYQSxZAVbliSWZCSrERSNE8BZC7FaWr6ioz7SIGDpIzyDjejwIQVTjZCfHN0qZAiZBmd8HwzDnP90GdqmBwss6ZCa3T9610EbkPtpTOcVVWmSwsHfUbi3N7bDzYO6XGvom2YJUj3NRlIm7z0ToER3Fi4',
  //   });
  // } 

}
