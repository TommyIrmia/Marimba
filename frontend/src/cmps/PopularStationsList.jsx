import React, { Component } from 'react'
import { StationPreview } from './StationPreview';

export class PopularStationsList extends Component {


    state = {
        mostLiked: []

    }
    componentDidMount() {
        this.loadStations();
    }

    loadStations = async () => {
        try {
            const { stations } = this.props;
            const mostLiked = stations.sort((a, b) => b.likedByUsers.length - a.likedByUsers.length).slice(0, 8);
            this.setState({ mostLiked })
        } catch (err) {
            console.error(err);
        }
    }


    render() {
        const { mostLiked } = this.state;
        return (
            <main className="liked-list-container" >
                <div><h1>Most liked</h1></div>
                <section className="PopularStationsList grid " >
                    {mostLiked.map(station => <StationPreview isMostLikedList={true} key={station._id} station={station} />)}
                </section>
            </main>
        )
    }
}
