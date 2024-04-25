import React from 'react';
import { Link } from 'react-router-dom';
import { PROTECTED } from 'lib/routes';

export default function Avatar({ user,  overrideAvatar = null }) {
  return (
    <Link to={`${PROTECTED}/profile/${user.id}`}>
      <img
        src={overrideAvatar || user.avatar}
        alt={user.username}
        className="rounded-circle"
        style={{ cursor: 'pointer', opacity: '0.8', width:"50px" }}
      />
    </Link>
  );
}
