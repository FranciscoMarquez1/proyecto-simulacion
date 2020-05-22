<template>
  <div class="home">
    <b-row class="header">
      <b-col>
        <h1>Simulador Covid-19</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <div class="chart-width">
          <Charts :chart-data="datacollection"/>
        </div>
        <div class="chart-width">
          <ChartsNew :chart-data="casecollection"/>
        </div>
      </b-col>
      <b-col cols="6">
        <b-form @submit="simulateOneDay">
          <b-row class="input-row">
            <b-alert
              variant="danger"
              dismissible
              fade
              :show="showDismissibleAlert"
              @dismissed="showDismissibleAlert=false"
            >
              La suma de porcentajes debe dar 1
            </b-alert>
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
              <label>Días de Simulación:</label>
              <b-input
              required
              v-model="num_days"
              ></b-input>
            </b-col>
            <b-button variant="primary" v-on:click="startSimulation">Comenzar Simulación</b-button>
          </b-row>
        </b-form>
      <b-form>
      <b-row class="input-row">
          <b-col cols="6">
            <label>Dias Simulación Parcial:</label>
            <b-input
            v-model="partialSimDays"
            ></b-input>
          </b-col>
          <b-col cols="6">
            <b-button variant="primary" v-on:click="partialSimulation">Simular Días</b-button>
          </b-col>
        </b-row>
      </b-form>
        <b-form>
          <b-row class="input-row">
            <b-col cols="6">
              <label>Seguimiento de alumno aleatorio</label>
            </b-col>
            <b-col cols="6">
              <label v-if="this.trackStudent === null">Comienza una Simulaccion</label>
              <div v-else>
                <label >Ciudad de procedencia: {{this.trackStudent.city.name}}</label>
                <br>
                <b-icon icon="circle-fill" class="state-circle" v-bind:style="{color: this.stateColor()}"></b-icon>
              </div>
            </b-col>
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
import ChartsNew from '@/views/ChartsNew.vue';


export default {
  name: 'Home', 
  components: {
    Charts,
    ChartsNew,
  },  
  data(){
    return {
      num_days: 60,
      counts: [],
      datacollection: null,
      casecollection: null,
      numSanosArr: [],
      numEnfermosArr: [],
      numRecuperadosArr: [],
      numMuertosArr: [],
      currentDay: 0,
      labelDays: [],
      newCases: [],
      percentageGdl: .4,
      percentageZpn: .2,
      percentageTla: .1,
      percentageTon: .1,
      percentageTlj: .1,
      percentageEls: .1,
      numEstudiantes: 10000,
      partialSimDays: 10,  
      simulator : null,
      trackStudent: null,
      showDismissibleAlert: false,
    }
  },
  methods: {
    startSimulation(){
      if(!this.sumPercentages){
        this.showDismissibleAlert=true;
      }else{
        this.numSanosArr = [],
        this.numEnfermosArr = [],
        this.numRecuperadosArr = [],
        this.numMuertosArr = [],
        this.currentDay = 0,
        this.labelDays = [],
        this.simulator = new Simulator(this.numEstudiantes, this.percentageGdl, this.percentageTla, this.percentageZpn, this.percentageTon, this.percentageTlj, this.percentageEls);
        this.trackStudent = this.simulator.trackStudent;
        for(let i = 0; i < this.num_days; i++){
          this.fillData();
        }
      }
    },
    partialSimulation(){
      for(let i = 0; i < this.partialSimDays; i++){
        this.fillData();
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
      this.newCases = this.newCases.concat(this.counts[4]);
    },
    fillData () {
        this.simulateOneDay()
        this.datacollection = {
          labels: this.labelDays,
          datasets: [
            {
              label: 'Fallecidos',
              backgroundColor: 'rgba(0,0,0,.4)',
              data: this.numMuertosArr
            },
            {
              label: 'Recuperados',
              backgroundColor: 'rgba(46,64,130,0.4)',
              data: this.numRecuperadosArr
            },
            {
              label: 'Enfermos',
              backgroundColor: 'rgba(52,193,10,0.4)',
              data: this.numEnfermosArr
            },
            {
              label: 'Sanos',
              backgroundColor: 'rgba(159,192,233,.4)',
              data: this.numSanosArr
            },
          ]
        }
        this.casecollection = {
          labels: this.labelDays,
          datasets: [
            {
              label: 'Nuevos Casos',
              backgroundColor: 'rgba(52,193,10,0.4)',
              data: this.newCases
            },
          ]
        }
    },
    stateColor(){
      if (this.trackStudent.healt_state == 0){
        return "#9FC0E9";
      }
      if (this.trackStudent.healt_state == 1){
        return "#64C10A";
      }
      if (this.trackStudent.healt_state == 2){
        return "#2E4082";
      }
      else{
        return "#000000";
      }
    }
  },
  mounted () {
    this.fillData()
  },
  computed: {
    sumPercentages: function () {
      return ((Number(this.percentageGdl) + Number(this.percentageZpn) + Number(this.percentageTla) + Number(this.percentageTon) + Number(this.percentageTlj) + Number(this.percentageEls)) == 1)
    }
  }
}
</script>

<style>
.header {
  background-color: #C25B47;
}
.row {
  margin: 0px !important;
}
#body {
  background-color: #A988EE;
}
.input-row {
  margin: 40px !important;
  padding: 10px;
  background-color: #F3CA3F;
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
  margin: auto;
  margin-top: 20px;
}
.alert {
  margin: auto;
}
.state-circle{
  color: #9FC0E9;
}
</style>
