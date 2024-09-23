import Switch from './shared/Switch';

function SettingsPanel({
  isDark,
  toggleDarkTheme,
  isEmailOn,
  toggleEmailStatus,
}: {
  isDark: boolean;
  toggleDarkTheme: () => void;
  isEmailOn: boolean;
  toggleEmailStatus: () => void;
}) {
  return (
    <form action="" className="top__settings">
      <div className="top__settingsBox">
        <label htmlFor="switch_theme" className="top__settingsLabel">
          Dark Mode:
        </label>
        <Switch isOn={isDark} id="switch_theme" handler={toggleDarkTheme} />
      </div>
      <div className="top__settingsBox">
        <label htmlFor="switch_email" className="top__settingsLabel">
          Notifications:
        </label>
        <Switch
          isOn={isEmailOn}
          id="switch_email"
          handler={toggleEmailStatus}
        />
      </div>
    </form>
  );
}

export default SettingsPanel;
