import React, { Component } from 'react'
import { LibraryList } from './../cmps/LibraryList';
import { stationService } from './../services/station.service';

export class LibraryPage extends Component {

    state = {
        likedStations: [],
        likedTracks: [],
        stationsBy: [],
        recentlyStations: [],
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.loadStations()
    }

    biggestNumberInArray = (arr) => {
        const max = Math.max(...arr);
        return max;
    }

    loadStations = async () => {
        try {
            const stations = await stationService.query()
            const likedTracks = await stationService.getTemplateStation('likedStation', 'liked')
            const likedStations = stations.filter(likedStation => likedStation.likedByUsers.length > 0)
            const stationsByUser = stations.filter(stationBy => stationBy.createdBy._id === 'c137')
            let recentlyaddedStations = stations.sort((a, b) => b.createdAt - a.createdAt);
            recentlyaddedStations = recentlyaddedStations.slice(0, 4);

            this.setState({ recentlyStations: recentlyaddedStations, likedTracks: likedTracks.tracks, likedStations, stationsBy: stationsByUser })
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    render() {
        const { likedStations, likedTracks, stationsBy, recentlyStations } = this.state;
        return (
            <main className="LibraryPage playlist-layout" >
                <div className="margin-top" >
                    <h2>Library</h2>
                    <p>Enjoy the playlists you created and liked</p>
                </div>

                <LibraryList recentlyStations={recentlyStations} stationsBy={stationsBy} likedStations={likedStations} likedTracks={likedTracks} />
            </main>
        )
    }
}
