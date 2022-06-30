import { Area } from "./area";
import { Rol } from "./rol";

export class Persona {
    _id!:string;
    apellido!:string;
    nombre!:string;
    legajo!: string;
    dni!:number;
    email!: string;
    area!:Area;
    roles:Array<Rol>= new Array<Rol>();

    constructor(){}
}
