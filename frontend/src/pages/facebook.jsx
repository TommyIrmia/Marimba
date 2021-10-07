import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';

export class Facebook extends Component {
    responseFacebook = (response) => {
        console.log(response);
    }
    render() {

        return (
            <div>
                <FacebookLogin
          appId="265486362138141"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,user_actions.books"
          callback={this.responseFacebook}
        />
            </div>
        )
    }
}



