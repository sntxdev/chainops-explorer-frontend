import React, { Component } from "react";
// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// https://apexcharts.com/docs/grid/
export class Donut extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      options: {
        colors: ["#1BE3DC", "#9127E3"],
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: true,
        },
        labels: ["Bonded", "Total"],
      },
      series: [25, 75],
    };
  }

  render() {
    return (
      <div className="donut">
        {typeof window !== "undefined" && (
          <Chart
            // @ts-ignore
            options={this.state.options}
            // @ts-ignore
            series={this.state.series}
            type="donut"
            width="400"
          />
        )}
      </div>
    );
  }
}

export default Donut;
