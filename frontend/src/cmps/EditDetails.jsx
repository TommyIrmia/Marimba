import React, { Component } from 'react'

import { uploadImg } from '../services/cloudinary.service';

export default class EditDetails extends Component {

    state = {
        isHover: false,
        hero: {
            img: this.props.hero.img,
            title: this.props.hero.title,
            desc: this.props.hero.desc,
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

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({
            ...prevState, hero:
                { ...prevState.hero, [field]: value }
        }))
    }

    render() {
        const { isHover, hero } = this.state;
        const { img, title, desc } = this.state.hero;
        const { onEdit, onCloseEdit, saveDataFromHero } = this.props;
        return (
            <main className="edit-container" >
                <div className="header-edit flex" >
                    <h3>Edit details</h3>
                    <button onClick={onCloseEdit} >X</button>
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
                        maxlength="14" placeholder={title} value={title} autoComplete="off" />

                    <textarea placeholder="Add an optional description"
                        maxlength="60" name="desc" value={desc} onChange={this.handleChange} ></textarea>
                </section>
                <button onClick={() => {
                    onEdit(hero)
                    saveDataFromHero(hero)
                }} className="btn-save">Save</button>
            </main>
        )
    }
}
