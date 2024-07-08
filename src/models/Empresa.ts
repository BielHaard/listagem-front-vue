import { Endereco } from "./Endereco";

export class Empresa {
  nome: string;
  cnpj: string;
  endereco: Endereco;

  constructor(nome: string, cnpj: string, endereco: Endereco) {
    this.nome = nome;
    this.cnpj = cnpj;
    this.endereco = endereco;
  }
}
