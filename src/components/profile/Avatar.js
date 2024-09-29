import React from 'react';
import { Link } from 'react-router-dom';
import { PROTECTED } from 'lib/routes';

export default function Avatar({ user,  overrideAvatar = null , width="100px", height="100px"}) {
  return (
    <Link to={`${PROTECTED}/profile/${user.id}`}>
      <img
        src={overrideAvatar || user.avatar}
        alt={user.username}
        className="rounded-circle"
        style={{ width: width, height: height }}
        
      />
    </Link>
  );
}
