import React from 'react';

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export class HorizontalBarChart extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Yes',
          data: [48],
        },
        {
          name: 'No',
          data: [23],
        },
        {
          name: 'No with veto',
          data: [12],
        },
        {
          name: 'Abstain',
          data: [9],
        },
      ],
      options: {
        colors: ['#48bb78', '#ff9f43', '#e53e3e', '#00bdc9'],
        chart: {
          type: 'bar',
          // height: 150,
          stacked: true,
          stackType: '100%',
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 0, // add white space between blocks
          colors: ['#fff'],
        },
        title: {
          text: '',
        },
        xaxis: {
          categories: [''],
          tooltip: {
            enabled: false,
          },
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
          tooltip: {
            enabled: false,
          },
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
              return val + ' ' + 'validators';
            },
          },
        },
        fill: {
          opacity: 1,
        },

        legend: {
          show: false,
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
