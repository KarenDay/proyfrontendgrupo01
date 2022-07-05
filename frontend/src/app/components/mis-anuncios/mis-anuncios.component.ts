import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Medio } from 'src/app/models/medio';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-mis-anuncios',
  templateUrl: './mis-anuncios.component.html',
  styleUrls: ['./mis-anuncios.component.css']
})
export class MisAnunciosComponent implements OnInit {

  anuncios:Array<Anuncio>= new Array<Anuncio>();
  redactor:Persona= new Persona();
  estado:string="EDICION";
  constructor(private anuncioService:AnuncioService,
              private loginService:LoginService,
              private router:Router) { 
              //  this.cargarRedactor();
              
  }
/*
  cargarRedactor(){
    
    this.loginService.personaLoggedIn().subscribe(
      result=>{
        Object.assign(this.redactor,result);
        console.log(this.redactor);
        
        this.anuncios= new Array<Anuncio>();
        this.anuncioService.getAnuncioPorRedactor(this.redactor._id).subscribe(
        result=>{
                console.log("entro");
                console.log(result);
                result.forEach((item:any) => {
                var anuncio = new Anuncio();
                var medios = new Array<Medio>();
                var destinatario = new Rol();
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
          
          anuncio.redactor= redactor;
          anuncio.area=area;
          //anuncio.destinatario= destinatario;
          anuncio.mediosDePublicacion=medios;
          
          Object.assign(anuncio,item);
          this.anuncios.push(anuncio);
      
        });
      },
      error=>{
        console.log(error.msg);
      }
    )
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  cargarAnuncios(){
    
    this.anuncios= new Array<Anuncio>();
    this.anuncioService.getAnuncioPorRedactor(this.redactor._id).subscribe(
      result=>{
        console.log("entro");
        console.log(result);
        result.forEach((item:any) => {
          var anuncio = new Anuncio();
          var medios = new Array<Medio>();
          var destinatarios = new Array<Rol>();
          var redactor = new Persona();
          var area =  new Area();
          Object.assign(area,item.area);
          Object.assign(redactor,item.redactor);
         // Object.assign(destinatario,item.destinatario);
          item.mediosDePublicacion.forEach((imedio:any) => {
            console.log(imedio);
            var medio = new Medio();
            Object.assign(medio,imedio);
            medios.push(medio);  
          });
          item.destinatario.forEach((idest:any) => {
            console.log(idest);
            var destinatario = new Rol();
            Object.assign(destinatario,idest);
            destinatarios.push(destinatario);  
         });
         anuncio.redactor= redactor;
          anuncio.area=area;
          anuncio.destinatario= destinatarios;
          anuncio.mediosDePublicacion=medios;
          
          Object.assign(anuncio,item);
          this.anuncios.push(anuncio);
        });
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  modificarAnuncio(anuncio:Anuncio){
    console.log("ID anuncio: "+anuncio._id);
    this.router.navigate(["anuncio-form", anuncio._id]);
    
  }
*/
  ngOnInit(): void {
  }


}
