import { Persona } from "./persona";

export class Rol {
    _id!:string;
    nombreRol!: string;
    personas: Array<Persona>= new Array<Persona>();
    constructor(){}
}
