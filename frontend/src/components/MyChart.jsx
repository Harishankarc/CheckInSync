import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const MyChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart;

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy the old chart before creating a new one
      if (myChart) {
        myChart.destroy();
      }

      // Create a new chart instance
      myChart = new ChartJS(ctx, {
        type: 'bar',  // Example chart type
        data: data,
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              enabled: true
            }
          }
          }
      });
    }

    return () => {
      if (myChart) {
        myChart.destroy(); // Clean up chart instance on unmount
      }
    };
  }, [data]); // Re-run the effect when data changes

  return <canvas ref={chartRef} />;
};

export default MyChartComponent;
