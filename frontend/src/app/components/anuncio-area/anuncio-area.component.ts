import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Anuncio } from 'src/app/models/anuncio';
import { Medio } from 'src/app/models/medio';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-anuncio-area',
  templateUrl: './anuncio-area.component.html',
  styleUrls: ['./anuncio-area.component.css'],
})
export class AnuncioAreaComponent implements OnInit {
  //--variables de la busqueda avanzada
  texto: string = '';
  estado: string = '';
  fechaInicial: string = '';
  fechaFinal: string = '';
  searchRol:any;
  searchRedactor:any;
  //--
  anuncios: Array<Anuncio> = new Array<Anuncio>();
  anuncioACancelar: Anuncio= new Anuncio();
  persona: Persona = new Persona();
  mensaje: string = '';
  mostrarParaEstado: string = 'AUTORIZADO';
  constructor(
              private anuncioService: AnuncioService,
              public loginService: LoginService,
              private toast:ToastrService
            ){
    this.cargarAnuncios();
  }

  /**
   * Obtiene los datos de la persona logueada y trae los anuncios del area a la que pertenece la persona
   */
  cargarAnuncios() {
    this.loginService.personaLoggedIn().subscribe(
      (result) => {
        Object.assign(this.persona, result);
        this.anuncios = new Array<Anuncio>();
        this.anuncioService.getAnuncioPorArea(this.persona.area._id).subscribe(
          (result) => {
            console.log(result);
            result.forEach((item: any) => {
              var anuncio = new Anuncio();
              var medios = new Array<Medio>();
              var destinatarios = new Array<Rol>();
              var redactor = new Persona();
              item.mediosDePublicacion.forEach((imedio: any) => {
                var medio = new Medio();
                Object.assign(medio, imedio);
                medios.push(medio);
              });
              item.destinatario.forEach((idest: any) => {
                var destinatario = new Rol();
                Object.assign(destinatario, idest);
                destinatarios.push(destinatario);
              });
              Object.assign(redactor, item.redactor);
              anuncio.redactor = redactor;
              anuncio.destinatario = destinatarios;
              anuncio.mediosDePublicacion = medios;
              Object.assign(anuncio, item);
              this.anuncios.push(anuncio);
            });
          },
          (error) => {
            console.log(error.msg);
          }
        );
      },
      (error) => {
        console.log(error.msg);
      }
    );
  }

  confirmarCancelacion(anuncio:Anuncio) {
    this.anuncioACancelar=anuncio;
    this.mensaje="¿Desea cancelar el anuncio?";
  }

  cancelarAnuncioEnVigencia() {
    this.anuncioACancelar.estado="CANCELADO";
    this.anuncioService.updateAnuncio(this.anuncioACancelar).subscribe(
      result=>{
        if (result.status=="1")
          this.toast.info("El anuncio ha sido CANCELADO","Gestión de anuncio");
      },
      error=>{
          console.log(error.msg);
      }
    )
  }

  //-- METODOS BUSQUEDA AVANZADA
  capturarTexto(texto: string) {
    this.anuncios = new Array<Anuncio>();
    this.anuncioService
      .getAnunciosBusqueda(texto, this.estado)
      .subscribe((result) => {
        result.forEach((item: any) => {
          var anuncio = new Anuncio();
          Object.assign(anuncio, item);
          this.anuncios.push(anuncio);
        });
        console.log(this.anuncios);
      });
  }
  capturarEstado(estado: string) {
    this.anuncios = new Array<Anuncio>();
    this.anuncioService
      .getAnunciosBusqueda(this.texto, estado)
      .subscribe((result) => {
        result.forEach((item: any) => {
          var anuncio = new Anuncio();
          Object.assign(anuncio, item);
          this.anuncios.push(anuncio);
        });
        console.log(this.anuncios);
      });
  }
  capturarFechas(fechaI: string, fechaF: string) {
    this.anuncios = new Array<Anuncio>();
    this.anuncioService
      .getAnunciosPorFecha(
        this.fechaInicial,
        this.fechaFinal 
      )
      .subscribe((result) => {
        result.forEach((item: any) => {
          var anuncio = new Anuncio();
          Object.assign(anuncio, item);
          this.anuncios.push(anuncio);
        });
        console.log(this.anuncios);
      });
  }
  ngOnInit(): void {}
}
