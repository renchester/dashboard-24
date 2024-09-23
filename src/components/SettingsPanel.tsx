import { useState } from 'react';
import { UserDetails } from '../App';
import Input from './shared/Input';
import Switch from './shared/Switch';
import Overlay from './shared/Overlay';

function SettingsPanel({
  userDetails,
  overrideDetails,
  isDark,
  toggleDarkTheme,
  isEmailOn,
  toggleEmailStatus,
}: {
  userDetails: UserDetails;
  overrideDetails: (details: UserDetails) => void;
  isDark: boolean;
  toggleDarkTheme: () => void;
  isEmailOn: boolean;
  toggleEmailStatus: () => void;
}) {
  const [updatedValues, setUpdatedValues] = useState<UserDetails>(userDetails);
  const [status, setStatus] = useState<
    Record<keyof UserDetails, { isValid: boolean; error: string }>
  >({
    firstName: {
      isValid: true,
      error: '',
    },
    lastName: {
      isValid: true,
      error: '',
    },
    username: {
      isValid: true,
      error: '',
    },
    title: {
      isValid: true,
      error: '',
    },
    email: {
      isValid: true,
      error: '',
    },
    bio: {
      isValid: true,
      error: '',
    },
  });
  // Validation function based on the input field
  const validateField = (
    name: string,
    value: string,
  ): { isValid: boolean; error: string } => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return { isValid: false, error: 'Invalid email address' };
        }
        break;
      case 'firstName':
      case 'lastName':
        if (value.trim() === '') {
          return { isValid: false, error: `First/Last Name is required` };
        }
        break;
      case 'username':
        if (value.length < 3) {
          return {
            isValid: false,
            error: 'Username must be at least 3 characters',
          };
        }
        break;
      default:
        if (value.trim() === '') {
          return { isValid: false, error: `${name} cannot be empty` };
        }
    }
    return { isValid: true, error: '' };
  };

  const [showFull, setShowFull] = useState(false);
  const hideMenu = () => setShowFull(false);

  // Handle changes and perform validation
  const handleDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const validationStatus = validateField(name, value);

    // Update the form values
    setUpdatedValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update the validation status
    setStatus((prev) => ({
      ...prev,
      [name]: validationStatus,
    }));
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if there are validation errors
    const hasErrors = Object.values(status).some((field) => !field.isValid);

    if (hasErrors) {
      // If errors exist, prevent submission
      return;
    }

    // If no errors, override user details with updated values
    overrideDetails(updatedValues);

    hideMenu();
  };

  return (
    <form action="" className="top__settings" onSubmit={handleFormSubmit}>
      <div className="top__settingsBox">
        <label htmlFor="switch_theme" className="top__settingsLabel">
          Dark Mode:
        </label>
        <Switch isOn={isDark} id="switch_theme" handler={toggleDarkTheme} />
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

      <button type="button" onClick={() => setShowFull((prev) => !prev)}>
        Settings
      </button>

      {showFull && (
        <Overlay hideChildren={hideMenu}>
          <div className="modal">
            <div>
              <div>
                <label htmlFor="modal_theme" className="">
                  Dark Mode:
                </label>
                <Switch
                  isOn={isDark}
                  id="modal_theme"
                  handler={toggleDarkTheme}
                />
              </div>
              <div>
                <label htmlFor="modal_email" className="">
                  Email Notifications:
                </label>
                <Switch
                  isOn={isEmailOn}
                  id="modal_email"
                  handler={toggleEmailStatus}
                />
              </div>
            </div>

            <Input
              id="firstName"
              name="firstName"
              value={updatedValues.firstName}
              handleChange={handleDetailsChange}
              type="text"
              label="First Name"
              isValid={status.firstName.isValid}
              errorMessage={status.firstName.error}
            />
            <Input
              id="lastName"
              name="lastName"
              value={updatedValues.lastName}
              handleChange={handleDetailsChange}
              type="text"
              label="Last Name"
              isValid={status.lastName.isValid}
              errorMessage={status.lastName.error}
            />
            <Input
              id="username"
              name="username"
              value={updatedValues.username}
              handleChange={handleDetailsChange}
              type="text"
              label="Username"
              isValid={status.username.isValid}
              errorMessage={status.username.error}
            />
            <Input
              id="title"
              name="title"
              value={updatedValues.title}
              handleChange={handleDetailsChange}
              type="text"
              label="Title"
              isValid={status.title.isValid}
              errorMessage={status.title.error}
            />
            <Input
              id="email"
              name="email"
              value={updatedValues.email}
              handleChange={handleDetailsChange}
              type="email"
              label="Email"
              isValid={status.email.isValid}
              errorMessage={status.email.error}
            />

            <Input
              id="bio"
              name="bio"
              value={updatedValues.bio}
              handleChange={handleDetailsChange}
              type="text"
              label="Bio"
              isValid={status.bio.isValid}
              errorMessage={status.bio.error}
              isTextarea
            />
            <button
              type="submit"
              disabled={Object.values(status).some((field) => !field.isValid)}
            >
              Save changes
            </button>
          </div>
        </Overlay>
      )}
    </form>
  );
}

export default SettingsPanel;
