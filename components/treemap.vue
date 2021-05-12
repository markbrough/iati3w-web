<template>
    <div>
      <canvas ref="treemapCanvas" class="treemap"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';
import 'chartjs-chart-treemap';
export default {
  name: 'TreeMap',
  props: ['data', 'type'],
  data() {
    return {
    }
  },
  computed: {
    treeMapData() {
      return Object.entries(this.data).map(item => {
        return {
          entry: item[1].name,
          stub: item[1].stub,
          activities: item[1].activities.length,
          organisations: this.$options.filters.flatten(item[1].orgs).length
        }
      })
    }
  },
  methods: {
    drawChart() {
      const datasets = [
        {
          label: 'Sectors',
          tree: this.treeMapData,
          key: "activities",
          groups: ['entry'],
          borderWidth: 1,
          fontColor: "white",
          borderColor: "rgba(255,255,255,1)",
          //hoverBackgroundColor: "rgba(220,230,220,0.5)",
          backgroundColor: [
            '#CF3D1E',
            '#F15623',
            '#F68B1F',
            '#FFC60B',
            '#DFCE21',
            '#BCD631',
            '#95C93D',
            '#48B85C',
            '#00833D',
            '#00B48D',
            '#60C4B1',
            '#27C4F4',
            '#478DCB',
            '#3E67B1',
            '#4251A3',
            '#59449B',
            '#6E3F7C',
            '#6A246D',
            '#8A4873',
            '#EB0080',
            '#EF58A0',
            '#C05A89'
          ],
        }
      ]
      new Chart(this.$refs.treemapCanvas, {
        type: "treemap",
        data: {
          datasets: datasets
        },
        options: {
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: false
          },
          tooltips: {
          callbacks: {
            title: function(item, data) {
              item = item[0];
              return data.datasets[item.datasetIndex].data[item.index].g;
              },
            label: function(item, data) {
              var dataset = data.datasets[item.datasetIndex];
              var dataItem = dataset.data[item.index];
              const _d = dataItem._data.children[0]
              return [` Activities: ${_d.activities}`, ` Organisations: ${_d.organisations}`]
              }
            }
          },
          onClick: ((c, i, d) => {
            const type = this.type
            const stub = datasets[0].data[i[0]._index]._data.children[0].stub
            this.$router.push({name: 'sectors-type-stub', params: { type: type, stub: stub }})
          })
        }
      })
    }
  },
  mounted() {
    this.drawChart();
  },
}
</script>

<style scoped>
  .treemap {
    max-width: 100%;
    min-height: 40vh;
    margin: auto
  }
</style>