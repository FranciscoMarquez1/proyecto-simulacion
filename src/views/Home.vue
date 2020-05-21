<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {Simulator} from '@/classes/Covid.js';

let simulator = new Simulator(10000, 0.2, 0.2, 0.25, 0.2, 0.1, 0.05)

let num_days = 60;

for(let j = 0; j < num_days; j++){
  let counts = simulator.nextDay();
  console.log("Day:", j);
  console.log("Sanos:",counts[0]);
  console.log("Enfermos:",counts[1]);
  console.log("Recuperados:",counts[2]);
  console.log("Muertos:",counts[3]);
  console.log("---------------------------");
}

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
