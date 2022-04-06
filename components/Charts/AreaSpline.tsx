import React, { Component } from "react";
// import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// https://apexcharts.com/docs/grid/
// https://apexcharts.com/react-chart-demos/area-charts/datetime-x-axis/#
export class AreaSpline extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          name: "$",
          data: [30.0, 30.5, 30, 29.5, 30, 30.2, 31, 30, 29],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          foreColor: "#ccc",
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: true,
          // row: {
          //   colors: ["#f3f4f5", "#fff"],
          //   opacity: 1,
          // },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        colors: ["#9127E3"],

        yaxis: {
          lines: {
            show: false,
          },
          tickAmount: 4,
        },
        xaxis: {
          lines: {
            show: false,
          },
          type: "date", //datetime

          categories: [
            new Date("2018-01-19T00:00:00.000Z").toLocaleString("default", {
              month: "short",
            }),
            new Date("2018-02-19T01:30:00.000Z").toLocaleString("default", {
              month: "short",
            }),
            new Date("2018-03-19T02:30:00.000Z").toLocaleString("default", {
              month: "short",
            }),
            new Date("2018-04-19T03:30:00.000Z").toLocaleString("default", {
              month: "short",
            }),
            new Date("2018-05-19T04:30:00.000Z").toLocaleString("default", {
              month: "short",
            }),
            new Date("2018-06-19T05:30:00.000Z").toLocaleString("default", {
              month: "short",
            }),
            new Date("2018-07-19T06:30:00.000Z").toLocaleString("default", {
              month: "short",
            }),
            new Date("2018-08-19T06:30:00.000Z").toLocaleString("default", {
              month: "short",
            }),
            new Date("2018-09-19T06:30:00.000Z").toLocaleString("default", {
              month: "short",
            }),
          ],
        },
        tooltip: {
          x: {
            show: false,
            // format: "dd/MM/yy HH:mm",
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        {typeof window !== "undefined" && (
          <ReactApexChart
            // @ts-ignore
            options={this.state.options}
            // @ts-ignore
            series={this.state.series}
            type="line"
            height={380}
          />
        )}
      </div>
    );
  }
}
