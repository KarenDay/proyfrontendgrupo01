import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Anuncio } from 'src/app/models/anuncio';
import { Medio } from 'src/app/models/medio';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { FbPageService } from 'src/app/services/fb-page.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-anuncio-encargado',
  templateUrl: './anuncio-encargado.component.html',
  styleUrls: ['./anuncio-encargado.component.css']
})
export class AnuncioEncargadoComponent implements OnInit {

  anuncios:Array<Anuncio>= new Array<Anuncio>();
  encargado:Persona= new Persona();
  mensaje:string="";
  anuncioACancelar:Anuncio=new Anuncio();
  anuncioAAutorizar:Anuncio= new Anuncio();
  medio:string="";
  constructor(private anuncioService:AnuncioService,
              private loginService:LoginService,
              private toast:ToastrService,
              private fb: FbPageService) { 
              this.cargarAnuncios();
              
  }

  /**
   * Carga los anuncios unicamente del area a la que pertenece el encargado logueado.
   */
  cargarAnuncios(){
    //Obtiene los datos de la persona logueada
    this.loginService.personaLoggedIn().subscribe(
      result=>{
        Object.assign(this.encargado,result);
        console.log(this.encargado);
        this.anuncios= new Array<Anuncio>();
        //Obtiene los anuncios con estado "CONFECCIONADO" del area a la que pertenece el encargado
        this.anuncioService.getAnuncioPorAutorizar(this.encargado.area._id).subscribe(
        result=>{
                console.log(result);
                result.forEach((item:any) => {
                  var anuncio = new Anuncio();
                  var medios = new Array<Medio>();
                  var destinatarios = new Array<Rol>();
                  item.destinatario.forEach((idest:any) => {
                    console.log(idest);
                    var destinatario = new Rol();
                    Object.assign(destinatario,idest);
                    destinatarios.push(destinatario);
                  });
                  item.mediosDePublicacion.forEach((imedio:any) => {
                      console.log(imedio);
                      var medio = new Medio();
                      Object.assign(medio,imedio);
                      medios.push(medio);  
                  });
                  var redactor = new Persona();
                  anuncio.redactor= redactor;
                  anuncio.destinatario= destinatarios;
                  anuncio.mediosDePublicacion=medios;
                  Object.assign(redactor,item.redactor);
                  Object.assign(anuncio,item);
                  this.anuncios.push(anuncio);
                });
      },
      error=>{
        console.log(error.msg);
      }
    )
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  confirmarCancelacion(){
    this.anuncioACancelar.estado="CANCELADO";
    this.anuncioService.updateAnuncio(this.anuncioACancelar).subscribe(
      result=>{
          this.toast.info("EL ANUNCIO HA SIDO CANCELADO","Gestion de Anuncios");
          this.cargarAnuncios();
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  controlarMedio(anuncio:Anuncio){
    this.medio =  anuncio.mediosDePublicacion.find((item)=>(item.nombreMedio=="FACEBOOK"))?.nombreMedio!;
    if (this.medio=="FACEBOOK"){
      this.fb.postFbConURLFoto(anuncio.tipoContenido,anuncio.textoAnuncio);
      this.toast.success("EL ANUNCIO HA SIDO AUTORIZADO","Gestion de Anuncios");
    }
  }

  confirmarAutorizacion(){
    this.anuncioAAutorizar.estado="AUTORIZADO";
    this.anuncioService.updateAnuncio(this.anuncioAAutorizar).subscribe(
      result=>{
          this.controlarMedio(this.anuncioAAutorizar);
          this.cargarAnuncios();
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  autorizarAnuncio(anuncio:Anuncio){
    this.mensaje="¿Realmente desea autorizar el anuncio?";
    Object.assign(this.anuncioAAutorizar,anuncio);  
  }

  cancelarAnuncio(anuncio:Anuncio){
    this.mensaje="¿Seguro que quiere cancelar el anuncio?";
    Object.assign(this.anuncioACancelar,anuncio);
  }


  ngOnInit(): void {
  }
}
