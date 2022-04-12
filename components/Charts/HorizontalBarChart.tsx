import React from 'react';

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export class HorizontalBarChart extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          data: [44],
        },
      ],
      options: {
        chart: {
          height: 70,
          type: 'bar',
          stacked: true,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '20%',
            colors: {
              backgroundBarColors: ['#40475D'],
            },
          },
        },
        colors: ['#f02fc2'],
        stroke: {
          width: 0,
        },
        series: [
          {
            name: 'Process 3',
            data: [74],
          },
        ],
        fill: {
          type: 'gradient',
          gradient: {
            gradientToColors: ['#6094ea'],
          },
        },
        title: {
          floating: true,
          offsetX: -10,
          offsetY: 5,
          text: 'test',
        },
        subtitle: {
          floating: true,
          align: 'right',
          offsetY: 0,
          text: '74%',
          style: {
            fontSize: '15px',
          },
        },
        tooltip: {
          enabled: false,
        },
        xaxis: {
          categories: ['Process 3'],
        },
        yaxis: {
          max: 100,
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
