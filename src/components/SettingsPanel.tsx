import Input from './shared/Input';

function SettingsPanel() {
  // Toggle switches for dark mode, email notification
  // Edit user preferences
  return (
    <div>
      <form action="">
        <Input
          id="text"
          name="text"
          value="text"
          handleChange={() => null}
          type="text"
          label="text"
          isValid
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SettingsPanel;
