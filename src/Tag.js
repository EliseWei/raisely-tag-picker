import * as React from 'react';

export function Tag({ user, tag, deleteTag }) {
  return (
    <li className={`tag color-${tag.color}`}>
      {tag.title}
      <button
        onClick={() => {
          deleteTag.mutate({ userId: user.uuid, tagId: tag.uuid });
        }}
        title="Delete"
      />
    </li>
  );
}
