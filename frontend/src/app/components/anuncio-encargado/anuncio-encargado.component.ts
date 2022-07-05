import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Medio } from 'src/app/models/medio';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
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
  constructor(private anuncioService:AnuncioService,
              private loginService:LoginService,
              private toast:ToastrService) { 
                this.cargarAnuncios();
              
  }

  cargarAnuncios(){
    
    this.loginService.personaLoggedIn().subscribe(
      result=>{
        Object.assign(this.encargado,result);
        console.log(this.encargado);
        
        this.anuncios= new Array<Anuncio>();
        /*this.anuncioService.getAnuncioPorAutorizar(this.encargado.area._id).subscribe(
        result=>{
                console.log("entro");
                console.log(result);
                result.forEach((item:any) => {
                var anuncio = new Anuncio();
                var medios = new Array<Medio>();
                var destinatario = new Rol();
                var redactor = new Persona();
                var area =  new Area();
                Object.assign(area,item.area);
                Object.assign(redactor,item.redactor);
                Object.assign(destinatario,item.destinatario);
                item.mediosDePublicacion.forEach((imedio:any) => {
                    console.log(imedio);
                    var medio = new Medio();
                    Object.assign(medio,imedio);
                    medios.push(medio);  
                 });
          
          anuncio.redactor= redactor;
          anuncio.area=area;
          //anuncio.destinatario= destinatario;
          anuncio.mediosDePublicacion=medios;
          
          Object.assign(anuncio,item);
          this.anuncios.push(anuncio);
      
        });
      },
      error=>{
        console.log(error.msg);
      }
    )*/
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
          this.toast.success("EL ANUNCIO HA SIDO CANCELADO","Gestion de Anuncios");
          this.cargarAnuncios();
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  autorizarAnuncio(anuncio:Anuncio){
    console.log(anuncio);
    anuncio.estado="AUTORIZADO";
    //AQUI SERIA EL CONTROL PARA FACEBOOK
    this.anuncioService.updateAnuncio(anuncio).subscribe(
      result=>{
          this.toast.success("EL ANUNCIO HA SIDO AUTORIZADO","Gestion de Anuncios");
          this.cargarAnuncios();
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  cancelarAnuncio(anuncio:Anuncio){
    this.mensaje="¿Seguro que quiere cancelar el anuncio?";
    Object.assign(this.anuncioACancelar,anuncio);
    console.log(this.anuncioACancelar);
  }

  ngOnInit(): void {
  }


}
