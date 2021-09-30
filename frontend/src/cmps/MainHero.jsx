import React, { Component } from 'react'
import { utilService } from './../services/util.service';

export class MainHero extends Component {

    state = {
        isStart: false,
    }

 scrollFunction = () => {
    if ( document.documentElement.scrollTop > 600) {
        this.setState({ isStart: true });
    }
}

render() {
    window.onscroll = this.scrollFunction


    const { isStart } = this.state;
    return (
        <section className="MainHero">
            <div className={`img-container flex ${(isStart) ? 'hero-gone' : ''}`} >
                <div className="main-hero-info flex" >
                    <h1>Welcome to Marimba</h1>
                    <p>Some shit about Marimba.</p>
                    <button onClick={() => {
                        this.setState({ isStart: true })
                    }} >start here fucker</button>
                </div>
            </div>
        </section>
    )
}
}

