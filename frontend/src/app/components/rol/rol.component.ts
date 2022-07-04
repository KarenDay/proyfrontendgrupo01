import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  roles!:Array<Rol>;
  rol:Rol = new Rol();
  rolAEliminar!:Rol;
  rolABuscar:string="";
  persona:Persona=new Persona();
  filtro!:string;
  accion:string="new";
  mensaje!:string;
 
  constructor(private rolService:RolService,
              private toast:ToastrService) { 
   this.cargarRoles();
  }

  ngOnInit(): void {
  }

  cargarRoles(){
    this.roles= new Array<Rol>();
    this.rolService.getRoles().subscribe(
      result=>{
        result.forEach((item:any) => {
          console.log(item);
          var personas = new Array<Persona>();
          var rol = new Rol();
          item.personas.forEach((ipers:any) => {
            
            var persona = new Persona();
            Object.assign(persona,ipers);
            personas.push(persona);  
          });
          rol.personas= personas;
          Object.assign(rol,item);
          
          this.roles.push(rol);
        });
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

 
  agregarRol(){
    this.accion="new";
    this.rol= new Rol();
  }

  guardarRol(rolForm: NgForm){
    var nombreRol= this.rol.nombreRol.toUpperCase();
    this.rol.nombreRol= nombreRol;
    this.rolService.createRol(this.rol).subscribe(
      result=>{
        if(result.status=="1"){
          this.toast.success("El rol se registro exitosamente","Gestion de Roles");
          rolForm.reset;
          this.cargarRoles();
        }
          
        if(result.status=="2")
          this.toast.error(result.msg,"Gestion de Roles");
        
        //console.log(result.msg);
        
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
    var nombreRol= this.rol.nombreRol.toUpperCase();
    this.rol.nombreRol= nombreRol;
    this.rolService.updateRol(this.rol).subscribe(
      result=>{
        if(result.status=="1")
          this.toast.success("El rol fué modificado exitosamente","Gestion de Roles");
        if(result.status=="2")
        this.toast.error(result.msg,"Gestion de Roles");
       this.cargarRoles();
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
        //alert(result.msg);
        this.toast.success("El rol fué eliminado exitosamente","Gestión de Roles");
        this.cargarRoles();
      },
      error=>{
        if(error.status="0")
        console.log(error.msg);
      }
    )
  }

  buscarRol(nombreRol:string){
    this.roles= new Array<Rol>();
    // this.rolService.buscarRolPorNombre(nombreRol).subscribe(
    //   result=>{
    //     result.forEach((item:any) => {
      
    //       var personas = new Array<Persona>();
    //       var rol = new Rol();
    //       item.personas.forEach((ipers:any) => {
            
    //         var persona = new Persona();
    //         Object.assign(persona,ipers);
    //         personas.push(persona);  
    //       });
    //       rol.personas= personas;
    //       Object.assign(rol,item);
    //       this.roles.push(rol);
    //     });
    //   },
    //   error=>{
    //     console.log(error.msg);
    //   }
    // )
  }
}
