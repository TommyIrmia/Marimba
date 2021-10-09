import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { onLogout, onSetMsg } from '../store/user.actions'
import { Logo } from './Logo';

export class _AppHeader extends React.Component {

    state = {
        isOpen: false,
    }

    onOpenOptions = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen })
    }

    onLogout = () => {
        this.props.onLogout()
        this.props.onSetMsg('success', 'Logged out successfully')
    }

    render() {
        const { isOpen } = this.state;
        const { bgc, stationName, user } = this.props
        return (
            <div className="app-header" style={{ backgroundColor: bgc }} >
                <Link to="/"><Logo /></Link>
                <h1>{stationName}</h1>
                <div onClick={this.onOpenOptions} className="user-container">
                    <div className="img-container"><img src={user.imgUrl} alt='user-img' /></div>
                    <div className="user-name">{user.fullname}</div>
                    <div className={(isOpen) ? 'fas fa-sort-up' : 'fas fa-sort-down'}></div>
                </div>

                {isOpen && <ul className="options-container">
                    {user.fullname === 'Guest' && <li onClick={() => {
                        this.props.history.push('/login')
                        this.setState({ isOpen: false })
                    }} className="clean-list user-options" >Log in</li>}
                    {user.fullname !== 'Guest' && <>
                        <li className="clean-list user-options" >Profile</li>
                        <Link to={'/library'}><li className="clean-list user-options" >Library</li></Link>
                        <li onClick={() => {
                            this.onLogout()
                            this.setState({ isOpen: false })
                        }} className="clean-list user-options" >Log out</li>
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
    onSetMsg
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader))
