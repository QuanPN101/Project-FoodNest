import React from 'react';
import Chart from 'react-apexcharts';

const ReportsChart = () => {
  const series = [
    {
      name: 'Đơn hàng',
      data: [31, 40, 28, 51, 42, 82, 56],
    },
    {
      name: 'Khách hàng',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
    {
      name: 'Gian hàng',
      data: [15, 11, 32, 18, 9, 24, 11],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 4,
    },
    colors: ['#4154f1', '#2eca6a', '#ff771d'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.4,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      type: 'datetime',
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Báo cáo</h5>
        <Chart options={options} series={series} type="area" height={350} />
      </div>
    </div>
  );
};

export default ReportsChart;
