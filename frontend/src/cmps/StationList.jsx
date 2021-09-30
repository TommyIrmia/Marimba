import React from 'react'
import { Link } from 'react-router-dom'
import { stationService } from '../services/station.service.js'
import { StationPreview } from './StationPreview.jsx'

export class StationList extends React.Component {

    state = {
        stations: [],
        isGenrePage: false
    }

    componentDidMount() {
        const { isGenrePage } = this.props;
        this.setState({ ...this.state, isGenrePage: isGenrePage }, this.loadStations)
    }

    loadStations = async () => {
        try {
            const stations = await stationService.query(this.props.genre)
            this.setState({ stations })
        } catch (err) {
            throw err
        }
    }

    render() {
        const { stations, isGenrePage } = this.state
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
                    {stations.map(station => <StationPreview key={station._id} station={station} />)}
                </div>}
                {isGenrePage && <section className="stations-previews-container">
                    <h1>All playlists</h1>
                    <div className="stations-genre grid">
                        {stations.map(station => <StationPreview key={station._id} station={station} />)}
                    </div>
                </section>
                }
            </section>
        )
    }
}


