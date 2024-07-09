import { Cliente } from "./Cliente";
import { Empresa } from "./Empresa";

export class Recibo {
    id: number;
    empresa: Empresa;
    cliente: Cliente;
    totalRecebido: number;
    totalRecebidoFormatado: string;

    constructor(id: number, empresa: Empresa, cliente: Cliente, totalRecebido: number, totalRecebidoFormatado: string){
        this.id = id;
        this.empresa = empresa;
        this.cliente = cliente, 
        this.totalRecebido = totalRecebido;
        this.totalRecebidoFormatado = totalRecebidoFormatado;
    }
}