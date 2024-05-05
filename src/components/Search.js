import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { useAllTags } from '../hooks';

export function Search({
  assignHandler,
  createHandler,
  userTags,
  searchActive,
}) {
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');
  const { data: listItems } = useAllTags([]);

  const onChange = (value) => {
    console.log(value);
    if (value.uuid) {
      assignHandler(value);
    } else if (value.title) {
      createHandler(query);
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
      as={Fragment}
      beforeLeave={() => setQuery('')}
    >
      <Combobox value={selected} onChange={onChange} nullable>
        {({ open }) => (
          <div className={`query ${open ? 'open' : 'closed'}`}>
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
                {(filteredList?.length === 0 && <p>No un-selected tags</p>) ||
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
                          {selected ? (
                            <span className={`selected`}></span>
                          ) : null}
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
                      Create Tag
                    </Combobox.Option>
                  )}
              </Combobox.Options>
            </Transition>
          </div>
        )}
      </Combobox>
    </Transition>
  );
}
