import { Cliente } from '@/models/Cliente';
import { Empresa } from '@/models/Empresa';
import { Endereco } from '@/models/Endereco';
import { Recibo } from '@/models/Recibo';

const API_URL_RECIBOS = 'http://localhost:8080/recibos';

export default {
  async obterRecibos(): Promise<Recibo[]> {
    try {
      const response = await fetch(`${API_URL_RECIBOS}/json`);
      if (!response.ok) {
        throw new Error('Erro ao obter os recibos');
      }
      const responseData = await response.text();
      console.log('Dados recebidos como texto:', responseData);

      const data = JSON.parse(responseData);
      console.log('Dados recebidos como JSON:', data);

      return data.map((recibo: any) => {
        return new Recibo(
          recibo.id,
          new Empresa(
            recibo.empresa.nome,
            recibo.empresa.cnpj,
            new Endereco(
              recibo.empresa.endereco.rua,
              recibo.empresa.endereco.cidade,
              recibo.empresa.endereco.estado,
              recibo.empresa.endereco.cep
            )
          ),
          new Cliente(
            recibo.cliente.nome,
            recibo.cliente.cpf,
            new Endereco(
              recibo.cliente.endereco.rua,
              recibo.cliente.endereco.cidade,
              recibo.cliente.endereco.estado,
              recibo.cliente.endereco.cep
            )
          ),
          recibo.totalRecebido,
          recibo.totalRecebidoFormatado
        );
      });
    } catch (error) {
      console.error('Erro ao obter os recibos:', error);
      throw error;
    }
  }, 

  async obterXMLRecibo(id: number): Promise<string> {
    try {
      const response = await fetch(`${API_URL_RECIBOS}/xml/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain', 
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao obter XML do recibo ${id}: ${response.statusText}`);
      }
  
      console.log("ID:" + response.body)
      return await response.text();
    } catch (error) {
      console.error(`Erro ao obter XML do recibo ${id}:`, error);
      throw new Error(`Erro ao obter XML do recibo ${id}`);
    }
  }  
};
