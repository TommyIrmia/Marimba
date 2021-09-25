import React, { Component } from 'react'
import { StationHero } from './../cmps/StationHero';
import { StationActions } from './../cmps/StationActions';
import { TrackSearch } from '../cmps/TrackSearch';
// import { youtubeService } from './../services/youtube.service';
import { TrackList } from './../cmps/TrackList';
import { trackService } from './../services/track.service';
export class StationDetails extends Component {

    state = {
        isSearch: false,
        isPlaying: false,
        tracks: [
          
        ],
        filter:{
            title: '',
        }
    }

    inputRef = React.createRef()

    async componentDidMount() {
        await this.loadTracks();
    }

    async loadTracks (){
        console.log('loading tracks');
        const tracks = await trackService.query();
        this.setState({ tracks });
    }

    onSearch = () => {
        this.inputRef.current.focus()
        this.setState({ isSearch: true });
    }

    onCloseSerach = () => {
        this.setState({ isSearch: false });
    }

    onAddTrack = async (track) => {
        await trackService.add(track);
        this.loadTracks();
    }




    render() {
        const { isSearch, tracks, isPlaying } = this.state;
        // if (!tracks) return <div> loading...</div>;
        return (
            <main className="StationDetails">
                <div onClick={this.onCloseSerach} className={(isSearch ? "screen" : "")}></div>
                <StationHero />
                <StationActions inputRef={this.inputRef} onSearch={this.onSearch} isSearch={isSearch} />
                <TrackList isPlaying={isPlaying} tracks={tracks} />

                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <h3>s</h3>
                <TrackSearch onAddTrack={this.onAddTrack} />
            </main>

        )
    }
}
