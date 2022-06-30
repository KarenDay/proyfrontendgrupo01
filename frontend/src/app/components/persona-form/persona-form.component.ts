import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from 'src/app/models/persona';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css']
})
export class PersonaFormComponent implements OnInit {

  tituloPrincipal:string="REGISTRO PERSONA";
  persona:Persona = new Persona();
  personaAEliminar!:Persona;
  rol:Rol=new Rol();
  rolSeleccionado:Rol=new Rol();
  roles:Array<Rol>=new Array<Rol>();
  accion:string="new";
  mensaje!:string;
  rolAEliminar:Rol= new Rol();

  usuario:Usuario= new Usuario();
  usuarios:Array<Usuario>= new Array<Usuario>();
  constructor(private personaService:PersonaService,
              private activatedRoute:ActivatedRoute,
              private rolService:RolService,
              private router:Router,
              private usuarioService:LoginService) { }

  
  inicializar(){
    this.persona= new Persona();
  }

  async cargarPersona(id:string){
    this.persona= new Persona();
    console.log("entro en persona");
    
    this.personaService.getPersona(id).subscribe(
      result=>{
          var roles = new Array<Rol>();
          result.roles.forEach((irol:any) => {
            var rol = new Rol();
            Object.assign(rol,irol);
            roles.push(rol);  
          });
          this.persona.roles= roles;
          Object.assign(this.persona,result);
          this.cargarUsuarios(id);
      }
      
    )
  }

  async cargarUsuarios(idPersona:string){
    this.usuarios= new Array<Usuario>();
    console.log("entro en usuarios");
    console.log("Buscar id de persona:"+idPersona);
    this.usuarioService.getUsuarioByPersona(idPersona).subscribe(
      result=>{
          console.log(result);
          result.forEach((usuario:any) => {
            console.log("Usuarios"+ usuario);   
            var usu = new Usuario();
            Object.assign(usu,usuario);
            this.usuarios.push(usu);  
            console.log("cantidad de usuarios: "+this.usuarios.length);
          });
      },
      error=>{
        console.log(error.msg);
      }
      
    )
  }
  agregarPersona(){
    this.accion="new";
    this.persona= new Persona();
  }

  guardarPersona(personaForm: NgForm){
    this.personaService.createPersona(this.persona).subscribe(
      result=>{
        this.router.navigate(['persona']);
        //alert(result.msg);
        //personaForm.reset;
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  modificarPersona(persona:Persona){
    Object.assign(this.persona,persona);
    this.accion="update";
  }

  actualizarPersona(){
    this.personaService.updatePersona(this.persona).subscribe(
      result=>{
        // alert(result.msg);
        this.router.navigate(["persona"]);
      },
      error=>{
        alert(error.msg);
      }
    )
  }

  cargarRoles(){
    this.roles= new Array<Rol>();
    this.rolService.getRoles().subscribe(
      result=>{
        result.forEach((item : any) => {
          var rol = new Rol();
          Object.assign(rol,item);
          this.roles.push(rol);
        });
      }
    )
  }

  guardarRol(rolForm:NgForm){
    console.log("ID PErsona:"+this.persona._id);
    this.personaService.addRol(this.rolSeleccionado,this.persona._id).subscribe(
      result=>{
        alert(result.msg);
        rolForm.reset();
        this.rolSeleccionado= new Rol();
        this.cargarPersona(this.persona._id);
      },
      error=>{
        alert(error.msg);
      }
    )
  }

  confirmarEliminacion(rolForm: NgForm){
    
    this.personaService.deleteRol(this.persona._id, this.rolAEliminar._id).subscribe(
      result=>{
        alert(result.msg);
        rolForm.reset();
        this.cargarPersona(this.persona._id);
      }
    )
  }

  eliminarRol(rol:Rol){
    console.log("Ro l"+rol);
    this.mensaje="Seguro que desea eliminar el rol?";
    this.rolAEliminar=rol;
    
  }

  guardarUsuario(usuarioForm:NgForm){
    this.usuario.persona=this.persona;
    this.usuario.rol=this.rolSeleccionado;
    this.usuarioService.createUser(this.usuario).subscribe(
      result=>{
        console.log("usuario creado");
      },
      error=>{
        console.log(error.msg);
      }
    );
  }
  volver(){
    this.router.navigate(["persona"]);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']!=null){
        if (params['id'] == "0"){
          this.accion = "new";  
          this.inicializar();
        }else{
          this.accion = "update";
          this.inicializar();
          this.cargarPersona(params['id']);
          //this.cargarUsuarios(params['id']);
        }
      }else{
        console.log("entro en primer else");
        this.inicializar();
       
      }
    });
  }

}
