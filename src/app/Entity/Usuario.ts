import { Agencia } from "./Agencia";
import { cargo } from "./Cargo";
import { Rol } from "./Rol";


export class Usuario {
    
    codigo: number;
    nombre: String;
    apellido: String;
    user: String;
    password: String;
    estado: String;
    fechaCreacion: Date;


    cargo: cargo;
    agencia: Agencia;
    rol: Rol;
}