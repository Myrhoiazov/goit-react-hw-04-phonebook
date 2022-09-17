import { useState, useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './Form/Form.jsx';
import Container from './Container/Container.jsx';
import ContactList from './Contacts/ContactList.jsx';
import FilterList from './Filter/FilterList.jsx';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem(CONTACTS_KEY));

    if (list.length) {
      setContacts(list);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handlerSubmitUser = data => {
    const hasUserContacts = contacts.some(
      user => user.userName === data.userName
    );

    if (hasUserContacts) {
      toast.error(`${data.userName} is already in contacts`);
      return;
    }

    setContacts(state => [...state, data]);
  };

  const handleDeleteUser = id => {
    setContacts(state => state.filter(user => user.id !== id));
  };

  const handleFilterValue = ev => {
    setFilter(ev.target.value);
  };

  const handleFilter = useMemo(() => {
    return contacts.filter(user =>
      user.userName.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, contacts]);

  return (
    <Container>
      <Form onSubmit={handlerSubmitUser} />
      <FilterList
        filter={filter}
        contacts={contacts}
        onFindContacts={handleFilterValue}
      />
      <ContactList contacts={handleFilter} onDelete={handleDeleteUser} />
      <ToastContainer />
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const list = localStorage.getItem('contacts');

//     if (list) {
//       this.setState({ contacts: JSON.parse(list) });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts.length !== prevState.contacts.length) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   handlerSubmitUser = data => {
//     const { contacts } = this.state;
//     const hasUserContacts = contacts.some(user => user.name === data.name);

//     if(hasUserContacts){
//       alert(`${data.name} is already in contacts`)
//       return
//     }

//     this.setState(prevState => ({ contacts: [...prevState.contacts, data] }));
//   };

//   handleDeleteUser = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(user => id !== user.id),
//     }));
//   };

//   handleFilterValue = ev => {
//     this.setState({ filter: ev.target.value });
//   };

//   handleFilter = () => {
//     const filterNormalize = this.state.filter.toLowerCase();

//     return this.state.contacts.filter(user =>
//       user.name.toLowerCase().includes(filterNormalize)
//     );
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const visibleList = this.handleFilter();

//     return (
//       <Container>
//         <Form onSubmit={this.handlerSubmitUser} />
//         <FilterList
//           filter={filter}
//           contacts={contacts}
//           onFindContacts={this.handleFilterValue}
//         />
//         <ContactList contacts={visibleList} onDelete={this.handleDeleteUser} />
//       </Container>
//     );
//   }
// }
