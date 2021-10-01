import React, { Component } from 'react'
import { LibraryList } from './../cmps/LibraryList';
import { stationService } from './../services/station.service';

export class LibraryPage extends Component {

    state = {
        likedStations: [],
        likedTracks: [],
    }

    componentDidMount() {
        this.loadStations()
    }

    loadStations = async () => {
        const stations = await stationService.query()

        const likedTracks = await stationService.getById('liked')

        const likedStations = stations.filter(likedStation => {
            return likedStation.likedByUsers.length > 0;
        })

        this.setState({ likedTracks: likedTracks.tracks })
        this.setState({ likedStations })
    }


    render() {
        const { likedStations, likedTracks } = this.state;
        return (
            <main className="LibraryPage playlist-layout" >
                <LibraryList likedStations={likedStations} likedTracks={likedTracks} />
            </main>
        )
    }
}
