import React, { Component } from 'react'
import { SearchPageFilter } from './../cmps/SearchPageFilter';
import { GenreList } from './../cmps/GenreList';
import { StationList } from '../cmps/StationList.jsx'

export class SearchPage extends Component {
    state = {
        searchKey: '',
        isSearch: false
    }

    onSetFilter = (searchKey) => {
        if (searchKey === '') this.setState({ searchKey: searchKey, isSearch: false })
        else this.setState({ searchKey: searchKey, isSearch: true })
    }
    render() {
        const { searchKey, isSearch } = this.state;
        console.log('search key:', searchKey);
        return (
            <main className="SearchPage playlist-layout" >
                <SearchPageFilter onSetFilter={this.onSetFilter}/>
                {!isSearch && <GenreList />}
                {isSearch && <StationList search={searchKey} isGenrePage={true}/>}
            </main>
        )
    }
}
