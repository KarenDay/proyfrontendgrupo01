import { Medio } from "./medio";
import { Rol } from "./rol";

export class Anuncio {
    _id!:string;
    textoAnuncio!:string;
    tipoContenido!:string;
    mediosDePublicacion!:Array<Medio>;
    fechaEntrega!:Date;
    estado!:string;
    destinatarios!:Rol;
    recursos!:string;
    tiempoLectura!:string;
    //redactor!:Persona;
}
