import * as React from 'react';

export function Tag({ user, tag, removeTag }) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  return (
    <li className={`tag color-${tag.color}`}>
      {tag.title}
      <button
        className={isDeleting ? 'deleting' : null}
        onClick={() => {
          setIsDeleting(true);
          removeTag.mutate({
            userId: user.uuid,
            tagId: tag.uuid,
          });
        }}
        title={`Delete ${tag.title}`}
      >
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>
    </li>
  );
}
