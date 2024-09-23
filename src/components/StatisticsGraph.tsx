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
import { _DeepPartialObject } from 'chart.js/dist/types/utils';

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

function StatisticsGraph({ isDark }: { isDark: boolean }) {
  // Get the last 7 days including today
  const today = new Date();
  const lastWeek = eachDayOfInterval({
    start: subDays(today, 6),
    end: today,
  });
  const weekLabels = lastWeek.map((day) => format(day, 'EEEE')); // Show day of the week

  const getChartFontColor = () => (isDark ? 'white' : 'dark-grey');

  const commitData: ChartData<'bar'> = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Commits in the past week',
        data: [8, 11, 4, 6, 7, 2, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const analyticsData: ChartData<'line'> = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Page Views',
        data: [609, 773, 954, 639, 772, 369, 965],
        fill: true,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Error Logs',
        data: [8, 9, 10, 5, 4, 6, 10],
        fill: true,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="card card--graph graph">
      <div className="graph__box">
        <h2>Web Analytics and Error Logs</h2>
        <Line
          className="graph__analytics"
          data={analyticsData}
          options={{
            responsive: true,
            color: getChartFontColor(),
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Page Views',
                  color: getChartFontColor(),
                },
                ticks: {
                  color: getChartFontColor(),
                },
              },
              x: {
                ticks: {
                  color: getChartFontColor(),
                },
              },
            },
          }}
        />
      </div>
      <div className="graph__box ">
        <h2>Recent Commits</h2>
        <Bar
          className="graph__commit"
          data={commitData}
          options={{
            responsive: true,
            color: getChartFontColor(),
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'No. of Commits',
                  color: getChartFontColor(),
                },
                ticks: {
                  color: getChartFontColor(),
                },
              },
              x: {
                ticks: {
                  color: getChartFontColor(),
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default StatisticsGraph;
