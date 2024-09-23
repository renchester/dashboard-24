import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  LineElement,
  PointElement,
} from 'chart.js';
import { eachDayOfInterval, format, subDays } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
);

function StatisticsGraph() {
  // Get the last 7 days including today
  const today = new Date();
  const lastWeek = eachDayOfInterval({
    start: subDays(today, 6),
    end: today,
  });
  const weekLabels = lastWeek.map((day) => format(day, 'EEEE')); // Show day of the week

  const commitData: ChartData<'bar'> = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Commits in the past week',
        data: [8, 11, 4, 6, 7, 2, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const analyticsData: ChartData<'line'> = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Page Views',
        data: [609, 773, 954, 639, 772, 369, 965],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Error Logs',
        data: [8, 9, 10, 5, 4, 6, 10],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const barGraphOptions = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
  } as const;

  const lineGraphOptions = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 50,
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  return (
    <div>
      <div>
        <h2>Recent Commits</h2>
        <Bar data={commitData} options={barGraphOptions} />
      </div>

      <div>
        <h2>Web Analytics and Error Logs (Past Week)</h2>
        <Line data={analyticsData} options={lineGraphOptions} />
      </div>
    </div>
  );
}

export default StatisticsGraph;
