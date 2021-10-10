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
            const { genre, stations } = this.props;
            if (!stations.length) return
            const stationsByGenre = await stationService.getStationsByGenre(stations, genre)
            this.setState({ stationsByGenre })
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

  



    render() {
        const { stationsByGenre } = this.state
        const { genre } = this.props
        if (!stationsByGenre?.length) return <div></div>
        console.log(genre);
        return (
            <section className="station-list">

                <div className="stations grid">
                    <div className="station-genre flex space-between">
                        <Link to={`/genre/${genre}`}><h1>{(genre === 'Cities') ? 'Top 10 city charts' : genre }</h1></Link>
                        <Link to={`/genre/${genre}`}><p>See all</p></Link>
                    </div>
                    {stationsByGenre.slice(0, 10).map(station => <StationPreview  key={station._id} station={station} />)}
                </div>

            </section>
        )
    }
}


