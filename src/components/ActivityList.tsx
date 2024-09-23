import { subHours } from 'date-fns';
import { useMemo, useState } from 'react';

type Activity = {
  id: string;
  title: string;
  date: string;
};

function ActivityItem() {
  {
    /* //TODO: Add hover effects to highlight items */
  }
  return <div>ActivityList</div>;
}

const initialActivities: Activity[] = [
  { id: '1', title: 'Logged In', date: subHours(new Date(), 24).toISOString() },
  {
    id: '2',
    title: 'Updated Profile',
    date: subHours(new Date(), 22).toISOString(),
  },
  {
    id: '3',
    title: 'Daily Standup',
    date: subHours(new Date(), 18).toISOString(),
  },
  {
    id: '4',
    title: 'Lunch Meeting with Anna',
    date: subHours(new Date(), 14).toISOString(),
  },
  {
    id: '5',
    title: 'Code Review',
    date: subHours(new Date(), 8).toISOString(),
  },
];

function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  // Always sort activities by date in descending order
  const sortedActivities = useMemo(() => {
    return activities.slice().sort((a, b) => b.date.localeCompare(a.date));
  }, [activities]);

  return (
    <div>
      <h2>Recent Activities</h2>
      <ul>
        {sortedActivities.map((activity) => (
          <ActivityItem key={activity.id} />
        ))}
      </ul>

      {/* //TODO: Add additional activity */}
    </div>
  );
}

export default ActivityList;
