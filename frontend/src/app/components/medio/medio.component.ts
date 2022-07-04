import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Medio } from 'src/app/models/medio';
import { MedioService } from 'src/app/services/medio.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-medio',
  templateUrl: './medio.component.html',
  styleUrls: ['./medio.component.css']
})
export class MedioComponent implements OnInit {

  
  medios!:Array<Medio>;
  medio:Medio = new Medio();
  medioAEliminar!:Medio;
  // medioABuscar:string="";

  filtro!:string;
  accion:string="new";
  mensaje!:string;
 
  constructor(private medioService:MedioService,
              private toast:ToastrService) { 
   
   this.cargarMedios();
  }

  ngOnInit(): void {
  }

  cargarMedios(){
    this.medios= new Array<Medio>();
    this.medioService.getMedios().subscribe(
      result=>{
        result.forEach((item:any) => {
          console.log(item);
          var medio = new Medio(); 
          Object.assign(medio,item);         
          this.medios.push(medio);
        });
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  agregarMedio(){
    this.accion="new";
    this.medio= new Medio();
  }

  guardarMedio(medioForm: NgForm){
    var nombreMedio= this.medio.nombreMedio.toUpperCase();
    this.medio.nombreMedio= nombreMedio;
    this.medioService.createMedio(this.medio).subscribe(
      result=>{
        if(result.status=="1"){
          this.toast.success("El medio se registro exitosamente","Gestion de Medios");
          medioForm.reset;
          this.cargarMedios();
        }
          
        if(result.status=="2")
          this.toast.error(result.msg,"Gestion de Medios");
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  modificarMedio(medio:Medio){
    Object.assign(this.medio,medio);
    this.accion="update";
  }

  actualizarMedio(){
    var nombreMedio= this.medio.nombreMedio.toUpperCase();
    this.medio.nombreMedio= nombreMedio;
    this.medioService.updateMedio(this.medio).subscribe(
      result=>{
        if(result.status=="1"){
          this.toast.success("El medio fué modificado exitosamente","Gestion de Medios");
          this.cargarMedios();
        }
        if(result.status=="2")
        this.toast.error(result.msg,"Gestion de Medios");
      
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  eliminarMedio(medio:Medio):void{
    this.medioAEliminar= medio;
    this.mensaje="Seguro que desea eliminar el medio "+medio.nombreMedio;
  }

  confirmarEliminacion(){
    this.medioService.deleteMedio(this.medioAEliminar._id).subscribe(
      result=>{
        if(result.status="1")
        console.log(result.msg);
        this.toast.success("El medio fué eliminado exitosamente","Gestión de Medios");
        this.cargarMedios();
      },
      error=>{
        if(error.status="0")
        console.log(error.msg);
      }
    )
  }

}
