import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Medio } from 'src/app/models/medio';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import { CorreoService } from 'src/app/services/correo.service';
import { LoginService } from 'src/app/services/login.service';
import { MedioService } from 'src/app/services/medio.service';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {

  mensaje!:string;  
  archivo:string="";
  archivos:Array<string>= new Array<string>();
  anuncio:Anuncio= new Anuncio();
  redactor:Persona=new Persona();
  roles:Array<Rol>= new Array<Rol>();
  medios:Array<Medio>= new Array<Medio>();
  area:Area=new Area();


  mensajeCorreo!:string;
  asuntoCorreo!:string;
  email:string="";
  listaEncargados:Array<Persona>= new Array<Persona>();
  accion:string="new";

  estados:Array<string>= new Array<string>()
  
  constructor(private loginService:LoginService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private anuncioService:AnuncioService,
              private medioService:MedioService,
              private toast:ToastrService,
              private areaService:AreaService,
              private correoService:CorreoService) { 
      this.cargarEstados(); 
  }

  agregarListaRecursos(recursos:any){
    if (recursos!="" || recursos !=undefined || recursos!=null){
      this.archivo= recursos[0].base64;
    } 
  }

  agregarRecurso(){
    this.archivos.push(this.archivo);
    this.archivo="";
  }

  quitarRecurso(a:string){
    var tam= this.archivos.length;
    for( var i = 0; i < tam; i++){                            
      if ( this.archivos[i] == a) { 
          this.archivos.splice(i, 1); 
      }
    }
  }

  cargarEstados(){
    this.estados=["EDICION","CONFECCIONADO"];
  }

  cargarRedactor(){
    this.redactor= new Persona();
    this.loginService.personaLoggedIn().subscribe(
      result=>{
        Object.assign(this.redactor,result);
        Object.assign(this.area,this.redactor.area);
        Object.assign(this.roles,this.redactor.roles);
        console.log(this.area);
        this.cargarMedios();
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  cargarMedios(){
    this.medios= new Array<Medio>();
    this.medioService.getMedios().subscribe(
      result=>{
        result.forEach((item:any) => {
          var medio = new Medio();
          Object.assign(medio,item);
          this.medios.push(medio); 
        });
      }
    )
  }

  confirmarAnuncio(){
    this.mensaje="Desea registrar el anuncio?";
  }

  guardarAnuncio(anuncioForm:NgForm){
     console.log(this.anuncio);
     this.anuncio.recursos= this.archivos;
     this.anuncio.redactor= this.redactor;
     this.anuncio.area= this.area;
     this.anuncioService.createAnuncio(this.anuncio).subscribe(
        result=>{
          this.toast.success(result.msg,"Gestión de Anuncios");
          console.log(result.msg);
          this.controlEstadoAnuncio(); //Este metodo controla si el estado es CONFECCIONADO envie un email al encargado
          anuncioForm.reset();
          this.archivos= new Array<string>();
          this.cargarRedactor();
        },
        error=>{
          console.log(error.msg);
        }
     )
  }

  /**
   * Controla si el estado es CONFECCIONADO busque a los encargados de su area
   */
  controlEstadoAnuncio(){
    if (this.anuncio.estado=="CONFECCIONADO"){
      this.areaService.buscarAreaPorNombre(this.anuncio.area.nombreArea).subscribe(
        result=>{
          result.forEach((item:any) => {
            item.responsables.forEach((resp:any) => {
              var responsable= new Persona();
              Object.assign(responsable,resp); // lista de encargados: obtenemos los email
              this.listaEncargados.push(responsable);                
            });
            this.enviarCorreoElectronico(); 
          });
        }
      )
    }
  }

  enviarCorreoElectronico(){
    for(let i=0;i<this.listaEncargados.length;i++){
      this.mensajeCorreo="Una persona de su area a confeccionado un anuncio";
      this.asuntoCorreo="Aviso de autorización de anuncio";
      this.email=this.listaEncargados[i].email;
      console.log(this.listaEncargados[i].email);
      this.correoService.enviarCorreo(this.email,this.asuntoCorreo,this.mensajeCorreo).subscribe(
        result=>{

          this.toast.success("Se han enviado correos a los encargados de su Area para autorizar su anuncio","Aviso a Encargados");
        },
        error=>{
          this.toast.error(error.msg,"Error al enviar correo");
        }
      )
    }
  }

  confirmarActualizacion(){
    this.mensaje="Realmente desea actualizar el anuncio?";
  }
  actualizarAnuncio(anuncioForm:NgForm){
    this.anuncioService.updateAnuncio(this.anuncio).subscribe(
      result=>{
        this.controlEstadoAnuncio(); //Este metodo controla si el estado es CONFECCIONADO envie un email al encargado
        this.router.navigate(['mis-anuncios']);
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  cargarAnuncio(id:string){
    this.anuncio= new Anuncio();
    this.anuncioService.getAnuncio(id).subscribe(
      result=>{
        console.log(result);
          var medios = new Array<Medio>();
          var destinatarios = new Array<Rol>();
          var redactor = new Persona();
          var area =  new Area();
          Object.assign(area,result.area);
          Object.assign(redactor,result.redactor);
          result.mediosDePublicacion.forEach((imedio:any) => {
            var medio = new Medio();
            Object.assign(medio,imedio);
            medios.push(medio);  
          });
          result.destinatario.forEach((idest:any) => {
            var destinatario = new Rol();
            Object.assign(destinatario,idest);
            destinatarios.push(destinatario);  
          });
          this.anuncio.redactor= redactor;
          this.anuncio.area=area;
          this.anuncio.destinatario= destinatarios;
          this.anuncio.mediosDePublicacion=medios;
          Object.assign(this.anuncio,result);  
          Object.assign(this.archivos,result.recursos); 
          this.anuncio.estado= this.estados.find((item)=>(item==this.anuncio.estado))!;
          this.cargarRedactor(); 
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0"){
        this.accion = "new";  
        this.cargarRedactor();
      }else{
        this.accion = "update";
        this.cargarAnuncio(params['id']);
      }
    });
  }  
}
