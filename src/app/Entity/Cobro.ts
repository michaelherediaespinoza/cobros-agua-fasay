import { Cliente } from "./Cliente";
import { Medidor } from "./Medidor";

export class Cobro {
    
    cob_codigo: number;
    cob_fecha: Date;
    cob_valorActual: number;
    cob_mul_trabajo: number;
    cob_mul_reunion: number;
    cob_mul_desfile: number;
    cob_cambioMedidor: number;
    cob_nuevoSocio: number;
    cob_insumo: number;
    cob_otros: number;
    cob_total: number;
    cob_estado: String;

    medidor: Medidor;
}
