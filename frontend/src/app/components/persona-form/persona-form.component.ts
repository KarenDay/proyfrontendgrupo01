import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from 'src/app/models/persona';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css'],
})
export class PersonaFormComponent implements OnInit {

  tituloPrincipal: string = 'REGISTRO PERSONA';
  persona: Persona = new Persona();
  personaAEliminar!: Persona;

  rol: Rol = new Rol();
  rolSeleccionado: Rol = new Rol();
  rolAEliminar: Rol = new Rol();
  roles: Array<Rol> = new Array<Rol>();

  accion: string = 'new';
  mensaje!: string;

  usuario: Usuario = new Usuario();
  usuarios: Array<Usuario> = new Array<Usuario>();

  areas: Array<Area> = new Array<Area>();

  constructor(
    private personaService: PersonaService,
    private activatedRoute: ActivatedRoute,
    private rolService: RolService,
    private router: Router,
    private usuarioService: LoginService,
    private areaService: AreaService,
    private toastr: ToastrService
  ) {}

  inicializar() {
    this.persona = new Persona();
  }

  async cargarPersona(id: string) {
    await this.cargarAreas();
    this.persona = new Persona();

    this.personaService.getPersona(id).subscribe((result) => {
      console.log(result);
      var roles = new Array<Rol>();
      result.roles.forEach((irol: any) => {
        var rol = new Rol();
        Object.assign(rol, irol);
        roles.push(rol);
      });
      this.persona.roles = roles;
      Object.assign(this.persona, result);
      this.persona.area = this.areas.find(
        (item) => item._id == this.persona.area._id
      )!;
      this.cargarUsuarios(this.persona);
    });

  }

  async cargarUsuarios(persona: Persona) {
    this.usuarios = new Array<Usuario>();
    console.log(persona);
    this.usuarioService.getUsuarioByPersona(persona).subscribe(
      (result) => {
        console.log(result);
        result.forEach((usuario: any) => {
          var usu = new Usuario();
          Object.assign(usu, usuario);
          this.usuarios.push(usu);
        });
      },
      (error) => {
        console.log(error.msg);
      }
    );
  }
  agregarPersona() {
    this.accion = 'new';
    this.persona = new Persona();
  }

  async guardarPersona(personaForm: NgForm) {
    console.log('dni:' + this.persona.dni);
    var dni = this.persona.dni.toString();
    this.persona.dni = dni;
    this.personaService.createPersona(this.persona).subscribe(
      (result) => {
        if (result.status == '1') {
          this.toastr.success(
            'Se agrego una persona correctamente',
            'Gestion  de Personas'
          );
          personaForm.reset();
        }
        if (result.status == '2') {
          this.toastr.error(result.msg, 'Error');
          this.persona.dni = '';
        }
      },
      (error) => {
        console.log(error.msg);
      }
    );
  }

  modificarPersona(persona: Persona) {
    Object.assign(this.persona, persona);
    this.accion = 'update';
  }

  actualizarPersona(personaForm: NgForm) {
    this.personaService.updatePersona(this.persona).subscribe(
      (result) => {
        this.router.navigate(['persona']);
        this.toastr.success("Se actualizaron los datos correctamente", "Gestion de Personas"); 
      },
      (error) => {
        this.toastr.error(error.msg, 'Error');
      }
    );
  }

  cargarRoles() {
    this.roles = new Array<Rol>();
    this.rolService.getRoles().subscribe((result) => {
      result.forEach((item: any) => {
        var rol = new Rol();
        Object.assign(rol, item);
        this.roles.push(rol);
      });
    });
  }


  async cargarAreas() {
    this.areas = new Array<Area>();
    this.areaService.getAreas().subscribe((result) => {
      result.forEach((item: any) => {
        var area = new Area();
        Object.assign(area, item);
        this.areas.push(area);
      });
    });
  }

  guardarRol(rolForm: NgForm) {
    this.personaService
      .addRol(this.rolSeleccionado, this.persona._id)
      .subscribe(
        (result) => {
          this.toastr.success(
            'Se asignó un rol a ' + this.persona.nombre,
            'Gestion de Personas'
          );
          rolForm.reset();
          this.rolSeleccionado = new Rol();
          this.cargarPersona(this.persona._id);
        },
        (error) => {
          alert(error.msg);
        }
      );
  }

  confirmarEliminacion(rolForm: NgForm) {
    this.personaService
      .deleteRol(this.persona._id, this.rolAEliminar._id)
      .subscribe((result) => {
        this.toastr.success(
          'Se quito el rol exitosamente',
          'Gestion  de roles de personas'
        );
        rolForm.reset();
        this.cargarPersona(this.persona._id);
      });
  }

  eliminarRol(rol: Rol) {
    console.log('Rol' + rol);
    this.mensaje = 'Seguro que desea eliminar el rol?';
    this.rolAEliminar = rol;

  }

  guardarUsuario(usuarioForm: NgForm) {
    this.usuario.persona = this.persona;
    this.usuario.rol = this.rolSeleccionado;
    this.usuarioService.createUser(this.usuario).subscribe(
      (result) => {
        this.toastr.success(
          'Se creo un usuario para ' + this.persona.nombre,
          'Gestion de Personas'
        );
        this.cargarUsuarios(this.persona);
      },
      (error) => {
        console.log(error.msg);
      }
    );
  }

  volver() {
    this.router.navigate(['persona']);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] == '0') {
        this.accion = 'new';
        this.inicializar();
        this.cargarAreas();
      } else {
        this.accion = 'update';
        this.inicializar();
        this.cargarPersona(params['id']);
      }
    });
  }

}
