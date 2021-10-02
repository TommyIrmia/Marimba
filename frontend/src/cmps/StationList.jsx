import React from 'react'
import { Link } from 'react-router-dom'
import { stationService } from '../services/station.service.js'
import { StationPreview } from './StationPreview.jsx'

export class StationList extends React.Component {

    state = {
        stationsByGenre: []
    }

    componentDidMount() {
        this.loadStationsByGenre();
    }


    loadStationsByGenre = async () => {
        try {
            const { search, genre } = this.props;
            const stations = this.props.stations
            if (!genre) {
                this.setState({ stationsByGenre: stations })
                return
            }
            if (!stations.length) return
            const stationsByGenre = await stationService.getStationsByGenre(stations, genre)
            this.setState({ stationsByGenre: stationsByGenre })
        } catch (err) {
            throw err
        }
    }

    render() {
        const { stationsByGenre, isGenrePage } = this.state
        if (!stationsByGenre?.length) return <div>Loading...</div>
        return (
            <section className="station-list">
                 <div className="station-genre flex space-between">
                    <Link to="/"><h1>{this.props.genre}</h1></Link>
                    <Link to="/"><p>See all</p></Link>
                </div>
                 <div className="stations grid">
                    {stationsByGenre.map(station => <StationPreview key={station._id} station={station} />)}
                </div> 
            </section>
        )
    }
}


