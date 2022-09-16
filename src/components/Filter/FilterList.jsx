import { Component } from 'react';
import s from '../Filter/Filter.module.css';
import PropTypes from 'prop-types';

class FilterList extends Component {


  render() {
    const { filter, contacts, onFindContacts } = this.props;

    if (contacts.length === 0) {
      return;
    }

    return (
      <div>
        <label>
          <span className={s.label}>Find contacts by name</span>
          <input
            className={s.input}
            type="text"
            value={filter}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            // required
            onChange={onFindContacts}
          />
        </label>
      </div>
    );
  }
}

FilterList.propTypes={
  filter: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
  onFindContacts: PropTypes.func.isRequired,
}

export default FilterList;
