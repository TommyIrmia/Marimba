import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { stationService } from '../services/station.service.js'
import { StationPreview } from './StationPreview.jsx'

class _StationList extends React.Component {

    state = {
        stations: []
    }

    componentDidMount() {
        this.loadStations()
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
        const { stations } = this.state
        return (
            <section className="station-list">
                <div className="station-genre flex space-between">
                    <Link to="/"><h1>{this.props.genre}</h1></Link>
                    <Link to="/"><p>See all</p></Link>
                </div>

                <div className="stations grid">
                    {stations.map(station => <StationPreview key={station._id} station={station} />)}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}
const mapDispatchToProps = {
}


export const StationList = connect(mapStateToProps, mapDispatchToProps)(_StationList)