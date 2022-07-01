import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Medio } from 'src/app/models/medio';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';
import { MedioService } from 'src/app/services/medio.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {

  mensaje!:string;
  archivos!:Array<string>;
  //codigosQr:Array<string>= new Array<string>();
  codigoQr!:string;
  archivo:string="";
  texto!:string;
  anuncio:Anuncio= new Anuncio();
  redactor:Persona= new Persona();
  roles:Array<Rol>= new Array<Rol>();
  medios:Array<Medio>= new Array<Medio>();
  area:Area= new Area();

  //redactor!:string;
  

  constructor(private loginService:LoginService,
              private rolService:RolService,
              private anuncioService:AnuncioService,
              private medioService:MedioService) { 
      this.archivos =new Array<string>();
      //this.codigosQr= new Array<string>();
      this.cargarRoles();
      this.cargarRedactor();
      this.cargarMedios();   
  }

  agregarRecursos(){
    this.archivos.push(this.archivo);
  }
  cargarRedactor(){
    this.loginService.personaLoggedIn().subscribe(
      result=>{
        Object.assign(this.redactor,result);
        Object.assign(this.area,this.redactor.area);
        console.log(this.area);
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  cargarRoles(){
    this.roles= new Array<Rol>();
    this.rolService.getRoles().subscribe(
      result=>{
        result.forEach((item : any) => {
          var rol = new Rol();
          Object.assign(rol,item);
          this.roles.push(rol);
        });
      }
    )
  }

  cargarMedios(){
    this.medios= new Array<Medio>();
    this.medioService.getMedios().subscribe(
      result=>{
        result.forEach((item:any) => {
          var medio = new Medio();
          Object.assign(medio,item);
          this.medios.push(medio);
        });
      }
    )
  }

  async obtenerCodigoQR(url :string){
    //this.codigosQr= new Array<string>();
    this.anuncioService.obtenerCodigoQR(url).subscribe(
      result=>{
          var url = result.codigoqr;
          //this.codigosQr.push(url);
          Object.assign(this.codigoQr,url);
          this.anuncio.recursos= this.codigoQr;
          this.anuncio.redactor= this.redactor;
          this.anuncio.area= this.area;
          this.anuncioService.createAnuncio(this.anuncio).subscribe(
              result=>{
                console.log(result.msg);
              },
              error=>{
                console.log(error.msg);
              }
            )
            }
          )
  }

  async guardarAnuncio(anuncioForm:NgForm){
     //await this.obtenerCodigoQR(this.archivos[0]);
     //this.codigosQr= new Array<string>();
    this.anuncioService.obtenerCodigoQR(this.archivo).subscribe(
      result=>{
          var url = result.codigoqr;
          // this.codigosQr.push(url);
          console.log(url);
          //Object.assign(this.codigoQr,result.codigoQr);

          this.anuncio.recursos= url;
          this.anuncio.redactor= this.redactor;
          this.anuncio.area= this.area;
          this.anuncioService.createAnuncio(this.anuncio).subscribe(
              result=>{
                console.log(result.msg);
              },
              error=>{
                console.log(error.msg);
              }
            )
            }
          )
  }

  confirmarRegistro(){
    this.mensaje="Desea registrar el anuncio?";
  }
  ngOnInit(): void {
  }  
}
