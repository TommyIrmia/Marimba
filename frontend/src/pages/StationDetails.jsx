import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTracks, onAddTrack } from '../store/tracks.actions.js'
import { StationHero } from './../cmps/StationHero';
import { StationActions } from './../cmps/StationActions';
import { TrackSearch } from '../cmps/TrackSearch';
// import { youtubeService } from './../services/youtube.service';
import { TrackList } from './../cmps/TrackList';



export class _StationDetails extends Component {

    state = {
        isSearch: false,
        isPlaying: false,
        filter: {
            title: '',
        }
    }

    inputRef = React.createRef()

    async componentDidMount() {
        await this.loadTracks();
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
        this.props.onAddTrack(track);
    }


    render() {
        const { isSearch, isPlaying } = this.state;
        const { tracks } = this.props
        if (!tracks) return <div> loading...</div>;
        return (
            <main className="StationDetails">
                <div onClick={this.onCloseSerach} className={(isSearch ? "screen" : "")}></div>
                <StationHero />
                <StationActions inputRef={this.inputRef} onSearch={this.onSearch} isSearch={isSearch} />
                <TrackList isPlaying={isPlaying} tracks={tracks} />

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
    onAddTrack
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)