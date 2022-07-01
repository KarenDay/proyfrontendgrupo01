import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Medio } from 'src/app/models/medio';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-mis-anuncios',
  templateUrl: './mis-anuncios.component.html',
  styleUrls: ['./mis-anuncios.component.css']
})
export class MisAnunciosComponent implements OnInit {

  anuncios:Array<Anuncio>= new Array<Anuncio>();
  constructor(private anuncioService:AnuncioService) { 
    this.cargarAnuncios();
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
          anuncio.destinatario= destinatario;
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
  ngOnInit(): void {
  }


}
