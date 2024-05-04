import * as React from 'react';

export function Tag({ user, tag, removeTag }) {
  return (
    <li className={`tag color-${tag.color}`}>
      {tag.title}
      <button
        onClick={() => {
          removeTag.mutate({ userId: user.uuid, tagId: tag.uuid });
        }}
        title="Delete"
      />
    </li>
  );
}
