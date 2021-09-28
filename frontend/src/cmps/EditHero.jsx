import React, { Component } from 'react'

import { uploadImg } from '../services/cloudinary.service';
import EditInfoHero from './EditInfoHero';

export default class EditHero extends Component {

    state = {
        isHover: false,
        isEditing: false,
        hero: {
            img: '',
            title:'',
            desc:''
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

    render() {
        const { isHover,isEditing } = this.state;
        const { img } = this.state.hero;
        return (
            <main className="EditHero-container">

                <section className="StationHero playlist-layout">
                    <label className="img-edit-container"
                        onMouseEnter={() => this.setState({ isHover: true })}
                        onMouseLeave={() => this.setState({ isHover: false })}>

                        { img && <img src={img} alt="img" />}

                        {<input hidden type="file" name="img" id="img"
                            defaultValue={img} onChange={this.handleImgChange} />}

                        {!isHover && !img && <div className="fab fa-itunes-note img-awesome note"></div>}
                        {isHover && !img && <div className="img-awesome flex" >
                            <p className="fas fa-pencil-alt pencil"></p>
                            <p>Choose photo</p>
                        </div>}
                    </label>

                    <div className="info-container">
                        <h5>playlist</h5>
                        <h1 className="hero-title">My playlist #1</h1>
                        <p>description</p>
                        <p>maker</p>
                    </div>
                </section>


                { isEditing && <EditInfoHero/>}
            </main>
        )
    }
}
