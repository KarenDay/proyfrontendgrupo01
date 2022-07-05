import { Area } from "./area";
import { Rol } from "./rol";

export class Persona {
    _id!:string;
    apellido!:string;
    nombre!:string;
    legajo!: string;
    dni!:string;
    email!: string;
    area:Area= new Area();
    roles:Array<Rol>= new Array<Rol>();

    constructor(){}
}
