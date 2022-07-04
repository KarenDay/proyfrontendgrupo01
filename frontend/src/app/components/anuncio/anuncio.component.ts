import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Medio } from 'src/app/models/medio';
import { Persona } from 'src/app/models/persona';
//import { Recurso } from 'src/app/models/recurso';
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
  //archivos!:Array<Recurso>;
  //codigosQr:Array<string>= new Array<string>();
  //codigoQr!:string;
  //texto!:string;

 // archivoImg:Recurso= new Recurso();
 // archivoPdf:Recurso= new Recurso();
  
  archivo:string="";
  archivos:Array<string>= new Array<string>();
  anuncio:Anuncio= new Anuncio();
  redactor:Persona=new Persona();
  roles:Array<Rol>= new Array<Rol>();
  medios:Array<Medio>= new Array<Medio>();
  area:Area=new Area();


  listaEncargados:Array<Area>= new Array<Area>();
  accion:string="new";

  estados:Array<string>= new Array<string>()
  
  constructor(private loginService:LoginService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private rolService:RolService,
              private anuncioService:AnuncioService,
              private medioService:MedioService,
          //    private toast:ToastrService,
              private areaService:AreaService) { 
      //this.archivos =new Array<Recurso>();
      // this.cargarRoles();
      // this.cargarRedactor();
      // this.cargarMedios(); 
 
      this.cargarEstados(); 
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
  // guardarImagen(){
  //   this.archivoImg.tipo="IMAGEN";
    
  //   this.archivos.push(this.archivoImg);
  //   console.log(this.archivos);
  // }
  // guardarPdf(){
  //   this.archivoPdf.tipo="PDF";
   
  //   this.archivos.push(this.archivoPdf);
  //   console.log(this.archivos);
  // }
 
  // obtenerRutaImg(ruta:any){
  //   console.log(ruta);
  //   this.archivoImg.url= ruta[0].base64;
  //   console.log(this.archivoImg.url);
  // }

  // obtenerRutaPdf(ruta:any){
  //   console.log(ruta);
  //   this.archivoPdf.url= ruta[0].base64;
  //   console.log(this.archivoPdf.url);
  // }

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

  // cargarRoles(){
  //   this.roles= new Array<Rol>();
  //   this.rolService.getRoles().subscribe(
  //     result=>{
  //       result.forEach((item : any) => {
  //         var rol = new Rol();
  //         Object.assign(rol,item);
  //         this.roles.push(rol);
        
  //       });
  //     }
  //   )
  // }

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

  // async obtenerCodigoQR(url :string){
  //   //this.codigosQr= new Array<string>();
  //   this.anuncioService.obtenerCodigoQR(url).subscribe(
  //     result=>{
  //         var url = result.codigoqr;
  //         //this.codigosQr.push(url);
  //         Object.assign(this.codigoQr,url);
  //         this.anuncio.recursos= this.codigoQr;
  //         this.anuncio.redactor= this.redactor;
  //         this.anuncio.area= this.area;
  //         this.anuncioService.createAnuncio(this.anuncio).subscribe(
  //             result=>{
  //               console.log(result.msg);
  //             },
  //             error=>{
  //               console.log(error.msg);
  //             }
  //           )
  //           }
  //         )
  // }

  /*
  controlEstadoAnuncio(){
    //Controla si el estado es CONFECCIONADO busque a los encargados de su area y los traiga con un service
    if (this.anuncio.estado=="CONFECCIONADO"){
      this.areaService.buscarAreaPorNombre(this.anuncio.area.nombreArea).subscribe(
        result=>{
          result.forEach((item:any) => {
            Object.assign(this.listaEncargados,item); //Con esta lista se puede obtener los correos electronicos de los encargados
            console.log("Area donde obtiene los datos de los encargados");
            console.log(item);
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
*/
  actualizarAnuncio(){
    this.anuncioService.updateAnuncio(this.anuncio).subscribe(
      result=>{
        // this.toast.success(result.msg,"Actualizacion de Anuncio");
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
          
          //this.anuncio.destinatario= this.roles.forEach((item)=>(this.anuncio.destinatario.forEach((dest)=>(dest._id==item._id))))!;
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
