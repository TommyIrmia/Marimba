import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';

export class Facebook extends Component {


    state = {
        user: {
            username: '',
            fullname: '',
            imgUrl: '',
        }
    }



    responseFacebook = (val) => {

        const fullname = val.name
        const username = val.name.split(' ').slice(0, 1)
        const imgUrl = val.picture.data.url;
            console.log('fullname', imgUrl);
        this.setState({ username })
    }
    render() {
        const { user } = this.state;
        console.log('user', user);
        return (
            <div>
                <FacebookLogin
                    appId="550515812703196"
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="public_profile"
                    callback={this.responseFacebook}
                />
            </div>
        )
    }
}



