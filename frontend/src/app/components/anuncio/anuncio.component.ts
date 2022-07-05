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
import { LoginService } from 'src/app/services/login.service';
import { MedioService } from 'src/app/services/medio.service';
import { RolService } from 'src/app/services/rol.service';

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


  listaEncargados:Array<Persona>= new Array<Persona>();
  accion:string="new";

  estados:Array<string>= new Array<string>()
  
  constructor(private loginService:LoginService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private anuncioService:AnuncioService,
              private medioService:MedioService,
              private toast:ToastrService,
              private areaService:AreaService) { 
      this.cargarEstados(); 
  }

  onFileChanges(files:any) {
    if (files!="" || files !=undefined || files!=null)
       this.anuncio.tipoContenido = files[0].base64;
  }

  agregarListaRecursos(recursos:any){
      this.archivo= recursos[0].base64;
      console.log(this.archivo);
  }

  agregarRecurso(){
    console.log(this.archivo);
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

  enviarCorreoElectronico(){
      console.log("Correos electronicos");
      for(let i=0;i<this.listaEncargados.length;i++){
        console.log(this.listaEncargados[i].email);
      }
  }

  controlEstadoAnuncio(){
    //Controla si el estado es CONFECCIONADO busque a los encargados de su area y los traiga con un service
    if (this.anuncio.estado=="CONFECCIONADO"){
      this.areaService.buscarAreaPorNombre(this.anuncio.area.nombreArea).subscribe(
        result=>{
          result.forEach((item:any) => {
            item.responsables.forEach((resp:any) => {
              var responsable= new Persona();
              Object.assign(responsable,resp); //Con esta lista se puede obtener los correos electronicos de los encargados
              this.listaEncargados.push(responsable);
              console.log("Area donde obtiene los datos de los encargados");
              console.log(responsable);
                
            });
            this.enviarCorreoElectronico(); 
          });
        }
      )
    }
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

  actualizarAnuncio(){
    this.anuncioService.updateAnuncio(this.anuncio).subscribe(
      result=>{
        this.toast.success(result.msg,"Actualizacion de Anuncio");
        this.router.navigate(['mis-anuncios']);
      },
      error=>{
        console.log(error.msg);
      }
    )
  }
  confirmarRegistro(){
    this.mensaje="Desea registrar el anuncio?";
  }

  cargarAnuncio(id:string){
    this.anuncio= new Anuncio();
    this.anuncioService.getAnuncio(id).subscribe(
      result=>{
        console.log("entro");
        console.log(result);
          var anuncio = new Anuncio();
          var medios = new Array<Medio>();
          var destinatarios = new Array<Rol>();
          var redactor = new Persona();
          var area =  new Area();
          var recursos = new Array<string>();
          Object.assign(area,result.area);
          Object.assign(redactor,result.redactor);
          result.mediosDePublicacion.forEach((imedio:any) => {
            console.log(imedio);
            var medio = new Medio();
            Object.assign(medio,imedio);
            medios.push(medio);  
          });
          result.destinatario.forEach((idest:any) => {
            console.log(idest);
            var destinatario = new Rol();
            Object.assign(destinatario,idest);
            destinatarios.push(destinatario);  
          });
          anuncio.redactor= redactor;
          anuncio.area=area;
          anuncio.destinatario= destinatarios;
          anuncio.mediosDePublicacion=medios;
          Object.assign(anuncio,result);  
          Object.assign(this.anuncio,anuncio);
          Object.assign(this.archivos,result.recursos); 
          this.anuncio.estado= this.estados.find((item)=>(item==this.anuncio.estado))!;
          this.cargarRedactor();
          this.cargarMedios();
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
       // this.cargarRoles();
        this.cargarMedios();
      }else{
        console.log("entro update");
        this.accion = "update";
        this.cargarAnuncio(params['id']);
      }
  });
  }  
}
