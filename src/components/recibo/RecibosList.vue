<template>
  <div>
    <main>
      <h2>Lista de Recibos</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Empresa</th>
              <th>Cliente</th>
              <th>Total Recebido</th>
              <th>XML</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recibo in recibos" :key="recibo.id">
              <td>{{ recibo.id }}</td>
              <td>{{ recibo.empresa.nome }}</td>
              <td>{{ recibo.cliente.nome }}</td>
              <td>{{ recibo.totalRecebidoFormatado }}</td>
              <td>
                <div class="tooltip">
                  <font-awesome-icon
                    :icon="['fas', 'eye']"
                    @click="visualizarXML(recibo.id)"
                    style="cursor: pointer;"
                  />
                  <span class="tooltiptext">Visualizar XML</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RecibosService from '@/services/ReciboService';
import { Recibo } from '@/models/Recibo';

export default defineComponent({
  name: 'RecibosList',
  setup() {
    const recibos = ref<Array<Recibo>>([]);

    const visualizarXML = async (id: number) => {
      try {
        const xml = await RecibosService.obterXMLRecibo(id);
        abrirNovaAba(xml);
      } catch (error) {
        console.error('Erro ao buscar XML:', error);
      }
    };

    const abrirNovaAba = (conteudo: string) => {
      const blob = new Blob([conteudo], { type: 'text/xml' });
      const url = URL.createObjectURL(blob);
      const novaAba = window.open(url, '_blank');
      if (novaAba) {
        novaAba.focus();
      } else {
        console.error('Não foi possível abrir a nova aba. Verifique se as janelas pop-up estão bloqueadas.');
      }
    };

    // Carregar recibos ao montar o componente
    RecibosService.obterRecibos()
      .then(recibosObtidos => {
        recibos.value = recibosObtidos;
      })
      .catch(error => {
        console.error('Erro ao obter recibos:', error);
      });

    return {
      recibos,
      visualizarXML,
    };
  },
});
</script>

<style scoped>
.main {
  padding: 2rem;
  margin-bottom: 3rem;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
}

thead {
  background-color: #007bff;
  color: white;
}

tbody tr:nth-child(odd) {
  background-color: #f8f9fa;
}

tbody tr:nth-child(even) {
  background-color: #e9ecef;
}

tbody tr:hover {
  background-color: #d6e0f5;
}

h2 {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-bottom: 1rem;
}

.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 24px;
}

</style>