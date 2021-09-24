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
            // {
            //     id: 'kTJczUoc26U',
            //     title: 'The Kid LAROI, Justin Bieber - STAY (Official Video)',
            //     // url: "youtube/song.mp4",
            //     imgUrl: 'https://i.ytimg.com/vi/kTJczUoc26U/default.jpg',
            // },
            // {
            //     id: 'tQ0yjYUFKAE',
            //     title: 'Justin Bieber - Peaches ft. Daniel Caesar, Giveon',
            //     // url: "youtube/song.mp4",
            //     imgUrl: 'https://i.ytimg.com/vi/tQ0yjYUFKAE/default.jpg',
            // },
            // {
            //     id: 'kffacxfA7G4',
            //     title: 'Justin Bieber - Baby (Official Music Video) ft. Ludacris',
            //     // url: "youtube/song.mp4",
            //     imgUrl: 'https://i.ytimg.com/vi/kffacxfA7G4/default.jpg',
            // }
        ],
    }

    inputRef = React.createRef()

    async componentDidMount() {
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
                <TrackSearch />
            </main>

        )
    }
}
