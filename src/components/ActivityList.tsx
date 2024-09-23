import { format, subHours } from 'date-fns';
import { useState } from 'react';
import Overlay from './shared/Overlay';

type Activity = {
  id: string;
  title: string;
  date: string;
  status: 'Completed' | 'Ongoing' | 'Overdue' | 'Pending';
  assignee: string[];
};

function ActivityItem({ activity }: { activity: Activity }) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const highlight = () => setIsHighlighted(true);
  const dehighlight = () => setIsHighlighted(false);

  return (
    <tr
      key={activity.id}
      tabIndex={0}
      onMouseEnter={() => highlight()}
      onMouseLeave={() => dehighlight()}
      onFocus={() => highlight()}
      onBlur={() => dehighlight()}
      className={isHighlighted ? 'activities__focus' : ''}
    >
      <td>
        <time dateTime={activity.date} className="activities__date">
          {format(new Date(activity.date), 'PPp')}
        </time>
      </td>
      <td>
        <span className="activities__title">{activity.title}</span>
      </td>
      <td>
        <span className={`activities__status ${activity.status}`}>
          {activity.status}
        </span>
      </td>
    </tr>
  );
}

function ActivityList() {
  const now = new Date();
  const [showFull, setShowFull] = useState(false);
  const hideChildren = () => setShowFull(false);

  const activities: Activity[] = [
    {
      id: '1',
      title: 'Review presentation',
      date: now.toISOString(),
      status: 'Pending',
      assignee: [],
    },
    {
      id: '2',
      title: 'Checked emails',
      date: subHours(now, 1.5).toISOString(),
      status: 'Completed',
      assignee: [],
    },
    {
      id: '3',
      title: 'Team meeting',
      date: subHours(now, 2).toISOString(),
      status: 'Completed',
      assignee: ['John Doe', 'Jane Smith'],
    },
    {
      id: '4',
      title: 'Prepared presentation for client',
      date: subHours(now, 3).toISOString(),
      status: 'Overdue',
      assignee: [],
    },
    {
      id: '5',
      title: 'Client meeting: Project Kickoff',
      date: subHours(now, 5).toISOString(),
      status: 'Completed',
      assignee: ['Juan Dela Cruz'],
    },
    {
      id: '6',
      title: 'Documented meeting minutes',
      date: subHours(now, 6.5).toISOString(),
      status: 'Ongoing',
      assignee: [],
    },
    {
      id: '7',
      title: 'Reviewed project requirements',
      date: subHours(now, 7).toISOString(),
      status: 'Completed',
      assignee: [],
    },
    {
      id: '8',
      title: 'Logged in',
      date: subHours(now, 8.5).toISOString(),
      status: 'Completed',
      assignee: [],
    },

    {
      id: '9',
      title: 'Logged out',
      date: subHours(now, 24 + 1).toISOString(),
      status: 'Completed',
      assignee: [],
    },
    {
      id: '10',
      title: "Reviewed yesterday's client feedback",
      date: subHours(now, 24 + 1.5).toISOString(),
      status: 'Completed',
      assignee: ['John Doe'],
    },
    {
      id: '11',
      title: 'Internal project discussion',
      date: subHours(now, 24 + 3).toISOString(),
      status: 'Completed',
      assignee: ['John Doe', 'Jane Smith'],
    },
    {
      id: '12',
      title: 'Lunch break',
      date: subHours(now, 24 + 4.5).toISOString(),
      status: 'Completed',
      assignee: [],
    },
    {
      id: '13',
      title: 'Code review session',
      date: subHours(now, 24 + 6).toISOString(),
      status: 'Overdue',
      assignee: ['Jane Smith'],
    },
    {
      id: '14',
      title: 'Prepared weekly status report',
      date: subHours(now, 24 + 7).toISOString(),
      status: 'Completed',
      assignee: [],
    },
    {
      id: '15',
      title: 'Logged in',
      date: subHours(now, 24 + 8.5).toISOString(),
      status: 'Completed',
      assignee: [],
    },

    {
      id: '16',
      title: 'Logged out',
      date: subHours(now, 48 + 1).toISOString(),
      status: 'Completed',
      assignee: [],
    },
    {
      id: '17',
      title: 'Reviewed project timeline',
      date: subHours(now, 48 + 2).toISOString(),
      status: 'Completed',
      assignee: [],
    },
    {
      id: '18',
      title: 'Client meeting: Progress update',
      date: subHours(now, 48 + 3).toISOString(),
      status: 'Completed',
      assignee: ['Juan Dela Cruz'],
    },
    {
      id: '19',
      title: 'Worked on presentation slides',
      date: subHours(now, 48 + 4).toISOString(),
      status: 'Completed',
      assignee: [],
    },
    {
      id: '20',
      title: 'Team brainstorming session',
      date: subHours(now, 48 + 6).toISOString(),
      status: 'Completed',
      assignee: ['John Doe', 'Jane Smith'],
    },
    {
      id: '21',
      title: 'Updated project documentation',
      date: subHours(now, 48 + 7).toISOString(),
      status: 'Completed',
      assignee: [],
    },
    {
      id: '22',
      title: 'Logged in',
      date: subHours(now, 48 + 8.5).toISOString(),
      status: 'Completed',
      assignee: [],
    },
  ];

  return (
    <div className="card card--activity activities">
      <h2>Activity Log</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {activities.slice(0, 8).map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => setShowFull((prev) => !prev)}
        className="activities__more"
      >
        Show more activities
      </button>

      {showFull && (
        <Overlay hideChildren={hideChildren}>
          <div className="modal">
            <button type="button" onClick={hideChildren} className="btnClose">
              <span className="material-symbols-outlined">close</span>
            </button>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </tbody>
            </table>
          </div>
        </Overlay>
      )}
    </div>
  );
}

export default ActivityList;
