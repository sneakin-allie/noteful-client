import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';
import config from '../config';
import './Note.css';

export default class Note extends React.Component {
    static defaultProps = {
        onDeleteNote: () => {},
    }
    static contextType = ApiContext;

    handleClickDelete = e => {
        e.preventDefault()
        const note_id = this.props.id

        console.log('noteId:', note_id)

        fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(() => {
            this.context.deleteNote(note_id)  
        })
        .catch(error => {
            console.error({error})
        })
    }

    render() {
        const { name, note_id, modified } = this.props
        console.log('this.props:', this.props)
        
        return (
            <div className="Note">
                <h2 className="Note_title">
                    <Link to={`/note/${note_id}`}>
                        {name}
                    </Link>
                </h2>
                <button 
                    className="Note_delete" 
                    type="button" 
                    onClick={this.handleClickDelete}
                >
                    {' '}
                    Remove
                </button>
                <div className="Note_dates">
                    <div className="Note_dates-modified">
                        Modified on 
                        {modified}
                    </div>
                </div>
            </div>
        )
    }  
}

Note.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired
}