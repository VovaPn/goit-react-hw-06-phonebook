import React from 'react';
import PropTypes from 'prop-types';
import s from './Contacts.module.css';
import InputField from 'components/InputField/InputField';
import Notification from 'components/Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter, setFilterValue } from '../../redux/phonebook.slice';

function Contacts({ contacts, onClickDelete }) {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleInputChange = e => {
    dispatch(setFilterValue(e.target.value));
  };

  const filteredContacts = contacts.filter(it => it.name.includes(filter));

  return (
    <div className={s.container}>
      <InputField
        label="Find contacts by name"
        value={filter}
        onChange={handleInputChange}
        type="text"
        name="filter"
      />

      {!filteredContacts.length ? (
        <Notification message="Contact list is empty." />
      ) : (
        <ul className={s.list}>
          {filteredContacts.map(({ id, name, number }) => (
            <li key={id} className={s.item}>
              <span className={s.name}>{name}</span>
              <span>{number}</span>
              <button type="button" onClick={() => onClickDelete(id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default Contacts;
