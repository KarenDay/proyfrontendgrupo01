import { Persona } from "./persona";

export class Area {
    _id!:string;
    nombreArea:string="";
    responsables!:Array<Persona>;
    constructor(){}
}
