import React from 'react'
import { Link } from 'react-router-dom'
import { stationService } from '../services/station.service.js'
import { StationPreview } from './StationPreview.jsx'

export class StationList extends React.Component {

    state = {
        isGenrePage: false,
        stationsByGenre: []
    }

    componentDidMount() {
        const { isGenrePage } = this.props;
        this.setState({ ...this.state, isGenrePage: isGenrePage }, this.loadStationsByGenre) 
    }


    loadStationsByGenre = async () => {
        try {
            if (!this.props.stations?.length) return
            const stations = await stationService.getStationsByGenre(this.props.stations, this.props.genre)
            this.setState({ stationsByGenre: stations })
        } catch (err) {
            throw err
        }
    }

    render() {
        const { stationsByGenre, isGenrePage } = this.state
        if (!stationsByGenre?.length) return <div>Loading...</div>
        return (
            <section className="station-list">
                {!isGenrePage && <div className="station-genre flex space-between">
                    <Link to="/"><h1>{this.props.genre}</h1></Link>
                    <Link to="/"><p>See all</p></Link>
                </div>}
                {isGenrePage && <section className="genre-titles">
                    <h1 className="genre-title">{this.props.genre}</h1>
                </section>}
                {!isGenrePage && <div className="stations grid">
                    {stationsByGenre.map(station => <StationPreview key={station._id} station={station} />)}
                </div>}
                {isGenrePage && <section className="stations-previews-container">
                    <h1>All playlists</h1>
                    <div className="stations-genre grid">
                        {stationsByGenre.map(station => <StationPreview key={station._id} station={station} />)}
                    </div>
                </section>
                }
            </section>
        )
    }
}


