import React, { Component } from 'react'
import { connect } from 'react-redux'

import { LibraryList } from './../cmps/LibraryList';
import { stationService } from './../services/station.service';

class _LibraryPage extends Component {

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


    loadStations = async () => {
        const {user} = this.props; 
        try {
            const stations = await stationService.query()
            const likedTracks = await stationService.getTemplateStation('likedStation', 'liked')
            const likedStations = stations.filter(likedStation => likedStation.likedByUsers.length > 0)
            const stationsByUser = stations.filter(stationBy => stationBy.createdBy._id === user._id)
            let recentlyaddedStations = stations.sort((a, b) => b.createdAt.localeCompare(a.createdAt) );
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

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}


export const LibraryPage = connect(mapStateToProps)(_LibraryPage)
