import React, { Component } from 'react'
import { SeacrchPageFilter } from './../cmps/SeacrchPageFilter';
import { GenreList } from './../cmps/GenreList';

export class SearchPage extends Component {
    render() {
        return (
            <main className="SearchPage playlist-layout" >
               <SeacrchPageFilter/>
               <GenreList/>
            </main>
        )
    }
}
