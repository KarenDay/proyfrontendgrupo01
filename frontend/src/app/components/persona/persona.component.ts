import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Area } from 'src/app/models/area';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AreaService } from 'src/app/services/area.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personas!:Array<Persona>;
  persona:Persona = new Persona();
  personaAEliminar!:Persona;
  rol:Rol=new Rol();
  area:Area=new Area();
  mensaje!:string;
  personaFiltro:Persona= new Persona();
  constructor(private personaService:PersonaService,
              private areaService:AreaService,
              private router:Router) {
    this.inicializar();
    this.cargarPersonas();
    
  }
  
  inicializar(){
    this.personas= new Array<Persona>();
    this.personaFiltro= new Persona();
  }

  obtenerArea(id:string,area:Area){
    this.areaService.getArea(id).subscribe(
      result=>{  
        Object.assign(area,result);
      },
      error=>{
        alert(error.msg);
      }
    )
  }
  cargarPersonas(){
    this.personas= new Array<Persona>();
    this.personaService.getPersonas().subscribe(
      result=>{
        console.log(result);
        result.forEach((item:any) => {
          var roles = new Array<Rol>();
          var persona = new Persona();
          var area =  new Area();
          Object.assign(area,item.area);
          item.roles.forEach((irol:any) => {
            var rol = new Rol();
            Object.assign(rol,irol);
            roles.push(rol);  
          });
          persona.roles= roles;
          persona.area=area;
          Object.assign(persona,item);
          this.personas.push(persona);
      
        });
      },
      error=>{
        console.log(error.msg);
      }
    )
  }
  
  agregarPersona(){
    this.router.navigate(["persona-form", 0])
  
  }

  modificarPersona(persona:Persona){
    console.log("id de persona a pasar: "+persona._id);
    this.router.navigate(["persona-form", persona._id]);
  }

  eliminarPersona(persona:Persona):void{
    this.personaAEliminar= persona;
    this.mensaje="Seguro que desea eliminar a "+persona.apellido+", "+persona.nombre+"?";
  }

  confirmarEliminacion(){
    this.personaService.deletePersona(this.personaAEliminar._id).subscribe(
      result=>{
        if(result.status="1")
        console.log(result.msg);
        alert(result.msg);
        //this.toast.success("Sector "+this.sectorAEliminar.nombre+", eliminado correctamente","Baja de Sector");
        this.cargarPersonas();
      },
      error=>{
        if(error.status="0")
        console.log(error.msg);
      }
    )
  }

  agregarUsuario(persona:Persona){
    this.router.navigate(["usuario-form", persona._id]);
  }
  
  fitrarPersonas(){
    this.personas= new Array<Persona>();
    this.personaService.busquedaCombinada(this.personaFiltro.legajo,this.personaFiltro.nombre,this.personaFiltro.apellido).subscribe(
      result=>{
        console.log(result);
        result.forEach((item:any) => {
          var roles = new Array<Rol>();
          var persona = new Persona();
          var area =  new Area();
          Object.assign(area,item.area);
          item.roles.forEach((irol:any) => {
            var rol = new Rol();
            Object.assign(rol,irol);
            roles.push(rol);  
          });
          persona.roles= roles;
          persona.area=area;
          Object.assign(persona,item);
          this.personas.push(persona);
      
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
