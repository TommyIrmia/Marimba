import React, { Component } from 'react'
import { LoginSignUp } from './../cmps/LoginSignUp';

export class LoginPage extends Component {

    state = {
        isSignIn: true,
    }

    onToggleLogin = () => {
        const { isSignIn } = this.state;
        this.setState({ isSignIn:!isSignIn})
    }

    render() {
        const { isSignIn } = this.state;
        return (
            <section className="LoginPage">
                {  <LoginSignUp isSignIn={isSignIn} onToggleLogin={this.onToggleLogin} />}
            </section>
        )
    }
}
