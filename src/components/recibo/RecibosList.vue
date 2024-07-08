<template>
    <div>
      <h2>Lista de Recibos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>Cliente</th>
            <th>Total Recebido</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recibo in recibos" :key="recibo.id">
            <td>{{ recibo.id }}</td>
            <td>{{ recibo.empresa.nome }}</td>
            <td>{{ recibo.cliente.nome }}</td>
            <td>{{ recibo.totalRecebido }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import RecibosService from '../../services/ReciboService';
import { Recibo } from '@/models/Recibo';

export default defineComponent({
  name: 'RecibosList',
  setup() {
    const recibos = ref<Array<Recibo>>([]);

    onMounted(async () => {
      try {
        recibos.value = await RecibosService.obterRecibos();
      } catch (error) {
        console.error('Erro:', error);
      }
    });

    return {
      recibos
    };
  }
});
</script>
