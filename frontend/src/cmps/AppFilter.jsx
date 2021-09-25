import React, { Component } from 'react'

export class AppFilter extends Component {

    state = {
        filterBy:{
            title:'',
            sort:'Custom order'
        },
       
        isSort: false,
    }

    onToggleSort = () => {
        const { isSort } = this.state;
        this.setState({ isSort: !isSort });
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({...prevState,filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }
   
    onSetSort = (sort) => {
        this.setState((prevState) => ({...prevState,filterBy: { ...prevState.filterBy, sort } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
        this.setState({isSort:false})
    }

    render() {
        const customOptions = ['Custom order', 'Title', 'Date added', 'Duration']
        const { isSort,filterBy } = this.state;
        const { onSearch, isSearch, inputRef } = this.props;

        return (
            <form className="AppFilter">
                <button className="fas fa-search btn-search "
                    onClick={(ev)=>{
                        ev.preventDefault();
                        onSearch()
                    }} ></button>

                <div onClick={(ev) => {
                    ev.preventDefault();
                    this.onToggleSort()
                }} className="sort-container">
                    <div>{filterBy.sort}</div>
                    <div className={(isSort) ? 'fas fa-sort-up' : 'fas fa-sort-down'}></div>
                </div>


                <input className={(isSearch ? "show" : "unshow")}
                   onChange={(ev)=>{
                       ev.preventDefault();
                       this.handleChange(ev)
                   }}name="title" value={filterBy.title} autoComplete='off'
                   ref={inputRef} type="text" placeholder="Search in playlist" />

                {isSort && <ul className="options-container" >
                    {customOptions.map((customOption, idx) => (
                        <li onClick={(ev)=>{
                            ev.preventDefault();
                            this.onSetSort(customOption)
                        }} className="clean-list sort-li" key={idx}>{customOption}</li>
                    ))}
                </ul>}

            </form>
        )
    }
}
