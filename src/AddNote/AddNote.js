import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';
import config from '../config';
import './AddNote.css';

export default class AddNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: null
    }
  }

  static defaultProps = {
    history: {
      push: () => {}
    },
  }
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault();
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folder_id: e.target['note-folder-id'].value,
      modified: new Date(),
    }

    if (newNote.name === "") {
      this.setState({
        errorMessageName: "Name cannot be blank"
      })
    } else if (newNote.content === "") {
      this.setState({
        errorMessageContent: "Content cannot be blank"
      })
    } else {
      this.setState({
        errorMessage: ""
      })
      fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newNote),
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folder_id}`)
      })
      .catch(error => {
        console.error({ error })
        throw new Error(error)
      })
    }
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name' />
            <div className='error-message'>{this.state.errorMessageName}</div> 
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' />
            <div className='error-message'>{this.state.errorMessageContent}</div>
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.folder_name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

AddNote.propTypes = {
  history: PropTypes.object.isRequired
}