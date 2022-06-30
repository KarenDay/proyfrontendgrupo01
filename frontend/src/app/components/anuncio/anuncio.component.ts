import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {

  archivos!:Array<string>;
  arch!:string;
  texto!:string;

  constructor() { 
      this.archivos =new Array<string>();
  }

  ngOnInit(): void {
  }

  guardar(){
    this.archivos.push(this.arch);
}
}
