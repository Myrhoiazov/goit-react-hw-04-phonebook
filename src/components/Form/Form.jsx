import { Component } from 'react';
import s from './Form.module.css';

const shortid = require('shortid');

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChangeUser = ev => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  handleAddUser = e => {
    e.preventDefault();

    this.props.onSubmit({ ...this.state, id: shortid.generate() });
    this.handleCleanUser();
  };

  handleCleanUser = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleAddUser}>
        <label>
          <span className={s.label}>Name</span>
          <input
            className={s.input}
            type="text"
            value={name}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChangeUser}
          />
        </label>
        <label>
          <span className={s.label}>Tel</span>
          <input
            className={s.input}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChangeUser}
          />
        </label>

        <button className={s.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;
