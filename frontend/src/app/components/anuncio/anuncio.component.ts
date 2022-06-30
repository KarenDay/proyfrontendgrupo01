import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Anuncio } from 'src/app/models/anuncio';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {

  archivos!:Array<string>;
  arch!:string;
  texto!:string;
  anuncio!:Anuncio

  constructor() { 
      this.archivos =new Array<string>();
  }

  ngOnInit(): void {
  }

  guardar(){
    this.archivos.push(this.anuncio.recursos);
}

guardarAnuncio(){

}
}
