import React, { Component } from 'react'
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export class LoginSignUp extends Component {

    state = {
        user:{
            email: '',
            password: '',
            fullname: '',
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ ...prevState, user: { ...prevState.user, [field]: value } }))
    }

    showUser = (user) => {
        console.log('user',user);
    }

    render() {
        const { onToggleLogin, isSignIn } = this.props;
        const {user} = this.state;
        const {email,password,fullname} = this.state.user;
        return (
            <div className="LoginSignUp">
                <Logo />

                 <h2> { (isSignIn) ? "Sign in to continue." : "Sign up for Marimba account."} </h2>

                <form onSubmit={(ev)=> {
                    ev.preventDefault()
                    this.showUser(user)
                }} className="user-info flex" >
                    <div className="input-container flex">
                        <input name="email" type="email" placeholder="Email or username"
                       value={email} required onChange={this.handleChange} />
                        <div className="far fa-envelope"></div>
                    </div>

                    <div className="input-container flex">
                        <input name="password" type="password" placeholder="Password"
                       value={password} required onChange={this.handleChange} />
                        <div className="far fa-eye-slash"></div>
                    </div>

                   { !isSignIn && <div className="input-container flex">
                        <input name="fullname" type="text" placeholder="fullname"
                        value={fullname} required onChange={this.handleChange} />
                        <div className="far fa-user-circle"></div>
                    </div>}

                    { !isSignIn &&<button>Sign up</button>}
                    { isSignIn && <button>Sign in</button>}
                </form>

                <Link to="/" > Back </Link>
                <div className="toggle-login">{ (isSignIn) ? "Don't have an account?" : "Already on Marimba?"}
                 <button onClick={onToggleLogin} > { (isSignIn)? "SIGNUP" : "LOGIN"} </button> </div>
            </div>
        )
    }
}
