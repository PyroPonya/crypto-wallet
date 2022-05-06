<template>
  <Chart
    :size="{ width: 500, height: 400 }"
    :data="data"
    :margin="margin"
    :direction="direction"
    id="singleChart"
  >
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Line :dataKeys="['name', 'pl']" />
    </template>
  </Chart>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Chart, Grid, Line } from 'vue3-charts';

export default defineComponent({
  name: 'LineChart',
  components: { Chart, Grid, Line },
  props: {
    chartData: Object,
  },
  setup() {
    /***
     * ResizeObserver is not defined
     * 500
     ***/
    const data = ref([
      { name: 'Jan', pl: 1000, avg: 500, inc: 300 },
      { name: 'Feb', pl: 2000, avg: 900, inc: 400 },
      { name: 'Apr', pl: 400, avg: 400, inc: 500 },
      { name: 'Mar', pl: 3100, avg: 1300, inc: 700 },
      { name: 'May', pl: 200, avg: 100, inc: 200 },
      { name: 'Jun', pl: 600, avg: 400, inc: 300 },
      { name: 'Jul', pl: 500, avg: 90, inc: 100 },
    ]);
    const direction = ref('horizontal');
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    });

    return { data, direction, margin };
  },
});
</script>

<style lang="sass" scoped>
#sicgleChart
  color: #2ecc71
</style>
