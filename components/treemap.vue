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
  props: ['data'],
  data() {
    return {
    }
  },
  computed: {
    treeMapData() {
      return Object.entries(this.data).map(item => {
        return {
          entry: item[1].name,
          activities: item[1].activities.length
        }
      })
    }
  },
  methods: {
    drawChart() {
      new Chart(this.$refs.treemapCanvas, {
        type: "treemap",
        data: {
          datasets: [
          {
            label: 'Basic treemap',
            tree: this.treeMapData,
            key: "activities",
            groups: ['entry'],
            borderWidth: 1,
            fontColor: "white",
            borderColor: "rgba(200,200,200,1)",
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
              return dataset.key + ": " + dataItem.v;
              }
            }
          }
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