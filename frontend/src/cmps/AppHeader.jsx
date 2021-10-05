import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';

export class _AppHeader extends React.Component {

    state = {
        isOpen: false,
    }

    onOpenOptions = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen })
    }

    render() {
        const user = false;
        const { isOpen } = this.state;
        const { bgc, stationName } = this.props
        return (
            <div className="app-header" style={{ backgroundColor: bgc }} >

                <h1>{stationName}</h1>


                <div onClick={this.onOpenOptions} className="user-container">
                    <div className="far fa-user-circle"></div>
                    <div className="user-name">Tommy Irmia</div>
                    <div className={(isOpen) ? 'fas fa-sort-up' : 'fas fa-sort-down'}></div>
                </div>

                {isOpen && <ul className="options-container">
                    {!user && <li onClick={()=> {
                        this.props.history.push('/login')
                        this.setState({isOpen:false})
                    }} className="clean-list user-options" >Log in</li>}
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

function mapStateToProps(state) {
    return {
        bgc: state.stationModule.bgc,
        stationName: state.stationModule.stationName
    }
}
const mapDispatchToProps = {
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)( withRouter (_AppHeader))
