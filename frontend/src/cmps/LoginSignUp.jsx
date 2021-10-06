import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { onLogin, onLogout, onSignup, onSetMsg } from '../store/user.actions.js'

export class _LoginSignUp extends Component {

    state = {
        user: {
            username: '',
            password: '',
            fullname: '',
            imgUrl: '',
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ ...prevState, user: { ...prevState.user, [field]: value } }))
    }

    onLoginSignup = async (user, isLogin) => {
        if (isLogin) {
            const loggedinUser = await this.props.onLogin(user)
            console.log('loggedinUser', loggedinUser);
            if (loggedinUser) {
                this.props.onSetMsg('success', `Welcome ${loggedinUser.fullname}`)
                this.props.history.push("/")
            }
            else this.props.onSetMsg('error', 'Wrong username or password, please try again.')
        } else {
            this.props.onSignup(user)
            this.props.onSetMsg('success', `Signed up successfully!`)
            this.props.history.push("/")
        }
    }

    render() {
        const { onToggleLogin, isLogin } = this.props;
        const { user } = this.state;
        const { username, password, fullname } = this.state.user;
        return (
            <div className="LoginSignUp">
                <Logo />

                <h2> {(isLogin) ? "Sign in to continue." : "Sign up for Marimba account."} </h2>

                <form className="user-info flex" onSubmit={(ev) => {
                    console.log('ev', ev);
                    ev.preventDefault()
                    this.onLoginSignup(user, isLogin)
                }}>

                    <div className="input-container flex">
                        <input name="username" type="text" placeholder="Email or username"
                            value={username} required onChange={this.handleChange} />
                        <div className="fas fa-user"></div>
                    </div>

                    <div className="input-container flex">
                        <input name="password" type="password" placeholder="Password"
                            value={password} required onChange={this.handleChange} />
                        <div className="far fa-eye-slash"></div>
                    </div>

                    {!isLogin && <div className="input-container flex">
                        <input name="fullname" type="text" placeholder="fullname"
                            value={fullname} required onChange={this.handleChange} />
                        <div className="far fa-user-circle"></div>
                    </div>}

                    {!isLogin && <button>Sign up</button>}
                    {isLogin && <button>Log in</button>}
                </form>

                <Link to="/" > Back </Link>
                <div className="toggle-login">{(isLogin) ? "Don't have an account?" : "Already on Marimba?"}
                    <button onClick={onToggleLogin} > {(isLogin) ? "SIGNUP" : "LOGIN"} </button> </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout,
    onSetMsg
}


export const LoginSignUp = connect(mapStateToProps, mapDispatchToProps)(withRouter(_LoginSignUp))