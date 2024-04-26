import { Link } from "react-router-dom";
import { PROTECTED } from "lib/routes";
import Avatar from "components/profile/Avatar";

export default function User({ user }) {
  const { id, username } = user;

  return (
    <div className="bg-gray-100 shadow-sm rounded-md text-center p-4 space-y-3">
      <Avatar user={user} />
      <div className="font-mono">@{username}</div>
      <Link to={`${PROTECTED}/profile/${id}`}>
        <button className="btn btn-link text-decoration-none text-orange">
          View Profile
        </button>
      </Link>
    </div>
  );
}
