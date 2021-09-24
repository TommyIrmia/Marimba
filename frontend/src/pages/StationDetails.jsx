import React, { Component } from 'react'
import { StationHero } from './../cmps/StationHero';
import { StationActions } from './../cmps/StationActions';

export class StationDetails extends Component {

    state={
         isSearch: false,
    }

    inputRef = React.createRef()

    onSearch = () => {
        this.inputRef.current.focus()
        this.setState({ isSearch: true });
    }

    onCloseSerach = () => {
        this.setState({ isSearch: false });
    }

   


    render() {
        const {isSearch} = this.state;
        return (
            <section className="StationDetails">
                <div onClick={this.onCloseSerach} className={(isSearch ? "screen" : "")}></div>
                <StationHero />
                <StationActions inputRef={this.inputRef} onSearch={this.onSearch} isSearch={isSearch} />
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
            </section>
        )
    }
}
