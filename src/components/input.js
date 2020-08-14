import React from 'react';
import InputError from './inputError'
import Icon from './icons'
import PasswordValidator from './PasswordValidator'
import { classNames, isEmpty, isEmail, countCapitals, containNumbers } from '../commonService'

export default class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            isValidatorValid: {},
            valid: true,
            empty: true
        }
        this.value = ""

    }

    handleFocus = () => {
        this.setState({
            focus: true,
            validatorVisible: true
        })

        if (this.props.validator) {
            this.setState({
                errorVisible: false
            })
        }
    }

    handleBlur = () => {
        this.setState({
            focus: false,
            validatorVisible: false
        })
    }

    handleChange = (e) => {
        this.props.onChange(e)
        this.value = e.target.value
        this.validate(e)

    }

    validate = (e) => {

        if (this.props.validate) {
            switch (this.props.validate) {
                case "empty":
                    if (isEmpty(this.value)) {
                        this.setState({
                            valid: false,
                            errorVisible: true,
                            errormessage: this.props.errormessage
                        })
                        this.props.forminvalid()
                        return
                    } else {
                        this.setState({
                            valid: true,
                            errorVisible: false,
                        })
                    }
                    break;
                case "email":
                    const valid = isEmail(this.value)
                    if (valid) {
                        this.setState({
                            valid: true,
                            errorVisible: false,
                            errormessage: ""
                        })
                    } else {
                        this.setState({
                            valid: false,
                            errorVisible: true,
                            errormessage: this.props.errormessage
                        })
                        this.props.forminvalid()
                    }
                    break;
                case "password":

                    let validData = {
                        minChars: this.value.length >= parseInt(this.props.mincharacters),
                        capitalLetters: countCapitals(this.value) >= this.props.requirecapitals,
                        numbers: containNumbers(this.value)
                    }

                    const allValid = (validData.minChars && validData.capitalLetters && validData.numbers);
                    this.setState({
                        valid: allValid,
                        isValidatorValid: validData,
                        errorVisible: this.state.focus || allValid ? false : true,
                        errormessage: this.props.errormessage
                    })
                    if (!allValid) {
                        this.props.forminvalid()
                    }
                    break;
                case "confirmPassword":

                    this.setState({
                        valid: this.value && this.value === this.props.password,
                        errorVisible: !this.value || !(this.value === this.props.password),
                        errormessage: this.props.errormessage
                    })
                    if (this.value !== this.props.password) {
                        this.props.forminvalid()
                    }

                    break;

                default: break;

            }
        }
    }


    render() {

        var inputGroupClasses = classNames({
            'input_group': true,
            'input_valid': this.state.valid,
            'input_error': !this.state.valid,
            'input_empty': this.state.empty,
            'input_hasValue': this.props.value.length > 0,
            'input_focused': this.state.focus,
            'input_unfocused': !this.state.focus
        });

        return (
            <div className={inputGroupClasses}>
                <label className="input_label" htmlFor={this.props.text}>
                    <span className="label_text">{this.props.text}</span>
                </label>

                <input
                    {...this.props}
                    placeholder={this.props.placeholder}
                    className="input"
                    id={this.props.text}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    autoComplete="off"
                />

                <InputError
                    visible={this.state.errorVisible}
                    errormessage={this.state.errormessage}
                />

                <div className="validationIcons">
                    <i className="input_error_icon"> <Icon type="circle_error" /> </i>
                    <i className="input_valid_icon"> <Icon type="circle_tick" /> </i>
                </div>

                {this.props.validator && <PasswordValidator
                    visible={this.state.validatorVisible}
                    name={this.props.text}
                    value={this.props.value}
                    validData={this.state.isValidatorValid}
                    valid={this.state.allValidatorValid}
                    mincharacters={this.props.mincharacters}
                    requirecapitals={this.props.requirecapitals}
                    requireNumbers={this.props.requireNumbers}
                />}
            </div>
        );
    }
}
