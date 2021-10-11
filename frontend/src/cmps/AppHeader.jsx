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

    capitalizeStationName = (name) => {
        const stationName = name.charAt(0).toUpperCase() + name.slice(1);
        return stationName;
    }

    render() {
        const { isOpen } = this.state;
        const { bgc, stationName, user } = this.props
        return (
            <div className="app-header" style={{ backgroundColor: bgc }} >

                <Link to="/"><Logo /></Link>
                <h1>{this.capitalizeStationName(stationName)}</h1>

                <div onClick={this.onOpenOptions} className="user-container">
                    <div className="img-container"><img src={user.imgUrl} alt='user-img' /></div>
                    <div className="user-name">{user.fullname}</div>
                    <div className={(isOpen) ? 'fas fa-sort-up' : 'fas fa-sort-down'}></div>
                </div>
                {isOpen && <div className="screen" onClick={this.onOpenOptions}></div>}

                {isOpen && <ul className="options-container">
                    {!user._id &&
                        <li className="clean-list user-options"
                            onClick={() => {
                                this.props.history.push('/login')
                                this.setState({ isOpen: false })
                            }} >
                            Log in
                        </li>}

                    {user._id && <>
                        <li className="clean-list user-options" >
                            Profile
                        </li>

                        <Link to={'/library'}>
                            <li className="clean-list user-options"
                                onClick={() => { this.setState({ isOpen: false }) }}>
                                Library
                            </li>
                        </Link>

                        <li className="clean-list user-options"
                            onClick={() => {
                                this.onLogout()
                                this.setState({ isOpen: false })
                            }}>
                            Log out
                        </li>
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
