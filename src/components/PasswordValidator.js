import React from 'react';
import Icon from './icons'
import { classNames } from '../commonService';

export default class PasswordValidator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        let validatorTitle = ""

        let validatorClass = classNames({
            'password_validator': true,
            'visible': this.props.visible,
            'invisible': !this.props.visible
        });


        if (this.props.valid) {
            validatorTitle =
                <h4 className="validator_title valid">
                    {this.props.name} IS OK
        </h4>
        } else {
            validatorTitle =
                <h4 className="validator_title invalid">
                    {this.props.name} RULES
        </h4>
        }

        return (
            <div className={validatorClass}>
                <div className="validator_container">

                    {validatorTitle}

                    <ul className="rules_list">

                        <li className={classNames({ 'valid': this.props.validData.minChars })}>
                            <i className="icon_valid"> <Icon type="circle_tick_filled" /> </i>
                            <i className="icon_invalid"> <Icon type="circle_error" /> </i>
                            <span className="error_message">{this.props.mincharacters} characters minimum</span>
                        </li>

                        <li className={classNames({ 'valid': this.props.validData.capitalLetters })}>
                            <i className="icon_valid"> <Icon type="circle_tick_filled" /> </i>
                            <i className="icon_invalid"> <Icon type="circle_error" /> </i>
                            <span className="error_message">Contains at least {this.props.requirecapitals} capital letter</span>
                        </li>

                        <li className={classNames({ 'valid': this.props.validData.numbers })}>
                            <i className="icon_valid"> <Icon type="circle_tick_filled" /> </i>
                            <i className="icon_invalid"> <Icon type="circle_error" /> </i>
                            <span className="error_message">Contains at least {this.props.requirenumbers} number</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
