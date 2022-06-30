import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

 // dtOptions: DataTables.Settings = {};
  //dtTrigger:Subject<any> = new Subject<any>();

  //roles!:Array<Rol>;
  roles!:Array<string>
  rol:Rol = new Rol();
  rolAEliminar!:Rol;
//  persona:Persona=new Persona();
  
  accion:string="new";
  mensaje!:string;

  constructor(private rolService:RolService) { 
    this.roles=new Array<string>();
    this.roles=["administrador","encargado","paciente"];
  }

  ngOnInit(): void {
  }

  agregarRol(){
    this.accion="new";
    this.rol= new Rol();
  }

  guardarRol(rolForm: NgForm){
    this.rolService.createRol(this.rol).subscribe(
      result=>{
        alert(result.msg);
        rolForm.reset;
     //   this.cargarRoles();
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  modificarRol(rol:Rol){
    Object.assign(this.rol,rol);
    this.accion="update";
  }

  actualizarRol(){
    this.rolService.updateRol(this.rol).subscribe(
      result=>{
        alert(result.msg);
      //  this.cargarRoles();
      },
      error=>{
        alert(error.msg);
      }
    )
  }

  eliminarRol(rol:Rol):void{
    this.rolAEliminar= rol;
    this.mensaje="Seguro que desea eliminar el rol "+rol.nombreRol;
  }

  confirmarEliminacion(){
    this.rolService.deleteRol(this.rolAEliminar._id).subscribe(
      result=>{
        if(result.status="1")
        console.log(result.msg);
        alert(result.msg);
      //  this.cargarRoles();
      },
      error=>{
        if(error.status="0")
        console.log(error.msg);
      }
    )
  }
}
