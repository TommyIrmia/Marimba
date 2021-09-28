import React, { Component } from 'react'

export default class EditInfoHero extends Component {

    state = {
        isHover: false,
        hero: {
            img: '',
            title:'',
            desc:''
        }
    }

    render() {
        const { isHover, hero } = this.state;
        const { img } = this.state.hero;
        return (
            <main className="edit-container" >
                <h3>Edit details</h3>
            <section className="EditInfoHero grid" >
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
            </section>
            </main>
        )
    }
}
