import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario {
    _id!: string;
    username!: string;
    password!: string;
    persona:Persona=new Persona();
    rol: Rol=new Rol();

    Usuario(id:string="", username:string="", password:string="",persona:Persona, rol:Rol){
    this._id = id;
    this.username = username;
    this.password = password;
    this.persona = persona;
    this.rol = rol;
    }
}
