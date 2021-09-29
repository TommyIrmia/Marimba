import React, { Component } from 'react'

import { uploadImg } from '../services/cloudinary.service';
import { stationService } from './../services/station.service';


export default class EditDetails extends Component {

    state = {
        isHover: false,
        isSelect: false,
        genres: [],
        hero: {
            genre:'Hits',
            img: this.props.hero.img,
            title: this.props.hero.title,
            desc: this.props.hero.desc,
        }
    }

    componentDidMount() {
        this.onGetGenres()
    }

    onGetGenres = async () => {
        let genres = await stationService.getGenres()
       genres =  genres.filter(genre=>{
            return genre !== 'All'
        })
        this.setState({ genres })
    }

    handleImgChange = async (ev) => {
        const field = ev.target.name;
        try {
            const value = await uploadImg(ev)
            this.setState((prevState) => ({ ...prevState, hero: { ...prevState.hero, [field]: value } }))
        } catch (err) {
            console.log(err);
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({
            ...prevState, hero:
                { ...prevState.hero, [field]: value }
        }))
    }

    onSelect = (genre) => {
        this.setState((prevState) => ({...prevState,hero: { ...prevState.hero, genre } }))
        this.setState({isSelect:false})
    }

    onToggleSelect = () => {
        const {isSelect} = this.state;
        this.setState({ isSelect: !isSelect })
    }

    render() {
        const { isHover, hero, genres, isSelect} = this.state;
        const { img, title, desc } = this.state.hero;
        const { onEdit, onToggleEdit, saveDataFromHero } = this.props;
        return (
            <main className="edit-container" >
                <div className="header-edit flex" >
                    <h3>Edit details</h3>
                    <button onClick={onToggleEdit} >X</button>
                </div>
                <section className="EditDetails grid" >
                    <label className="img-edit"
                        onMouseEnter={() => this.setState({ isHover: true })}
                        onMouseLeave={() => this.setState({ isHover: false })}>

                        {img && <img src={img} alt="img" />}

                        {<input hidden type="file" name="img" id="img"
                            onChange={this.handleImgChange} />}

                        {!isHover && !img && <div className="fab fa-itunes-note img-awesome note"></div>}
                        {isHover && !img && <div className="img-awesome flex" >
                            <p className="fas fa-pencil-alt pencil"></p>
                            <p>Choose photo</p>
                        </div>}
                    </label>

                    <input type="text" name="title" onChange={this.handleChange}
                        maxLength="14" placeholder={title} value={title} autoComplete="off" />
                        
                    <div onClick={this.onToggleSelect} title="Select genre" className="select-container flex">
                        <div>{hero.genre}</div>
                        <div className={(isSelect) ? 'fas fa-sort-up' : 'fas fa-sort-down'}></div>

                        {isSelect && <ul className="options-container flex" >
                        {genres.map((genre, idx) => (
                            <li onClick={() => this.onSelect(genre)} className="clean-list select-li" key={idx}>{genre}</li>
                        ))}
                    </ul>}
                    </div>

                    <textarea placeholder="Add an optional description"
                        maxLength="60" name="desc" value={desc} onChange={this.handleChange} ></textarea>
                </section>
                <button onClick={() => {
                    onEdit(hero)
                    saveDataFromHero(hero)
                }} className="btn-save">Save</button>
            </main>
        )
    }
}
