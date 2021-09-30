import React, { Component } from 'react'

export class SearchPageFilter extends Component {

    state = {
        filterBy:{
            title: '',
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({...prevState,filterBy: { ...prevState.filterBy, [field]: value } }))
    }

    render() {
        const { title } = this.state.filterBy
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
