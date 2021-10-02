import React, { Component } from 'react'
import { LibraryList } from './../cmps/LibraryList';
import { stationService } from './../services/station.service';

export class LibraryPage extends Component {

    state = {
        likedStations: [],
        likedTracks: [],
        stationsBy: [],
    }

    componentDidMount() {
        this.loadStations()
    }

    loadStations = async () => {
        try {
            const stations = await stationService.query()
            const likedTracks = await stationService.getById('liked')
            const likedStations = stations.filter(likedStation => likedStation.likedByUsers.length > 0)
            const stationsByUser = stations.filter(stationBy => stationBy.createdBy._id === 'c137')
            this.setState({ likedTracks: likedTracks.tracks, likedStations, stationsBy: stationsByUser })
        } catch (err) {
            throw err
        }
    }

    render() {
        const { likedStations, likedTracks, stationsBy } = this.state;
        return (
            <main className="LibraryPage playlist-layout" >
                <div className="margin-top" >
                    <h2>Library</h2>
                    <p>Enjoy the playlists you created and liked</p>
                </div>

                <LibraryList stationsBy={stationsBy} likedStations={likedStations} likedTracks={likedTracks} />
            </main>
        )
    }
}
