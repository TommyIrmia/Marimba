import React, { Component } from 'react'
import { sessionService } from './../services/session.service';

export class MainHero extends Component {

    state = {
        isStart: false,
    }

 scrollFunction = () => {
    if ( document.documentElement.scrollTop > 400) {
        this.setState({ isStart: true },()=>{
            sessionService.save('initial',false)
        });
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
                    <p>Listening is everything.</p>
                    <button onClick={() => {
                        this.setState({ isStart: true },() => {
                            sessionService.save('initial',false)
                        })
                    }} >Start listening</button>
                </div>
            </div>
        </section>
    )
}
}

