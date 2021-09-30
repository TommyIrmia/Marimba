import React, { Component } from 'react'
import { StationList } from '../cmps/StationList.jsx'
import { stationService } from '../services/station.service.js'

export class GenrePage extends Component {

    state = {
        genre: ''
    }

    componentDidMount() {
        const  genre  = this.props.match.params.id
        console.log('genre from params:', genre);
        this.setState({ genre: genre })
    }


    render() {
        const { genre } = this.state
        return (
            <section className="genre-page">
                 <StationList genre={genre} key={genre} isGenrePage={true} />
            </section>
        )
    }
}