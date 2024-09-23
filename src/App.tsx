import { useState } from 'react';
import Providers from './Providers';
import ProfileCard from './components/ProfileCard';
import Switch from './components/shared/Switch';
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
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: 'Renchester',
    lastName: 'Ramos',
    username: 'renchester',
    title: 'Full-stack Developer',
    email: 'renchesterjramos@gmail.com',
    bio: 'A full-stack web developer with a background in architecture, he has a passion for creating smooth experiences for the end-user.',
  });
  const handleDetailsChange = (name: string, value: string) => {
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [isDark, setIsDark] = useState(true);
  const [isEmailOn, setEmailStatus] = useState(false);
  const toggleDarkTheme = () => setIsDark((currentTheme) => !currentTheme);
  const toggleEmailStatus = () =>
    setEmailStatus((currentStatus) => !currentStatus);

  return (
    <Providers>
      <div className={`app ${isDark ? 'dark-mode' : ''}`}>
        <div className="top">
          <h1 className="top__title">Dashboard</h1>
          <form action="" className="top__settings">
            <div className="top__settingsBox">
              <label htmlFor="switch_theme" className="top__settingsLabel">
                Dark Mode:
              </label>
              <Switch
                isOn={isDark}
                id="switch_theme"
                handler={toggleDarkTheme}
              />
            </div>
            <div className="top__settingsBox">
              <label htmlFor="switch_email" className="top__settingsLabel">
                Email Notifications:
              </label>
              <Switch
                isOn={isEmailOn}
                id="switch_email"
                handler={toggleEmailStatus}
              />
            </div>
          </form>
        </div>
        <div className="main">
          {/* GRID */}
          <ProfileCard details={userDetails} />
          <ActivityList />
          <StatisticsGraph />
          {/* <SettingsPanel
            handleDetailsChange={handleDetailsChange}
            userDetails={userDetails}
          /> */}
        </div>
      </div>
    </Providers>
  );
}

export default App;
