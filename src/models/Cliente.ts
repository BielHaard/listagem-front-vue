import { Endereco } from "./Endereco";

export class Cliente {
  nome: string;
  cpf: string;
  endereco: Endereco;

  constructor(nome: string, cpf: string, endereco: Endereco) {
    this.nome = nome;
    this.cpf = cpf;
    this.endereco = endereco;
  }
}