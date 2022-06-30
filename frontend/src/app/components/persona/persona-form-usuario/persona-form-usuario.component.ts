import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona-form-usuario',
  templateUrl: './persona-form-usuario.component.html',
  styleUrls: ['./persona-form-usuario.component.css']
})
export class PersonaFormUsuarioComponent implements OnInit {

  accion:string ="new";
  constructor(private activatedRoute:ActivatedRoute,
              private personaService:PersonaService,
              private router:Router) { }

  ngOnInit(): void {
    
  }

}
