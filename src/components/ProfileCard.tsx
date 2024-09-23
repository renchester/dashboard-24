import { UserDetails } from '../App';

function ProfileCard({ details }: { details: UserDetails }) {
  return (
    <div>
      <div>
        <img src="/profile.jpeg" alt="Profile picture" />
      </div>
      <div>
        <span>
          {details.firstName} {details.lastName}
        </span>
        <span>@{details.username}</span>
      </div>
      <div>
        <p>{details.bio}</p>
      </div>
    </div>
  );
}

export default ProfileCard;
