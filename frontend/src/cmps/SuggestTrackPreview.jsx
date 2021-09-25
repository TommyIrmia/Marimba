import React from "react";
export class SuggestTrackPreview extends React.Component{
    state={};
    onClick(track){
        this.props.onAddTrack(track);
        this.props.removeAddedTrack(track);
    }
    render(){
        const track=this.props.track;
        return (
            <section className="suggest-track-container flex">
                <section className="SuggestTrackPreview flex">
                    <div>
                        <img src={track.imgUrl} alt='trackImg' />
                    </div>
                    <div>
                        {track.title}
                    </div>
                </section>
                <section className="previewAlbum">
                    <p>Album</p>
                </section>
    
                <button onClick={()=>this.onClick(track)}>Add</button>
            </section>
        )
    }
}