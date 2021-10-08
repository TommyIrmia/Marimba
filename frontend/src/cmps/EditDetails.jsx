import React, { Component } from 'react'
import Select from 'react-select';

import { uploadImg } from '../services/cloudinary.service';
import { stationService } from './../services/station.service';
import { ColorInput } from './ColorInput';


export default class EditDetails extends Component {

    state = {
        isHover: false,
        isSelect: false,
        genres: [],
        hero: {
            bgc: "#282828",
            genres: [],
            img: this.props.hero.img,
            title: this.props.hero.title,
            desc: this.props.hero.desc,
        }
    }

    componentDidMount() {
        this.onGetGenres()
        this.props.onFlip('text-blur-in');
    }

    onGetGenres = async () => {
        let genres = await stationService.getGenres()
        genres = genres.filter(genre => {
            return genre.name !== 'All'
        })

        const options = genres.map(genre => {
            return {
                value: genre.name,
                label: genre.name,
                className:'multi-select-options'
            }
        })

        this.setState({ genres:options })
    }

    handleImgChange = async (ev) => {
        const field = ev.target.name;
        try {
            const value = await uploadImg(ev)
            this.setState((prevState) => ({ ...prevState, hero: { ...prevState.hero, [field]: value } }))
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
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
    
    onSelect = (ev) => {
        if (ev.length > 3) return;
        let value = ev.map(val=>{
            return val.label;
        })
        this.setState((prevState) => ({ ...prevState, hero: { ...prevState.hero, genres:value } }))
        this.setState({ isSelect: false })
    }

    onToggleSelect = () => {
        const { isSelect } = this.state;
        this.setState({ isSelect: !isSelect })
    }

    onChangeColor = (bgc) => {
        this.setState((prevState) => ({ ...prevState, hero: { ...prevState.hero, bgc } }))
    }

    render() {
        const { isHover, hero, genres, isSelect } = this.state;
        const { img, title, desc, bgc } = this.state.hero;
        const { onEdit, onToggleEdit, saveDataFromHero, onFlip, animation } = this.props;
        return (
            <main className={`edit-container  ${animation} `} style={{ backgroundColor: bgc }}>

                <div className="header-edit flex" >
                    <h3>Edit details</h3>
                    <button onClick={() => {
                        onFlip('text-blur-out')
                        onToggleEdit()
                    }} >X</button>
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

                    <input className="input-name" type="text" name="title" onChange={this.handleChange}
                        maxLength="18" placeholder={title} value={title} autoComplete="off" />

                    <div className="multi-select-container"> 

                        <Select
                            value={genres.label}
                            isMulti
                            onChange={this.onSelect}
                            // menuIsOpen={true}
                            options={genres}
                            placeholder="Choose up to 3 jenres :" />
                    </div>

                    <textarea placeholder="Add an optional description"
                        maxLength="60" name="desc" value={desc} onChange={this.handleChange} ></textarea>
                </section>

                <ColorInput onChangeColor={this.onChangeColor} />

                <button className="btn-save"
                    onClick={() => {
                        onFlip('text-blur-out')
                        onEdit(hero)
                        saveDataFromHero(hero)
                    }}> Save
                </button>
            </main >
        )
    }
}
