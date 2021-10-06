import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';

import {onLogout} from '../store/user.actions'

export class _AppHeader extends React.Component {

    state = {
        isOpen: false,
    }

    onOpenOptions = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen })
    }

    render() {
        const { isOpen } = this.state;
        const { bgc, stationName, user,onLogout } = this.props
        console.log('from header', user)
        return (
            <div className="app-header" style={{ backgroundColor: bgc }} >

                <h1>{stationName}</h1>


                <div onClick={this.onOpenOptions} className="user-container">
                    <div className="img-container"><img src={user.imgUrl} /></div>
                    <div className="user-name">{user.fullname}</div>
                    <div className={(isOpen) ? 'fas fa-sort-up' : 'fas fa-sort-down'}></div>
                </div>

                {isOpen && <ul className="options-container">
                    {user.fullname === 'Guest' && <li onClick={() => {
                        this.props.history.push('/login')
                        this.setState({ isOpen: false })
                    }} className="clean-list user-options" >Log in</li>}
                    {!user.fullname === 'Guest' && <>
                        <li className="clean-list user-options" >Profile</li>
                        <li className="clean-list user-options" >Settings</li>
                        <li onClick={onLogout} className="clean-list user-options" >Log out</li>
                    </>}
                </ul>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        bgc: state.stationModule.bgc,
        stationName: state.stationModule.stationName,
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    onLogout,
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader))
