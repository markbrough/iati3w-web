// 1. Import Chart.js so you can use the global Chart object
import Chart from 'chart.js'
// 2. Import the `generateChart()` method to create the vue component.
import { generateChart, Bar } from 'vue-chartjs'

// 3. Import the treemap package (not sure what exports are in the package. You will need to look it up
import { ChartJSChartTreemap } from 'chartjs-chart-treemap'


const TreeMap = generateChart('tree-map', 'treemap')

export default {
  extends: TreeMap,
  props: ['data', 'options'],
  mounted() {
    console.log('this', this)
    /* this.renderChart(this.data, this.options)*/
  },
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    }
  }
}
