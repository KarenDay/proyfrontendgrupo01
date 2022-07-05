import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Medio } from 'src/app/models/medio';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-anuncio-area',
  templateUrl: './anuncio-area.component.html',
  styleUrls: ['./anuncio-area.component.css']
})
export class AnuncioAreaComponent implements OnInit {

  anuncios:Array<Anuncio>= new Array<Anuncio>();
  persona:Persona= new Persona();
  mensaje:string="";
  mostrarParaEstado:string="AUTORIZADO";
  constructor(private anuncioService:AnuncioService,
              public loginService:LoginService) { 
                this.cargarAnuncios();
              
  }

  cargarAnuncios(){
    
    this.loginService.personaLoggedIn().subscribe(
      result=>{
        Object.assign(this.persona,result);
        console.log(this.persona);
        
        this.anuncios= new Array<Anuncio>();
        this.anuncioService.getAnuncioPorArea(this.persona.area._id).subscribe(
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
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  confirmarCancelacion(){

  }

  cancelarAnuncioEnVigencia(anuncio:Anuncio){

  }
  ngOnInit(): void {
  }



}

