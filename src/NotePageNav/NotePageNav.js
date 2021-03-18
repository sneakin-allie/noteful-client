import React from 'react';
import PropTypes from 'prop-types';
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext';
import { findNote, findFolder } from '../notes-helpers';
import './NotePageNav.css';
import { Link } from 'react-router-dom';

export default class NotePageNav extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }
    static contextType = ApiContext;

    render() {
        const { notes, folders } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
    
        return (
            <div className="NotePageNav">
                <CircleButton
                    tag={Link}
                    to="/"
                    role="link"
                    onClick={() => this.props.history.goBack()} 
                    className="NotePageNav_back-button"
                >
                    <br />
                    Back
                </CircleButton>
                {folder && (
                    <h3 className="NotePageNav_folder-name">
                        {folder.folder_name}
                    </h3>
                )}
            </div>
        )
    }
}

NotePageNav.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}