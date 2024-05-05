import * as React from 'react';
import { Search } from './Search';

export function AddTag({ user, assignTag, createTag }) {
  const [searchActive, setSearchActive] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearchActive(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('focus', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('focus', handleClickOutside, true);
    };
  }, []);

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
    <li
      ref={ref}
      className={`addWrapper ${searchActive ? 'searchActive' : ''}`}
    >
      <button className="addBtn" onClick={() => setSearchActive(!searchActive)}>
        <span>Add</span>
      </button>
      <Search
        assignHandler={assignHandler}
        createHandler={createHandler}
        userTags={user.tags}
        searchActive={searchActive}
      />
    </li>
  );
}
