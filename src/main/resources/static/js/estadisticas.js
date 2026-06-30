document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/miembros-dia")
    .then((response) => response.json())
    .then((data) => {
      Highcharts.chart("grafico-lineas", {
        title: {
          text: "Miembros registrados por día",
        },

        xAxis: {
          categories: data.dias,
        },

        series: [
          {
            name: "Miembros",
            data: data.cantidades,
          },
        ],
      });
    });

  fetch("/api/actividades-tipo")
    .then((response) => response.json())
    .then((data) => {
      Highcharts.chart("grafico-torta", {
        chart: {
          type: "pie",
        },

        title: {
          text: "Actividades por tipo",
        },

        series: [
          {
            data: data,
          },
        ],
      });
    });

  fetch("/api/actividades-comuna")
    .then((response) => response.json())
    .then((data) => {
      Highcharts.chart("grafico-barras", {
        chart: {
          type: "column",
        },

        title: {
          text: "Actividades por comuna",
        },

        xAxis: {
          categories: data.comunas,
        },

        series: [
          {
            name: "Actividades",
            data: data.cantidades,
          },
        ],
      });
    });
});
