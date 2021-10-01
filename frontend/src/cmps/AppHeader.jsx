import React from 'react'
import { sessionService } from './../services/session.service';

export class AppHeader extends React.Component {

    state = {
        isOpen: false,
    }

    onOpenOptions = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen:!isOpen}) 
    }
    render() {
        const user = true;
        const { isOpen} = this.state;
        return (
            <div className= "app-header">
            <div onClick={this.onOpenOptions} className="user-container">
                <div className="far fa-user-circle"></div>
                <div className="user-name">user</div>
                <div className={(isOpen) ? 'fas fa-sort-up' : 'fas fa-sort-down'}></div>
            </div>
           { isOpen && <ul className="options-container">
                {!user && <li className="clean-list user-options" >Log in</li>}
                {user && <>
                    <li className="clean-list user-options" >Profile</li>
                    <li className="clean-list user-options" >Settings</li>
                    <li className="clean-list user-options" >Log out</li>
                </>}
            </ul>}
        </div>
    )
}
}
