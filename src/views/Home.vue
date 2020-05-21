<template>
  <div class="home">
    <b-row class="header">
      <b-col>
        <h1>Simulador Covid-19</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="7">
        <Charts :chart-data="datacollection"/>
      </b-col>
      <b-col cols="5">
        <b-form @submit="simulateOneDay">
          <b-row class="input-row">
            <b-col cols="6">
              <label>Porcentaje de Guadalajara:</label>
              <b-input
              id="input-guadalajara"
              required
              placeholder="Guadalajara"
              ></b-input>
              <label>Porcentaje de Tlaquepaque:</label>
              <b-input
              id="input-tlaquepaque"
              required
              placeholder="Tlaquepaque"
              ></b-input>
              <label>Porcentaje de Tonala:</label>
              <b-input
              id="input-tonala"
              required
              placeholder="Tonala"
              ></b-input>
              <label>Numero de Estudiantes:</label>
              <b-input
              id="input-num-estudiantes"
              required
              placeholder="Estudiantes"
              ></b-input>
            </b-col>
            <b-col cols="6">
              <label>Porcentaje de Zapopan:</label>
              <b-input
              id="input-zapopan"
              required
              placeholder="Zapopan"
              ></b-input>
              <label>Porcentaje de Tlajomulco:</label>
              <b-input
              id="input-tlajomulco"
              required
              placeholder="Tlajomulco"
              ></b-input>
              <label>Porcentaje de El Salto:</label>
              <b-input
              id="input-salto"
              required
              placeholder="El Salto"
              ></b-input>
            </b-col>
            <b-button variant="primary">Comenzar Simulación</b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import {Simulator} from '@/classes/Covid.js';
import Charts from '@/views/Charts.vue';


export default {
  name: 'Home', 
  components: {
    Charts,
  },  
  data(){
    return {
      simulator: new Simulator(10000, 0.2, 0.2, 0.25, 0.2, 0.1, 0.05),
      num_days: 60,
      counts: [],
      datacollection: null,
    }
  },
  methods: {
    simulateOneDay(){
      this.counts = this.simulator.nextDay();
      console.log("Sanos:",this.counts[0]);
      console.log("Enfermos:",this.counts[1]);
      console.log("Recuperados:",this.counts[2]);
      console.log("Muertos:",this.counts[3]);
      console.log("---------------------------");
    }
  }
}
</script>

<style>
.header {
  background-color: #5160A9;
}
.row {
  margin: 0px !important;
}
#body {
  background-color: #A988EE;
}
.input-row {
  margin: 40px !important;
  padding: 20px;
  background-color: #A988EE;
  border-radius: 1rem;
}
.input-row .btn {
  width: fit-content;
  margin: auto;
  margin-top: 20px;
}
.input-row label {
  font-size: 0.9rem;
  margin-top: 5px;
}
.input-row .form-control {
  width: 80%;
  margin: auto;
}

</style>
