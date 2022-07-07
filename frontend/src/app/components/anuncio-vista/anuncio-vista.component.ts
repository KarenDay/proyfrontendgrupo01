import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Anuncio } from 'src/app/models/anuncio';
import { Persona } from 'src/app/models/persona';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-anuncio-vista',
  templateUrl: './anuncio-vista.component.html',
  styleUrls: ['./anuncio-vista.component.css']
})
export class AnuncioVistaComponent implements OnInit {
  
  indice! :number;
  anuncios:Array<Anuncio>= new Array<Anuncio>();
  anuncio:Anuncio=new Anuncio();
  myAngularxQrCode:any="Angular";

  persona:Persona= new Persona();
  rol:string="";

  qrCodeDownloadLink: SafeUrl = "";
  constructor(
              private anuncioService:AnuncioService,
              private loginService:LoginService,
              private rolService:RolService
              ) {
                this.controlarLogin();
                this.iniciar();
               }

  ngOnInit(): void {

  }
  
  buscarAnunciosPorRol(){
    this.rolService.buscarRolPorNombre(this.rol).subscribe(
      result=>{
        result.forEach((item:any) => {
          this.anuncioService.getAnunciosPorRol(item._id).subscribe(
            result=>{
              console.log(result);
              result.forEach((item:any) => {
              var anuncio = new Anuncio();             
              Object.assign(anuncio,item);
              this.anuncios.push(anuncio);
              this.iniciar();
            });
          },
          error=>{
            console.log(error.msg);
          }
        )
        });
      },
      error=>{
        console.log(error.msg);
      }
    )
        
     
  }

  controlarLogin(){
    if (this.loginService.userLoggedIn()==true)
      this.rol= sessionStorage.getItem("rol")!;
    else
      this.rol="PACIENTE";
    this.buscarAnunciosPorRol();
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
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