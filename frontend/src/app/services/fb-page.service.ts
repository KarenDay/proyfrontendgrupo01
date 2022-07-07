import { Injectable } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';
@Injectable({
  providedIn: 'root'
})
export class FbPageService {
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
  postFb(mensaje :string) {
    var apiMethod: ApiMethod = 'post';
    //aqui va el Identificador de la página
    this.fb.api('/101539232629766/feed', apiMethod, {
      message: mensaje,
      access_token:
        'EAAX2H7lyBQEBAGXp1C7Csenm9xZA8EVzcwibLEwHR3xKSgyNKYzVkdF7B3CwLLrB8RuD2jkHcH5YWCrIbAZAZC2TnjGd2YTiOW1GoilEFhA0f4ZB9qghMKJhglnwiMDZAB7PJbAJAb7e8Fqv0Tdx77Svi42fwm6peQhJWhIlp63HZBA1s48RU3G2A4AgewYPRqpOrz5ii4DPVbQu8ZAMJ5j',
    });
  }

  /**
   * Postear con IMG via URL
   */
    postFbConURLFoto(urlFb:string,mensajeFb:string) {
    var apiMethod: ApiMethod = 'post';
    console.log(this.stringimage);
    //aqui va el Identificador de la página
    this.fb.api('/101539232629766/photos', apiMethod, {
      url:urlFb,
      message:mensajeFb,
      access_token:
        'EAAX2H7lyBQEBAGXp1C7Csenm9xZA8EVzcwibLEwHR3xKSgyNKYzVkdF7B3CwLLrB8RuD2jkHcH5YWCrIbAZAZC2TnjGd2YTiOW1GoilEFhA0f4ZB9qghMKJhglnwiMDZAB7PJbAJAb7e8Fqv0Tdx77Svi42fwm6peQhJWhIlp63HZBA1s48RU3G2A4AgewYPRqpOrz5ii4DPVbQu8ZAMJ5j',
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

  /* postFbConFoto() {
    var apiMethod: ApiMethod = 'post';
    console.log(this.stringimage);
    //aqui va el Identificador de la página
    this.fb.api('/108359151925170/uploads', apiMethod, {
      file_type: 'image/jpeg',
      file_length: this.stringimage,
      access_token:
        'EAAX2H7lyBQEBAHZAZAE7Ud4pZCqejGG7mHSOugGTSw2pFCGzZApGKgjJAsMsgv9R06aOvrB6Hra0f2zoE1PzIC3Lb7ospJf2VDtZCBFBeNsC2oHwp1iwUt92awhu19ZCXcwGf500FX3ZCZCzRfn1lalA8WV8VP5OnXudko7cR8fYjCRHPB0egwellVr7KJJghSZBP3mU1d1kiPoGNyd1GbEfy',
    });
  } */


}
