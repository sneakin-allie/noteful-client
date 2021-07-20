import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';
import './Note.css';

export default class Note extends React.Component {
    static defaultProps = {
        deleteNote: () => {},
    }
    static contextType = ApiContext;

    handleClickDelete = e => {
        e.preventDefault()
        const note_id = this.props.note_id
        console.log("note_id:", note_id)

        fetch(`${config.API_BASE_URL}/notes/${note_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok)
                throw new Error(res.status)
            return res
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