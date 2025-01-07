import { Cliente } from "./Cliente";

export class Medidor {

    codigo: number;
    numero: string;
    tipo: string;
    estatus: string;
    fechaIngreso: Date;

    cliente: Cliente;

    Medidor () {}
}
