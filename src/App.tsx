import { useState } from 'react';
import ProfileCard from './components/ProfileCard';
import ActivityList from './components/ActivityList';
import StatisticsGraph from './components/StatisticsGraph';
import SettingsPanel from './components/SettingsPanel';

export type UserDetails = {
  firstName: string;
  lastName: string;
  username: string;
  title: string;
  email: string;
  bio: string;
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isEmailOn, setEmailStatus] = useState(false);
  const toggleDarkTheme = () => setIsDark((currentTheme) => !currentTheme);
  const toggleEmailStatus = () =>
    setEmailStatus((currentStatus) => !currentStatus);

  return (
    <div className={`body ${isDark ? 'dark-mode' : ''}`}>
      <div className="app">
        <div className="top">
          <h1>Dashboard</h1>
          <SettingsPanel
            isDark={isDark}
            toggleDarkTheme={toggleDarkTheme}
            isEmailOn={isEmailOn}
            toggleEmailStatus={toggleEmailStatus}
          />
        </div>
        <div className="main">
          {/* GRID */}
          <ProfileCard />
          <ActivityList />
          <StatisticsGraph isDark={isDark} />
        </div>
      </div>
    </div>
  );
}

export default App;
