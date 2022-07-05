import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-anuncio-recursos',
  templateUrl: './anuncio-recursos.component.html',
  styleUrls: ['./anuncio-recursos.component.css']
})
export class AnuncioRecursosComponent implements OnInit {

  img:string="";
  anuncio:Anuncio=new Anuncio();
  archivos:Array<string>= new Array<string>();
  constructor(private anuncioService:AnuncioService,
              private activatedRoute:ActivatedRoute) { 
               
  }

  cargarAnuncio(id:string){
    this.anuncio= new Anuncio();
    this.anuncioService.getAnuncio(id).subscribe(
      result=>{
        result.recursos.forEach((item:any) => {
          console.log(item); 
          this.archivos.push(item); 
        });      
        
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.cargarAnuncio(params['id']);
  });
  }
}
