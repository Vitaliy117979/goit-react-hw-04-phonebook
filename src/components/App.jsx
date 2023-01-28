import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';
import { Form } from 'components/Form/Form';
import { ContactList } from './ContactList/ContactList';
import { MainWrapper } from './MainWrapper.styled';
import { Filter } from './Filter/Filter';
export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? ''
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
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
