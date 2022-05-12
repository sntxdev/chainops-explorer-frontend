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
          data: [64.77],
        },
        {
          name: 'No',
          data: [5],
        },
        {
          name: 'No with veto',
          data: [1],
        },
        {
          name: 'Abstain',
          data: [29.23],
        },
      ],
      options: {
        colors: ['#9fe6b9', '#ff8686', '#ffd029', '#e3e3e3'],
        chart: {
          type: 'bar',

          width: '100%',
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
        dataLabels: {
          enabled: false, // show/hide percentage value inside bars
        },
        legend: {
          show: false,
          position: 'bottom',
          horizontalAlign: 'left',
          offsetX: 0,
          onItemClick: {
            toggleDataSeries: false,
          },
        },
      },
    };
  }
  render() {
    return (
      <div id="chart" style={{ marginLeft: '-26px' }}>
        <Chart
          // @ts-ignore
          options={this.state.options}
          // @ts-ignore
          series={this.state.series}
          type="bar"
          height="70"
        />
      </div>
    );
  }
}
