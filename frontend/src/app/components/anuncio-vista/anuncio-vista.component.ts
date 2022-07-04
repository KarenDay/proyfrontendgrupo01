import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Medio } from 'src/app/models/medio';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-anuncio-vista',
  templateUrl: './anuncio-vista.component.html',
  styleUrls: ['./anuncio-vista.component.css']
})
export class AnuncioVistaComponent implements OnInit {
  indice! :number;
  anuncios:Array<Anuncio>= new Array<Anuncio>();
  anuncio:Anuncio=new Anuncio();
  myAngularxQrCode!:any;

  qrCodeDownloadLink: SafeUrl = "";
  constructor(
              private anuncioService:AnuncioService) {
                this.cargarAnuncios();
                this.iniciar();
                this.myAngularxQrCode="https://d7d4-2803-cf00-3ff-100-903b-1bbe-4bdb-2f5b.sa.ngrok.io/index";
                //this.myAngularxQrCode="";
               }

  ngOnInit(): void {
   //this.util.crearUsuariosPorDefecto();
  }


  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  cargarAnuncios(){
    this.anuncios= new Array<Anuncio>();
    this.anuncioService.getAnuncios().subscribe(
      result=>{
        console.log(result);
        result.forEach((item:any) => {
          var anuncio = new Anuncio();
          var medios = new Array<Medio>();
          var destinatario = new Rol();
          //var recursos = new Array<string>();
          var redactor = new Persona();
          var area =  new Area();
          Object.assign(area,item.area);
          Object.assign(redactor,item.redactor);
          Object.assign(destinatario,item.destinatario);
          item.mediosDePublicacion.forEach((imedio:any) => {
            console.log(imedio);
            var medio = new Medio();
            Object.assign(medio,imedio);
            medios.push(medio);  
          });
          // item.recursos.forEach((irecurso:any) => {
          //   console.log(irecurso);
          //   var recurso:string="" ;
          //   Object.assign(recurso,irecurso);
          //   recursos.push(recurso);  
          // });
          anuncio.redactor= redactor;
          anuncio.area=area;
          //anuncio.destinatario= destinatario;
          anuncio.mediosDePublicacion=medios;
         // anuncio.recursos=recursos;
          
          Object.assign(anuncio,item);
          this.anuncios.push(anuncio);
          this.iniciar();
        });
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  iniciar(){
    this.anuncio = new Anuncio();
    this.indice=0;
    if (this.indice < this.anuncios.length){
        this.anuncio = this.anuncios[this.indice];
        this.myAngularxQrCode="http://localhost:4200/anuncio-recursos/"+this.anuncios[this.indice]._id;
        console.log(this.myAngularxQrCode);
    }
  }

  siguiente(){
    this.indice = this.indice +1;
    if (this.indice < this.anuncios.length){
      this.anuncio = this.anuncios[this.indice];
      this.myAngularxQrCode="http://localhost:4200/anuncio-recursos/"+this.anuncios[this.indice]._id;
        console.log(this.myAngularxQrCode);
    }else{
      this.indice = 0;
      this.iniciar();
      this.myAngularxQrCode="http://localhost:4200/anuncio-recursos/"+this.anuncios[this.indice]._id;
        console.log(this.myAngularxQrCode);
    }

  }

  anterior(){
    this.indice = this.indice -1;
    if (this.indice >=0) {
      this.anuncio = this.anuncios[this.indice];
      this.myAngularxQrCode="http://localhost:4200/anuncio-recursos/"+this.anuncios[this.indice]._id;
        console.log(this.myAngularxQrCode);
    }else{
      this.indice=this.anuncios.length-1;
      this.anuncio =this.anuncios[this.indice];
      this.myAngularxQrCode="http://localhost:4200/anuncio-recursos/"+this.anuncios[this.indice]._id;
        console.log(this.myAngularxQrCode);
    }

  }

}