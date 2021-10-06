import React, { Component } from 'react'
import { LoginSignUp } from './../cmps/LoginSignUp';

export class LoginPage extends Component {

    state = {
        isLogin: true,
    }

    onToggleLogin = () => {
        const { isLogin } = this.state;
        this.setState({ isLogin:!isLogin})
    }

    render() {
        const { isLogin } = this.state;
        return (
            <section className="LoginPage">
                {  <LoginSignUp isLogin={isLogin} onToggleLogin={this.onToggleLogin} />}
            </section>
        )
    }
}
