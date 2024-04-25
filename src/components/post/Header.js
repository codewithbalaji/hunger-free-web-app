import React from 'react';
import Avatar from 'components/profile/Avatar';
import { useUser } from 'hooks/users';
import { formatDistanceToNow } from 'date-fns';
import UsernameButton from 'components/profile/UsernameButton';

export default function Header({ post }) {
  const { uid, date } = post;
  const { user, isLoading } = useUser(uid);

  if (isLoading) return "Loading...";

  return (
    <div className="d-flex align-items-center border-bottom border-2 border-orange p-3 bg-light">
      <Avatar user={user} size="md" />

      <div className="ms-4">
        <UsernameButton user={user} />
        <p className="fs-sm text-secondary">
          {formatDistanceToNow(date)} ago
        </p>
      </div>
    </div>
  );
}
