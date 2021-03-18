import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton';
import ApiContext from '../ApiContext';
import { countNotesForFolder } from '../notes-helpers';
import './NoteListNav.css';

export default class NoteListNav extends React.Component {
    static contextType = ApiContext;

    render() {
        const { folders=[], notes=[] } = this.context
        
        return (
            <div className="NoteListNav">
                <ul className="NoteListNav_list">
                    {folders.map(folder =>
                        <li key={folder.folder_id}>
                            <NavLink
                                className="NoteListNav_folder-link"
                                to={`/folder/${folder.folder_id}`}
                            >
                                <span className="NoteListNav_num-notes">
                                    {countNotesForFolder(notes, folder.folder_id)}
                                </span>
                                {folder.folder_name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className="NoteListNav_button-wrapper">
                    <CircleButton
                        tag={Link}
                        to="/add-folder"
                        type="button"
                        className="NoteListNav_add-folder-button"
                    >
                        <br />
                        New Folder
                    </CircleButton>
                </div>
            </div>
        )
    }
}