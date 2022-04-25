import React from 'react';

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export class HorizontalBarChart extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Marine Sprite',
          data: [44],
        },
        {
          name: 'Striking Calf',
          data: [53],
        },
        {
          name: 'Tank Picture',
          data: [12],
        },
        {
          name: 'Bucket Slope',
          data: [9],
        },
        {
          name: 'Reborn Kid',
          data: [25],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          stackType: '100%',
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        title: {
          text: '100% Stacked Bar',
        },
        xaxis: {
          categories: [2008],
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              colors: '#78909c',
            },
          },
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + 'K';
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
      },
    };
  }
  render() {
    return (
      <div id="chart">
        <Chart
          // @ts-ignore
          options={this.state.options}
          // @ts-ignore
          series={this.state.series}
          type="bar"
          height={100}
        />
      </div>
    );
  }
}
