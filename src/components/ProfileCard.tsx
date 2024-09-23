import { useState } from 'react';
import { UserDetails } from '../App';
import Overlay from './shared/Overlay';
import Input from './shared/Input';

function ProfileCard() {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: 'Renchester',
    lastName: 'Ramos',
    username: 'renchester',
    title: 'Full-stack Developer',
    email: 'renchesterjramos@gmail.com',
    bio: 'A full-stack web developer with a background in architecture. He has passion for creating smooth experiences for the end-user.',
  });
  const overrideDetails = (updatedDetails: UserDetails) => {
    setUserDetails(updatedDetails);
  };

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
          return { isValid: false, error: `Name is required` };
        } else if (value.length > 26) {
          return { isValid: false, error: `Name is too long` };
        }
        break;
      case 'username':
        if (value.length < 3) {
          return {
            isValid: false,
            error: 'Username must be at least 3 characters',
          };
        } else if (value.length > 21) {
          return {
            isValid: false,
            error: 'Username must be less than 21 characters',
          };
        }
        break;
      default:
        if (value.trim() === '') {
          return { isValid: false, error: `${name} cannot be empty` };
        } else if (value.length > 300) {
          return { isValid: false, error: `${name} is too long` };
        }
    }
    return { isValid: true, error: '' };
  };

  const [showFull, setShowFull] = useState(false);
  const hideChildren = () => setShowFull(false);

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

    hideChildren();
  };

  return (
    <div className="card card--profile profile">
      <img
        src="/profile.jpeg"
        alt="Profile picture"
        className="profile__image"
      />

      <div className="profile__details">
        <h2 className="profile__name">
          {userDetails.firstName} {userDetails.lastName}
        </h2>
        <span className="profile__title">{userDetails.title}</span>
      </div>

      <p className="profile__bio">{userDetails.bio}</p>

      <ul className="profile__links">
        <li className="profile__link" tabIndex={0}>
          <a href="#" rel="noopener noreferrer">
            <span className="material-symbols-outlined">email</span>
            <span id="profile__email" hidden>
              Email:
            </span>
            <span aria-labelledby="profile__email" className="profile__meta">
              {userDetails.email}
            </span>
          </a>
        </li>
        <li className="profile__link">
          <a href="#" rel="noopener noreferrer">
            <span className="material-symbols-outlined">alternate_email</span>
            <span id="profile__username" hidden>
              Username:
            </span>
            <span aria-labelledby="profile__username" className="profile__meta">
              {userDetails.username}
            </span>
          </a>
        </li>
      </ul>

      <button
        type="button"
        onClick={() => setShowFull((prev) => !prev)}
        className="profile__settings"
      >
        <span className="material-symbols-outlined">settings</span>
      </button>

      {showFull && (
        <Overlay hideChildren={hideChildren}>
          <form
            action=""
            onSubmit={handleFormSubmit}
            className="modal settings"
          >
            <button type="button" onClick={hideChildren} className="btnClose">
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="settings__section">
              <h4 className="settings__heading">Edit User Details:</h4>
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
                className="btnSave"
              >
                Save changes
              </button>
            </div>
          </form>
        </Overlay>
      )}
    </div>
  );
}

export default ProfileCard;
