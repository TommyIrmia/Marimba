import React, { Component } from 'react'
import { connect } from 'react-redux'

import { LibraryList } from './../cmps/LibraryList';
import { stationService } from './../services/station.service';

class _LibraryPage extends Component {

    state = {
        likedByUser: [],
        likedTracks: [],
        stationsBy: [],
        recentlyStations: [],
        mostLiked: [],
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.loadStations()
    }


    loadStations = async () => {
        const likedByUser = []
        const { user } = this.props;
        try {
            const stations = await stationService.query()
            const likedTracks = await stationService.getTemplateStation('likedStation', 'liked')
            const stationsByUser = stations.filter(stationBy => stationBy.createdBy._id === user._id)

             user.likedStations?.map( async stationId => {
                likedByUser.push( await stationService.getById(stationId))  
                this.setState({likedByUser})
            })

            let recentlyaddedStations = stations.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
            recentlyaddedStations = recentlyaddedStations.slice(0, 4);

            let mostLiked = stations.sort((a, b) => b.likedByUsers.length - a.likedByUsers.length);
            mostLiked = mostLiked.slice(0, 4);

            this.setState({ mostLiked, recentlyStations: recentlyaddedStations, likedTracks: likedTracks.tracks, stationsBy: stationsByUser })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { likedByUser, likedTracks, stationsBy, recentlyStations, mostLiked } = this.state;
        const { user } = this.props;
        return (
            <main className="LibraryPage playlist-layout" >
                <div className="margin-top" >
                    <h2>Library</h2>
                    {user.fullname !== 'Guest' && <p>Enjoy the playlists you created and liked</p>}
                </div>

                <LibraryList mostLiked={mostLiked} user={user} recentlyStations={recentlyStations} stationsBy={stationsBy} likedByUser={likedByUser} likedTracks={likedTracks} />
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
