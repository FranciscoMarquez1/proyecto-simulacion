<template>
  <div class="home">
    <b-row class="header">
      <b-col>
        <h1>Simulador Covid-19</h1>
      </b-col>
    </b-row>
    <b-button v-on:click="fillData">HOLA</b-button>
    <b-row>
      <b-col cols="6">
        <div class="chart-width">
          <Charts :chart-data="datacollection"/>
        </div>
      </b-col>
      <b-col cols="6">
        <b-form @submit="simulateOneDay">
          <b-row class="input-row">
            <b-col cols="6">
              <label>Porcentaje de Guadalajara:</label>
              <b-input
              id="input-guadalajara"
              required
              placeholder="Guadalajara"
              v-model="percentageGdl"
              ></b-input>
              <label>Porcentaje de Tlaquepaque:</label>
              <b-input
              id="input-tlaquepaque"
              required
              placeholder="Tlaquepaque"
              v-model="percentageTla"
              ></b-input>
              <label>Porcentaje de Tonala:</label>
              <b-input
              id="input-tonala"
              required
              placeholder="Tonala"
              v-model="percentageTon"
              ></b-input>
              <label>Numero de Estudiantes:</label>
              <b-input
              id="input-num-estudiantes"
              required
              placeholder="Estudiantes"
              v-model="numEstudiantes"
              ></b-input>
            </b-col>
            <b-col cols="6">
              <label>Porcentaje de Zapopan:</label>
              <b-input
              id="input-zapopan"
              required
              placeholder="Zapopan"
              v-model="percentageZpn"
              ></b-input>
              <label>Porcentaje de Tlajomulco:</label>
              <b-input
              id="input-tlajomulco"
              required
              placeholder="Tlajomulco"
              v-model="percentageTlj"
              ></b-input>
              <label>Porcentaje de El Salto:</label>
              <b-input
              id="input-salto"
              required
              placeholder="El Salto"
              v-model="percentageEls"
              ></b-input>
            </b-col>
            <b-button variant="primary" v-on:click="startSimulation">Comenzar Simulación</b-button>
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
      num_days: 60,
      counts: [],
      datacollection: null,
      numSanosArr: [],
      numEnfermosArr: [],
      numRecuperadosArr: [],
      numMuertosArr: [],
      currentDay: 0,
      labelDays: [],
      percentageGdl: .4,
      percentageZpn: .2,
      percentageTla: .1,
      percentageTon: .1,
      percentageTlj: .1,
      percentageEls: .1,
      numEstudiantes: 10000,    
      simulator : null,
    }
  },
  methods: {
    startSimulation(){
      this.simulator = new Simulator(this.numEstudiantes, this.percentageGdl, this.percentageZpn, this.percentageTla, this.percentageTon, this.percentageTlj, this.percentageEls);
      for(let i = 0; i < this.num_days; i++){
        // setTimeout(() => { this.fillData() ;}, 3000);
       //const sleep = (3000) => { return new Promise(resolve => setTimeout(this.fillData(), 3000)) } 
        this.fillData();
        // window.setInterval(() => { this.fillData()}, 3000)
      }
    },
    simulateOneDay(){
      this.counts = this.simulator.nextDay();
      this.numSanosArr = this.numSanosArr.concat(this.counts[0]);
      this.numEnfermosArr = this.numEnfermosArr.concat(this.counts[1]);
      this.numRecuperadosArr = this.numRecuperadosArr.concat(this.counts[2]);
      this.numMuertosArr = this.numMuertosArr.concat(this.counts[3]);
      this.currentDay++;
      this.labelDays = this.labelDays.concat(this.currentDay);
    },
    fillData () {
        this.simulateOneDay()
        this.datacollection = {
          labels: this.labelDays,
          datasets: [
            {
              label: 'Enfermos',
              backgroundColor: 'rgba(0,0,255,.3)',
              data: this.numEnfermosArr
            },
            {
              label: 'Recuperados',
              backgroundColor: 'rgba(0,210,210,.3)',
              data: this.numRecuperadosArr
            },
            {
              label: 'Fallecidos',
              backgroundColor: 'rgba(50,50,100,.3)',
              data: this.numMuertosArr
            },
            {
              label: 'Sanos',
              backgroundColor: 'rgba(200,20,25,.3)',
              data: this.numSanosArr
            },
          ]
        }
    }
  },
  mounted () {
    this.fillData()
  },
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
.chart-width {
  max-width: 80%;
}
</style>
