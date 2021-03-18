import React from 'react';
import PropTypes from 'prop-types';

export default class FormError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Something went wrong. Try again later.</h2>
            );
        }
        return this.props.children;
    }
}

FormError.propTypes = {
    children: PropTypes.object.isRequired,
}