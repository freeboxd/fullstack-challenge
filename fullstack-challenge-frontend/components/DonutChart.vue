<template>
  <div class="donut-chart" ref="chartDiv" id="chartdiv"></div>
</template>

<script lang="ts">
import  { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component
export default class DonutChart extends Vue {
  @Prop({
    required: false,
    default: () => [],
    type: Array,
  }) public chartData!: any[];
  public chart!: am4charts.PieChart;

  // This the only way I could manage to make the chart
  // re-render when there's new data
  @Watch('chartData', { immediate: false })
  public updateChart(newChartData: any[], oldChartData: any[]) {
    // doesn't re-render if there isn't a different length
    if (newChartData.length !== oldChartData.length) {
      // all setup copied from the amcharts' docs
      this.chart = am4core.create(this.$refs["chartDiv"] as HTMLDivElement, am4charts.PieChart);
      let chart = this.chart;
      chart.data = newChartData;
  
      chart.height = 400;
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "participation";
      pieSeries.dataFields.category = "firstName";
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
  
      chart.legend = new am4charts.Legend();
      chart.legend.position = "right";
      chart.legend.scrollable = true;
  
      chart.innerRadius = am4core.percent(50);
  
      this.chart = chart;
    }
  }

  public mounted() {
    this.chart = am4core.create(this.$refs["chartDiv"] as HTMLDivElement, am4charts.PieChart);
  }
}
</script>

<style>
.donut-chart {
  height: 400px;
}
</style>