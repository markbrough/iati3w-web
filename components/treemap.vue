<template>
    <div>
      <canvas ref="treemapCanvas" :class="`treemap${clickable ? ' clickable' : ''}`"></canvas>
    </div>
</template>
<style scoped>
.clickable {
  cursor: pointer;
}
</style>
<script>
import { mapState } from 'vuex'
import Chart from 'chart.js';
import 'chartjs-chart-treemap';
export default {
  name: 'TreeMap',
  props: {
    data: Object,
    type: String,
    summariseBy: {
      type: String,
      default: 'activities'
    },
    colors: Object,
    clickable: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      chart: null,
      defaultColors: [
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
      ]
    }
  },
  computed: {
    treeMapData() {
      return Object.entries(this.data).map(item => {
        return {
          item: item[1].name,
          entry: this.truncate(item[1].name),
          stub: item[1].stub,
          activities: item[1].activities ? item[1].activities.filter(activity => this.checkSource(activity)).length : null,
          organisations: item[1].organisations ? item[1].organisations : this.$options.filters.flatten(item[1].orgs).length
        }
      })
    },
    datasets() {
      return [
        {
          label: 'Sectors',
          tree: this.treeMapData,
          key: this.summariseBy,
          groups: ['entry'],
          borderWidth: 1,
          fontColor: "white",
          borderColor: "rgba(255,255,255,1)",
          //hoverBackgroundColor: "rgba(220,230,220,0.5)",
          backgroundColor: (ctx) => {
            if (ctx.dataset.data.length < 1) {
              return 'transparent';
            }
            if (this.colors) {
              return this.colors[ctx.dataset.data[ctx.dataIndex]._data.children[0].item]
            }

            return this.defaultColors[ctx.dataIndex]
          }
        }
      ]
    },...mapState(['source'])
  },
  methods: {
    truncate(string) {
      return this.$options.filters.truncate(
        string, 15
      )
    },
    formatNumber(number) {
      return this.$options.filters.formatNumber(
        number
      )
    },
    drawChart() {
      this.chart = new Chart(this.$refs.treemapCanvas, {
        type: "treemap",
        data: {
          datasets: this.datasets
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
            title: (item, data) => {
              item = item[0];
              return data.datasets[item.datasetIndex].data[item.index].g;
              },
            label: (item, data) => {
              var dataset = data.datasets[item.datasetIndex];
              var dataItem = dataset.data[item.index];
              const _d = dataItem._data.children[0]
              var out = []
              if (_d.activities) {
                out.push(` Activities: ${this.formatNumber(_d.activities)}`)
              } else if (_d.organisations) {
                out.push(` Organisations: ${this.formatNumber(_d.organisations)}`)
              }
              return out
              }
            }
          },
          onClick: ((c, i, d) => {
            if (this.clickable) {
              const type = this.type
              const stub = this.datasets[0].data[i[0]._index]._data.children[0].stub
              this.$router.push({name: 'sectors-type-stub', params: { type: type, stub: stub }})
            }
          })
        }
      })
    },
    checkSource(activity) {
      if (this.source == 'all') {
        return true
      } else if ((this.source == '3w') && (activity.length == 8)) {
        return true
      } else if ((this.source == 'iati') && (activity.length != 8)) {
        return true
      }
      return false
    }
  },
  mounted() {
    this.drawChart();
  },
  watch: {
    data() {
      this.chart.data.datasets[0].tree = this.treeMapData
      this.chart.update()
    },
    source() {
      this.chart.data.datasets[0].tree = this.treeMapData
      this.chart.update()
    }
  }
}
</script>

<style scoped>
  .treemap {
    max-width: 100%;
    min-height: 40vh;
    margin: auto
  }
</style>