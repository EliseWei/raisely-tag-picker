import * as React from 'react';
import { UserTags } from './UserTags';
import { useUser } from './hooks';

export function UserProfile({ uuid }) {
  const { data: user } = useUser(uuid);

  if (!user) return null;

  return (
    <>
      <h2>{user.fullName}</h2>
      <UserTags user={user} />
    </>
  );
}
