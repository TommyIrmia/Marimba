import React, { Component } from 'react'

export class AppFilter extends Component {

    state = {
        sortBy: {
            option: 'Custom order'
        },
        isSort: false,
    }

    onToggleSort = () => {
        const { isSort } = this.state;
        this.setState({ isSort: !isSort });
    }

    render() {
        const customOptions = ['Custom order', 'Title', 'Date added', 'Duration']
        const { isSort } = this.state;
        const { option } = this.state.sortBy;
        const { onSearch, isSearch, inputRef } = this.props;
        return (
            <section className="AppFilter">
                <button className="fas fa-search btn-search "
                    onClick={onSearch} ></button>

                <div onClick={() => {
                    this.onToggleSort()
                }} className="sort-container">
                    <div>{option}</div>
                    <div className={(isSort) ? 'fas fa-sort-up' : 'fas fa-sort-down'}></div>
                </div>

                <input className={(isSearch ? "show" : "unshow")}
                    ref={inputRef} type="text" placeholder="Search in playlist" />

                {isSort && <ul className="options-container" >
                    {customOptions.map((customOption, idx) => (
                        <li className="clean-list sort-li" key={idx}>{customOption}</li>
                    ))}
                </ul>}

            </section>
        )
    }
}
