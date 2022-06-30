import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/area';
import { Persona } from 'src/app/models/persona';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  areas:Array<Area>=new Array<Area>();
  area:Area=new Area();
  mensaje!:string;
  areaAEliminar!:Area;
  accion:string='new';
  constructor(private areaService:AreaService,
              private router:Router) {
  this.cargarAreas();
               }

  
  cargarAreas(){
    this.areas= new Array<Area>();
    this.areaService.getAreas().subscribe(
      result=>{
        result.forEach((item:any) => {
      
          var encargados = new Array<Persona>();
          var area = new Area();
          item.responsables.forEach((iresp:any) => {
            
            var persona = new Persona();
            Object.assign(persona,iresp);
            encargados.push(persona);  
          });
          area.responsables= encargados;
          Object.assign(area,item);
          
          this.areas.push(area);
        });
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  confirmarEliminacion(){
    this.areaService.deleteArea(this.areaAEliminar._id).subscribe(
      result=>{
        console.log(result.msg);
        this.cargarAreas();
      },
      error=>{
        console.log(error.msg);
      }
    )
  }
  
  guardarArea(areaForm:NgForm){
    var estado!:string;
        
       this.areaService.createArea(this.area).subscribe(
        result=>{
          alert(result.msg);
          this.cargarAreas();
          areaForm.reset();
        },
        error=>{
          alert(error.msg);
        }
      )
  
  }

  actualizarArea(){
    this.areaService.updateArea(this.area).subscribe(
      result=>{
        alert(result.msg);
        this.cargarAreas();
      },
      error=>{
        alert(error.msg);
      }
    )
  }

  agregarArea(){
    this.accion="new";
    this.area= new Area();
  }
  modificarArea(area:Area){
    Object.assign(this.area,area);
    this.accion="update";
  }

  eliminarArea(area:Area){
    this.mensaje="¿Seguro que desea eliminar el area "+area.nombreArea+" ?";
    this.areaAEliminar=area;
  }
  agregarResponsable(area:Area){
    this.router.navigate(['area-encargados',area._id]);
  }
  ngOnInit(): void {
  }

}
