import React, { Component } from 'react'
import { sessionService } from './../services/session.service';
import logo from '../assets/imgs/logo3.png';

export class MainHero extends Component {

    state = {
        isStart: false,
    }

    handleScroll = () => {
        window.scrollTo(0, 0)
    }

    render() {
        window.addEventListener('scroll', this.handleScroll)
        const { isStart } = this.state;
        return (
            <section className="MainHero">
                <div className={`img-container flex ${(isStart) ? 'hero-gone' : ''}`} >
                    <div className="main-hero-info flex" >
                        <div className="logo-img"><img src={logo} alt="Marimba logo" /></div>
                        <h1>Welcome to Marimba</h1>
                        <p className="blur-out-contract-bck" >Listening is everything.</p>
                        <button onClick={() => {
                            this.setState({ isStart: true }, () => {
                                window.removeEventListener('scroll', this.handleScroll)
                                sessionService.save('initial', 'notInitial')
                                setTimeout(() => this.props.onInitialEntry(), 500)
                            })
                        }} >Start listening</button>
                    </div>
                </div>
            </section>
        )
    }
}

