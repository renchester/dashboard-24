import { useState } from 'react';
import { UserDetails } from '../App';
import EditProfile from './EditProfile';

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

  const [showFull, setShowFull] = useState(false);
  const hideChildren = () => setShowFull(false);

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
        <span className="material-symbols-outlined">edit</span>
      </button>

      {showFull && (
        <EditProfile
          userDetails={userDetails}
          hideChildren={hideChildren}
          overrideDetails={overrideDetails}
        />
      )}
    </div>
  );
}

export default ProfileCard;
