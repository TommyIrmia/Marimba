import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { onLogin, onLogout, onSignup, onSetMsg } from '../store/user.actions.js'
import { uploadImg } from '../services/cloudinary.service';

export class _LoginSignUp extends Component {

    state = {
        user: {
            username: '',
            password: '',
            fullname: '',
            imgUrl: '',
        },
        isPasswordVisible: false,
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ ...prevState, user: { ...prevState.user, [field]: value } }))
    }

    onLoginSignup = async (user, isLogin) => {
        try {
            if (isLogin) {
                const loggedinUser = await this.props.onLogin(user)
                if (loggedinUser) {
                    this.props.onSetMsg('success', `Welcome ${loggedinUser.fullname}`)
                    this.props.history.push("/")
                }
                else this.props.onSetMsg('error', 'Wrong username or password, please try again.')
            } else {
                await this.props.onSignup(user)
                this.props.onSetMsg('success', `Signed up successfully!`)
                this.props.history.push("/")
            }
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    handleImgChange = async (ev) => {
        const field = ev.target.name;
        try {
            const value = await uploadImg(ev)
            this.setState((prevState) => ({ ...prevState, user: { ...prevState.user, [field]: value } }))
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { onToggleLogin, isLogin } = this.props;
        const { user,isPasswordVisible } = this.state;
        const { username, password, fullname, imgUrl } = this.state.user;
        return (
            <div className="LoginSignUp">
                {isLogin && <Logo />}

                {!isLogin && <label className="img-input-container flex">
                    {<input hidden type="file" name="imgUrl" id="imgUrl"
                        onChange={this.handleImgChange} />}
                    {imgUrl && <img src={imgUrl} alt="img" />}

                    {!imgUrl && <>
                        <div className="far fa-imag"></div>
                        <small>Choose photo</small>
                    </>}
                </label>}

                <h2> {(isLogin) ? "Sign in to continue." : "Sign up for Marimba account."} </h2>

                <form className="user-info flex" onSubmit={(ev) => {
                    ev.preventDefault()
                    this.onLoginSignup(user, isLogin)
                }}>

                    <div className="input-container flex">
                        <input name="username" type="text" placeholder="username"
                            value={username} required onChange={this.handleChange} />
                        <div className="fas fa-user"></div>
                    </div>

                    <div className="input-container flex">
                        <input name="password" type={(isPasswordVisible) ? 'text' : 'Password' } placeholder="Password"
                            value={password} required onChange={this.handleChange} />
                        <div className="far fa-eye-slash" 
                        onClick={()=> this.setState({isPasswordVisible:!isPasswordVisible}) } ></div>
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