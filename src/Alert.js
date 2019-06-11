import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.message === '') { 
            return null; 
        }

        return (
            <div className={`alert alert-${this.props.status || "info"}`} role="alert">
                {this.props.message}
            </div>
        );
    }

}

export default Alert;
