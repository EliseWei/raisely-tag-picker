import * as React from 'react';
import { Tag } from './Tag';
import { AddTag } from './AddTag';
import { useUserTags, useAllTags } from './hooks';

export function UserTags({ user }) {
  const allTags = useAllTags();
  const userTags = useUserTags(user.uuid);

  const userTagObjects = userTags?.data?.map((tagId) =>
    allTags?.data?.find((tag) => tag.uuid === tagId)
  );

  if (!userTagObjects) return null;

  return (
    <>
      <h2>Tags</h2>
      <ul className="userTags">
        {userTagObjects.map((tag) => (
          <Tag
            key={tag.uuid}
            user={user}
            tag={tag}
            removeTag={userTags.remove}
          />
        ))}
        <AddTag
          user={user}
          assignTag={userTags.assign}
          createTag={allTags.create}
        />
      </ul>
    </>
  );
}
