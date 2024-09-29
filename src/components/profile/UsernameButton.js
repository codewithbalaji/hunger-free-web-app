import React from "react";
import { PROTECTED } from "lib/routes";
import { Link } from "react-router-dom";

export default function UsernameButton({ user }) {
  return (
    <Link
      className="text-decoration-none"
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`}
      style={{fontWeight:"600", }}
    >
      {user.username}
    </Link>
  );
}
