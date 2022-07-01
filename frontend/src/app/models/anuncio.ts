import { Area } from "./area";
import { Medio } from "./medio";
import { Persona } from "./persona";
import { Rol } from "./rol";

export class Anuncio {
    _id!:string;
    textoAnuncio!:string;
    tipoContenido!:string;
    mediosDePublicacion:Array<Medio>= new Array<Medio>();
    fechaEntrega!:Date;
    estado!:string;
    destinatario:Rol=new Rol();
    recursos!:string;
    tiempoLectura!:string;
    redactor:Persona= new Persona();
    area:Area=new Area();
}
