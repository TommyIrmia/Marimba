import React, { Component } from 'react'

import { uploadImg } from '../services/cloudinary.service';
import EditDetails from './EditDetails';

export default class EditHero extends Component {

    state = {
        isHover: false,
        
        hero: {
            img: '',
            title: 'My playlist #1',
            desc: ''
        }
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

    onEdit = (hero) => {
        this.setState((prevState) => ({ ...prevState.hero, hero }))
        this.props.onToggleEdit();
    }


    render() {
        const { isHover, hero} = this.state;
        const { img, title, desc } = this.state.hero;
        const { saveDataFromHero, onToggleEdit, isEditTitle } = this.props
        return (
            <main className="EditHero-container">

                <section className="StationHero playlist-layout">
                    <label className="img-edit-container"
                        onMouseEnter={() => this.setState({ isHover: true })}
                        onMouseLeave={() => this.setState({ isHover: false })}>

                        {img && <img src={img} alt="img" />}

                        {<input hidden type="file" name="img" id="img"
                            defaultValue={img} onChange={this.handleImgChange} />}

                        {!isHover && !img && <div className="fab fa-itunes-note img-awesome note"></div>}
                        {isHover && !img && <div className="img-awesome flex" >
                            <p className="fas fa-pencil-alt pencil"></p>
                            <p>Choose photo</p>
                        </div>}
                    </label>


                    <div onClick={() => {
                        onToggleEdit()
                    }} className="info-container">
                        <h5>playlist</h5>
                        <h1 title={title} className="hero-title">{title}</h1>
                        <p>{desc}</p>
                        <p>maker</p>
                    </div>
                </section>


                {isEditTitle && <EditDetails onToggleEdit={onToggleEdit} onEdit={this.onEdit} hero={hero} saveDataFromHero={saveDataFromHero} />}
            </main>
        )
    }
}
