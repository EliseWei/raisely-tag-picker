import * as React from 'react';
import { Search } from './Search';

export function AddTag({ user, assignTag, createTag }) {
  const [searchActive, setSearchActive] = React.useState(false);

  const assignHandler = (tag) => {
    return assignTag.mutate({
      userId: user.uuid,
      tagId: tag.uuid,
    });
  };

  const createHandler = (tagName) => {
    return createTag.mutate(tagName, {
      onSuccess: (newTagObj) => {
        return assignHandler(newTagObj);
      },
    });
  };

  return (
    <li className={`addWrapper ${searchActive ? 'searchActive' : ''}`}>
      <button className="addBtn" onClick={() => setSearchActive(!searchActive)}>
        <div className="btnIcon" aria-hidden>
          ✕
        </div>
        <span>Add</span>
      </button>
      <Search
        assignHandler={assignHandler}
        createHandler={createHandler}
        userTags={user.tags}
        searchActive={searchActive}
        setSearchActive={setSearchActive}
      />
    </li>
  );
}
