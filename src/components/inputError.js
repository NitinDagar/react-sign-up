import React from 'react';
import { classNames } from '../commonService'

export default class InputError extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {

        var errorClass = classNames({
            'error_container': true,
            'visible': this.props.visible,
            'invisible': !this.props.visible
        });

        return (
            <div className={errorClass}>
                <span>{this.props.errormessage}</span>
            </div>
        );
    }
}
