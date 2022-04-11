import React, { Component } from 'react';
// import Chart from "react-apexcharts";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export class Radialbar extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      options: {
        chart: {
          // height: 280,
          type: 'radialBar',
        },

        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: '70%',
            },

            // startAngle: -135,
            // endAngle: 135,
            track: {
              background: '#1BE3DC',

              // startAngle: -135,
              // endAngle: 135,
            },
            dataLabels: {
              showOn: 'always',
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '13px',
              },
              value: {
                color: '#111',
                fontSize: '30px',
                show: true,
              },
            },
          },
        },
        fill: {
          colors: ['#9127E3'],

          // gradient: {
          //   shade: 'dark',
          //   type: 'vertical',
          //   gradientToColors: ['#9127E3'],
          //   stops: [0, 100],
          // },
        },
        stroke: {
          lineCap: 'round',
        },
        labels: ['Supply'],
      },
      series: [75],
    };
  }

  render() {
    return (
      <div className="radialbar">
        {typeof window !== 'undefined' && (
          <Chart
            // @ts-ignore
            options={this.state.options}
            // @ts-ignore
            series={this.state.series}
            type="radialBar"
            height={280}
          />
        )}
      </div>
    );
  }
}

export default Radialbar;
