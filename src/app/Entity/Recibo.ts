import { Cobro } from "./Cobro";
import { Usuario } from "./Usuario";


export class Recibo {

    codigo: number;
    fechaHora: Date;
    numero: number;
    observacion: String;
    
    cobro: Cobro;
    usuario: Usuario;
    

}