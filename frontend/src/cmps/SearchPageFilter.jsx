import React, { Component } from 'react'

export class SearchPageFilter extends Component {

    state = {
        title: ''
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        this.setState({ title: value }, this.props.onSetFilter(value))
    }

    render() {
        const { title } = this.state
        return (
            <form className="SeacrchPageFilter" onSubmit={(ev) => {
                ev.preventDefault();
            }}>
                <div className="input-container" >
                    <button className="fas fa-search search-btn"></button>
                    <input type="search"
                        name="title"
                        value={title}
                        placeholder="Playlists or songs"
                        autoComplete="off"
                        onChange={this.handleChange}
                        autoFocus={true} />
                </div>
            </form>
        )
    }
}
