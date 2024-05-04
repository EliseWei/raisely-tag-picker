import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTags, assignUserTag, createTag } from './api';
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
        <span>Add</span>
      </button>
      <Search
        assignHandler={assignHandler}
        createHandler={createHandler}
        userTags={user.tags}
        setSearchActive={setSearchActive}
      />
    </li>
  );
}
