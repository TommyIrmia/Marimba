import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTracks, onAddTrack, onRemoveTrack } from '../store/tracks.actions.js'
import { StationHero } from './../cmps/StationHero';
import { StationActions } from './../cmps/StationActions';
import { TrackSearch } from '../cmps/TrackSearch';
// import { youtubeService } from './../services/youtube.service';
import { TrackList } from './../cmps/TrackList';



export class _StationDetails extends Component {

    state = {
        isSearch: false,
        isPlaying: false,
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.loadTracks();
    }

    loadTracks = () => {
        this.props.loadTracks()
    }

    onSearch = () => {
        this.inputRef.current.focus()
        this.setState({ isSearch: true });
    }

    onCloseSerach = () => {
        this.setState({ isSearch: false });
    }

    onAddTrack = (track) => {
       const newTreck = {...track}
        newTreck.addedAt = Date.now()
        this.props.onAddTrack(newTreck);
    }

    onSetFilter = async (filterBy) => {
       await this.props.loadTracks(filterBy)
    }

    onRemoveTrack = async (trackId) => {
        console.log(trackId);
        try {
            await this.props.onRemoveTrack(trackId)
        } catch (err) {
            throw err
        }
    }


    render() {
        const { isSearch, isPlaying } = this.state;
        const { tracks } = this.props
        if (!tracks) return <div> loading...</div>;
        return (
            <main className="StationDetails">
                <div onClick={this.onCloseSerach} className={(isSearch ? "screen" : "")}></div>
                <StationHero />
                <StationActions onSetFilter={this.onSetFilter} inputRef={this.inputRef} onSearch={this.onSearch} isSearch={isSearch} />
                <TrackList onRemoveTrack={this.onRemoveTrack} isPlaying={isPlaying} tracks={tracks} />

                <TrackSearch onAddTrack={this.onAddTrack} />
            </main>

        )
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.tracksModule.tracks
    }
}
const mapDispatchToProps = {
    loadTracks,
    onAddTrack,
    onRemoveTrack
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)