import { Fragment, useState, useRef, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { useAllTags } from '../hooks';

// This component came primarily from https://headlessui.com/react/combobox

export function Search({
  assignHandler,
  createHandler,
  userTags,
  searchActive,
  setSearchActive,
}) {
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');
  const { data: listItems } = useAllTags([]);
  const [isFocused, setIsFocused] = useState(false);
  const comboboxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setIsFocused(false);
        setSearchActive(false);
      } else {
        setIsFocused(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('focusin', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('focusin', handleClickOutside);
    };
  }, []);

  const onChange = (value) => {
    if (isFocused) {
      if (value && value.uuid) {
        assignHandler(value);
      } else if (value && value.title) {
        createHandler(query);
      }
    }
    setQuery('');
  };

  const filteredList =
    query === ''
      ? listItems.filter((item) => !userTags.includes(item.uuid))
      : listItems.filter(
          (item) =>
            !userTags.includes(item.uuid) &&
            item.title
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <Transition
      show={searchActive}
      as="div"
      ref={comboboxRef}
      beforeLeave={() => setQuery('')}
    >
      <Combobox as="div" value={selected} onChange={onChange} nullable>
        <div className="queryInputWrap">
          <Combobox.Input
            aria-label="Tag name"
            className="queryInput"
            displayValue={(item) => item.title}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus={true}
          />
        </div>
        <Transition as={Fragment} afterLeave={() => setQuery('')}>
          <Combobox.Options className="queryList">
            {(filteredList?.length === 0 && (
              <p>No un-selected tags match your query.</p>
            )) ||
              null}
            {(filteredList?.length &&
              filteredList?.map((item) => (
                <Combobox.Option
                  key={item.uuid}
                  className={({ active }) =>
                    `queryListItem ${active ? 'active' : ''}`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.title}
                      </span>
                      {selected ? <span className={`selected`}></span> : null}
                    </>
                  )}
                </Combobox.Option>
              ))) ||
              null}
            {query.length > 0 &&
              !listItems.some(
                (item) => item.title.toLowerCase() === query.toLowerCase()
              ) && (
                <Combobox.Option
                  className={({ active }) =>
                    `queryListAddItem ${active ? 'active' : ''}`
                  }
                  value={{ uuid: null, title: query }}
                >
                  <div className="btnIcon" aria-hidden>
                    ✕
                  </div>
                  Create Tag
                </Combobox.Option>
              )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </Transition>
  );
}
