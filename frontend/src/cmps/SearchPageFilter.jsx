import React, { Component } from 'react'

export class SearchPageFilter extends Component {

    state = {
        title: ''
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({title: value})
        console.log('title on filter',this.state.title);
    }

    render() {
        const { title } = this.state
        return (
            <form className="SeacrchPageFilter " >
               <div className="input-container" >
                   <button className="fas fa-search search-btn" ></button>
                <input type="search" name="title" value={title}
                placeholder="Playlists or songs" autoComplete="off" onChange={(ev)=>{
                    ev.preventDefault();
                    this.handleChange(ev)
                }} autoFocus={true}/>
               </div>
            </form>
        )
    }
}
