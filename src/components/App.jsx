import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';
import { Form } from 'components/Form/Form';
import { ContactList } from './ContactList/ContactList';
import { MainWrapper } from './MainWrapper.styled';
import { Filter } from './Filter/Filter';
const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const getInitialContacts = () => {
  const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
  if (parsedContacts) {
    return parsedContacts;
  } else {
    return INITIAL_CONTACTS;
  }
};


export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log(contacts);
  }, [contacts]);

  const onHandlerSubmit = (name, number) => {
    const notify = () => toast(`Sorry, ${name} is already in contacts.`);
    if (contacts.find(contact => contact.name === name)) {
      notify();

      return;
    }
    setContacts(prevState => [...prevState, { id: nanoid(), name, number }]);
  };

  const deleteItem = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <MainWrapper>
      <Toaster position="top-right" reverseOrder={false} />
      <h1>Phonebook</h1>
      <Form onSubmit={onHandlerSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList items={getFiltredContacts()} onDeleteItem={deleteItem} />
    </MainWrapper>
  );
};
