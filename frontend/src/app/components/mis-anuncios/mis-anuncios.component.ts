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
               this.cargarRedactor();  
  }

  /**
   * Carga los datos de la persona logueada y busca los anuncios por el id de la persona.
   */
  cargarRedactor(){
    this.loginService.personaLoggedIn().subscribe(
        result=>{
          Object.assign(this.redactor,result);
          this.anuncios= new Array<Anuncio>();
          this.anuncioService.getAnuncioPorRedactor(this.redactor._id).subscribe(
            result=>{
                console.log(result);
                    result.forEach((item:any) => {
                        var anuncio = new Anuncio();
                        var medios = new Array<Medio>();
                        var redactor = new Persona();
                        Object.assign(redactor,item.redactor);
                        var destinatarios = new Array<Rol>();
                        item.destinatario.forEach((idest:any) => {
                          var destinatario = new Rol();
                          Object.assign(destinatario,idest);
                          destinatarios.push(destinatario);
                        });
                        item.mediosDePublicacion.forEach((imedio:any) => {
                            var medio = new Medio();
                            Object.assign(medio,imedio);
                            medios.push(medio);  
                        });
                          anuncio.redactor= redactor;
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

  modificarAnuncio(anuncio:Anuncio){
    this.router.navigate(["anuncio-form", anuncio._id]); 
  }

  ngOnInit(): void {
  }
}
