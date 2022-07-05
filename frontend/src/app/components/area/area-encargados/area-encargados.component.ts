import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/models/area';
import { Persona } from 'src/app/models/persona';
import { AreaService } from 'src/app/services/area.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-area-encargados',
  templateUrl: './area-encargados.component.html',
  styleUrls: ['./area-encargados.component.css']
})
export class AreaEncargadosComponent implements OnInit {

  area:Area=new Area();
  personas:Array<Persona>= new Array<Persona>();
  dni!:number;
  constructor(private personaService:PersonaService,
              private areaService:AreaService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  obtenerArea(id:string){
    this.area= new Area();
    this.areaService.getArea(id).subscribe(
      result=>{
        Object.assign(this.area,result);
      },
      error=>{
        console.log(error.msg);
      }
    )
  }
  agregarResponsable(persona:Persona){
      this.areaService.addResponsable(this.area._id,persona).subscribe(
        result=>{
          alert(result.msg);
        },
        error=>{
          console.log(error.msg);
        }
      )
  }
  buscarPorDni(dni:number){
    this.personas= new Array<Persona>();
    this.personaService.getPersonaByDni(dni).subscribe(
      result=>{
        
        result.forEach((item:any) => {
          var persona = new Persona(); 
          Object.assign(persona,item);
          this.personas.push(persona);
        });
        
      },
      error=>{
        console.log(error.msg);
      }
    )
  }
  volver(){
    this.router.navigate(["area"]);
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
          this.obtenerArea(params['id']);
    });
  }

}
