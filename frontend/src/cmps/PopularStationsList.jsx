import React, { Component } from 'react'
import { StationPreview } from './StationPreview';
import { stationService } from './../services/station.service';

export class PopularStationsList extends Component {


    state = {
        mostLiked: []

    }
    componentDidMount() {
        this.loadStations();
    }

    //   loadStations =  () => {
    //     const { stations } = this.props;
    //     let mostSomthing = stations.slice()
    //     mostSomthing.map(station => {
    //         station.tags = []
    //         this.setState({mostSomthing:mostSomthing.slice(0, 6)})
    //     })   
    // }

    loadStations = async () => {
        try {
            const stations = await stationService.query()

            let mostLiked = stations.sort((a, b) => b.likedByUsers.length - a.likedByUsers.length);
            mostLiked = mostLiked.slice(0, 6);

            this.setState({ mostLiked })
        } catch (err) {
            // this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
            console.log(err);
        }
    }


    render() {
        const { mostLiked } = this.state;
        console.log(mostLiked);
        return (
            <main>
                <div><h1>Most liked</h1></div>
                <section className="PopularStationsList grid playlist-layout" >
                    {mostLiked.map(station => <StationPreview isMostLikedList={true} key={station._id} station={station} />)}
                </section>
            </main>
        )
    }
}
