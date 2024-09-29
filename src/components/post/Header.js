import React, { useEffect } from "react";
import Avatar from "components/profile/Avatar";
import { useUser } from "hooks/users";
import { formatDistanceToNow } from "date-fns";
import UsernameButton from "components/profile/UsernameButton";
import Swal from "sweetalert2";

export default function Header({ post }) {
  const { uid, date } = post;
  const { user, isLoading } = useUser(uid);

  useEffect(() => {
    if (isLoading) {
      Swal.fire({
        title: "Loading...",
        html: "Please wait...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [isLoading]);

  if (isLoading) return null; // Returning null here to avoid rendering anything while loading

  return (
    <div className="d-flex align-items-center border-bottom border-2 border-primary p-2 bg-light">
      <Avatar user={user}  width="40px" height="40px"  />
      <div className="ms-4 mt-1">
        <UsernameButton user={user} />
        <p className="fs-sm text-secondary">{formatDistanceToNow(date)} ago</p>
      </div>
    </div>
  );
}
