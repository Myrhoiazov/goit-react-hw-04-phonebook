import { Component } from 'react';
import Form from './Form/Form.jsx';
import Container from './Container/Container.jsx';
import ContactList from './Contacts/ContactList.jsx';
import FilterList from './Filter/FilterList.jsx';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const list = localStorage.getItem('contacts');

    if (list) {
      this.setState({ contacts: JSON.parse(list) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handlerSubmitUser = data => {
    const { contacts } = this.state;
    const hasUserContacts = contacts.some(user => user.name === data.name);

    if(hasUserContacts){
      alert(`${data.name} is already in contacts`)
      return
    }

    this.setState(prevState => ({ contacts: [...prevState.contacts, data] }));
  };

  handleDeleteUser = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(user => id !== user.id),
    }));
  };

  handleFilterValue = ev => {
    this.setState({ filter: ev.target.value });
  };

  handleFilter = () => {
    const filterNormalize = this.state.filter.toLowerCase();

    return this.state.contacts.filter(user =>
      user.name.toLowerCase().includes(filterNormalize)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleList = this.handleFilter();

    return (
      <Container>
        <Form onSubmit={this.handlerSubmitUser} />
        <FilterList
          filter={filter}
          contacts={contacts}
          onFindContacts={this.handleFilterValue}
        />
        <ContactList contacts={visibleList} onDelete={this.handleDeleteUser} />
      </Container>
    );
  }
}
