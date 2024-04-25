import Avatar from 'components/profile/Avatar'
import { useUser } from 'hooks/users';
import React from 'react'

const ProfilePage = ({ post }) => {
  const { uid, date } = post;
  const { user, isLoading } = useUser(uid);
  if (isLoading) return "Loading...";
  return (

    <>
    <h1 className='text-center'>User Settings</h1>
    <Avatar user={user} size="md" />
    </>
  )
}

export default ProfilePage