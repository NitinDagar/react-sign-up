import React from 'react';
import Input from '../components/input'
import axios from 'axios'
import { toast } from 'react-toastify';

export default class SignUp extends React.Component {

    allValid = true;

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            success: false
        }

    }

    forminvalid = () => {
        this.allValid = false;
    }


    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        this.allValid = true;
        e.preventDefault();
        this.refs.email.validate();
        this.refs.firstName.validate();
        this.refs.lastName.validate();
        this.refs.password.validate();
        // this.refs.confirmPassword.validate();

        if (this.allValid) {
            this.checkEmailExist()
        }
    }

    checkEmailExist = () => {
        let that = this;
        axios.post(' https://api.raisely.com/v3/check-user', {
            campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
            data: {
                email: this.state.email
            }
        })
            .then(function (response) {
                if (response.data.data.status !== "OK") {
                    toast.error("Invalid Email Please choose different Email");
                } else {
                    that.signup()
                }
            })
            .catch(function (error) {
                toast.error("Server Error");
            });
    }

    signup = () => {
        const that = this;
        axios.post('https://api.raisely.com/v3/signup', {
            campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }
        })
            .then(function (response) {
                toast.success("Success Thanks for Joining");
                that.setState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    success: true
                })
            })
            .catch(function (error) {
                toast.error("Email Already Exists");
            });
    }

    render() {

        return (
            <div className="create_account_screen">

                {!this.state.success && <div className="create_account_form" >
                    <h1>Create account</h1>
                    <p>React Form with Validation</p>
                    <form>
                        <Input
                            ref="firstName"
                            text="First Name"
                            name="firstName"
                            validate="empty"
                            value={this.state.firstName}
                            onChange={this.handleInput}
                            errormessage="First Name can't be empty"
                            forminvalid={this.forminvalid}
                        />

                        <Input
                            ref="lastName"
                            text="Last Name"
                            name="lastName"
                            validate="empty"
                            value={this.state.lastName}
                            onChange={this.handleInput}
                            errormessage="Last Name can't be empty"
                            forminvalid={this.forminvalid}
                        />

                        <Input
                            ref="email"
                            text="Email Address"
                            name="email"
                            validate="email"
                            value={this.state.email}
                            onChange={this.handleInput}
                            errormessage="Email is invalid"
                            forminvalid={this.forminvalid}
                        />

                        <Input
                            ref="password"
                            text="Passsword"
                            name="password"
                            type="password"
                            validate="password"
                            value={this.state.password}
                            onChange={this.handleInput}
                            errormessage="Password is invalid"
                            mincharacters={8}
                            requirecapitals={1}
                            requirenumbers={1}
                            validator="true"
                            forminvalid={this.forminvalid}
                        />

                        {/* <Input
                            ref="confirmPassword"
                            text="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            validate="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleInput}
                            errormessage="Password does not Match"
                            password={this.state.password}
                            forminvalid={this.forminvalid}
                        /> */}

                        <button
                            onClick={this.submit}
                            type="submit"
                            className="button button_wide">
                            CREATE ACCOUNT
                        </button>
                    </form>
                </div>}
                {this.state.success && <div className="create_account_form" ><h1>Thanks For Joining</h1></div>}
            </div>
        );
    }
}
