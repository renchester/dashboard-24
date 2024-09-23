import { useState } from 'react';
import { UserDetails } from '../App';
import Input from './shared/Input';
import Overlay from './shared/Overlay';

function EditProfile({
  userDetails,
  hideChildren,
  overrideDetails,
}: {
  userDetails: UserDetails;
  hideChildren: () => void;
  overrideDetails: (newDetails: UserDetails) => void;
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
    <Overlay hideChildren={hideChildren}>
      <form action="" onSubmit={handleFormSubmit} className="modal settings">
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
  );
}

export default EditProfile;
