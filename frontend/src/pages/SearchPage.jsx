import React, { Component } from 'react'
import { SearchPageFilter } from './../cmps/SearchPageFilter';
import { GenreList } from './../cmps/GenreList';

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
        const { isSearch } = this.state;
        return (
            <main className="SearchPage playlist-layout" >
                <SearchPageFilter />
                {!isSearch && <GenreList />}
            </main>
        )
    }
}
