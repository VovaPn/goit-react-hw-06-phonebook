import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilterContacts } from 'redux/selectors';
import { deleteContact } from 'redux/contacts/contactsSlice';

export default function ContactList() {
  const contacts = useSelector(getContacts);
  const filterContacts = useSelector(getFilterContacts);
  const dispatch = useDispatch();

  const findContact = () => {
    return contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filterContacts.trim().toLowerCase());
    });
  };
  const foundContacts = findContact();

  return (
    <ul className={s.contactList}>
      {foundContacts.map(({ id, name, number }) => {
        return (
          <li className={s.contact} key={id}>
            <p className={s.contactInfo}>
              {name}: {number}
            </p>
            <button type="button" onClick={() => dispatch(deleteContact(id))}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.protoTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
