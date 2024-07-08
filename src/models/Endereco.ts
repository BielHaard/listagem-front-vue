export class Endereco {
    rua: string;
    cidade: string;
    estado: string;
    cep: string;
  
    constructor(rua: string, cidade: string, estado: string, cep: string) {
      this.rua = rua;
      this.cidade = cidade;
      this.estado = estado;
      this.cep = cep;
    }
  }