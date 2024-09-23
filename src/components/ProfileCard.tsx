import { UserDetails } from '../App';

function ProfileCard({ details }: { details: UserDetails }) {
  return (
    <div className="card card--profile profile">
      <img
        src="/profile.jpeg"
        alt="Profile picture"
        className="profile__image"
      />

      <div className="profile__details">
        <span className="profile__name">
          {details.firstName} {details.lastName}
        </span>
        <span className="profile__title">{details.title}</span>
      </div>

      <ul className="profile__links">
        <li className="profile__link">
          <span id="profile__email">Email:</span>
          <span aria-labelledby="profile__email">{details.email}</span>
        </li>
        <li className="profile__link">
          <span id="profile__username">Username:</span>
          <span aria-labelledby="profile__username">@{details.username}</span>
        </li>
      </ul>

      <p className="profile__bio">{details.bio}</p>
    </div>
  );
}

export default ProfileCard;
