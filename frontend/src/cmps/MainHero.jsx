import React, { Component } from 'react'
import { sessionService } from './../services/session.service';
import logo from '../assets/imgs/logo3.png';

export class MainHero extends Component {

    state = {
        isStart: false,
    }

    

    render() {
        const { isStart } = this.state;
        const {noScroll} = this.props;
        return (
            <section className="MainHero">
                <div className={`img-container flex ${(isStart) ? 'hero-gone' : ''}`} >
                    <div className="main-hero-info flex" >
                        <div className="logo-img"><img src={logo} alt="Marimba logo" /></div>
                        <h1>Welcome to <span>Marimba</span></h1>
                        <p>Listening is everything.</p>
                        <button onClick={() => {
                            this.setState({ isStart: true }, () => {
                                sessionService.save('initial', 'false')
                                window.removeEventListener('scroll', noScroll);
                            })
                        }} >Start listening</button>
                    </div>
                </div>
            </section>
        )
    }
}

