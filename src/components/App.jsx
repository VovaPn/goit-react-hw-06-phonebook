import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import Contacts from './Contacts/Contacts';
import { addContact, removeContactById } from '../redux/phonebook.slice';

// const LOCAL_KEY = 'phonebookContacts';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.phonebook.contacts.items);
  // const filter = useSelector(state => state.contacts.filter)
  //   const [contacts, setContacts] = useState([]);
  //   const didRender = useRef(false);
  // useEffect(() => {
  //   let localContacts = localStorage.getItem(LOCAL_KEY);
  //   localContacts = localContacts ? JSON.parse(localContacts) : [];
  //   setContacts([...localContacts]);
  // }, []);

  // useEffect(() => {
  //   if (!didRender.current) {
  //     didRender.current = true;
  //     return;
  //   }
  //   // window.localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  const onGetDataForm = data => {
    const hasName = contacts.some(it => it.name === data.name);
    if (hasName) {
      Notify.warning(`Contact "${data.name}" is already exist.`);
      return;
    }

    dispatch(addContact({ ...data, id: nanoid() }));
  };

  const deleteItem = deletedId => {
    console.log(deletedId);
    dispatch(removeContactById(deletedId));
  };

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onSubmit={onGetDataForm} />
      </Section>
      <Section title="Contacts">
        <Contacts contacts={contacts} onClickDelete={deleteItem} />
      </Section>
    </div>
  );
}
