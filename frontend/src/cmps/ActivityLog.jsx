import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { utilService } from '../services/util.service'
import { loadActivities, onReadActivity } from '../store/activitylog.actions'
import { onSetMsg } from '../store/user.actions'
import { setBgcAndName } from '../store/station.actions'
import { socketService } from '../services/socket.service'

export class _ActivityLog extends Component {

    componentDidMount() {
        this.loadActivities()
        socketService.on('addActivity', this.loadActivities)
    }

    loadActivities = async () => {
        try {
            await this.props.loadActivities()
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

    onGoToActivity = (activity) => {
        this.onReadActivity(activity)
        console.log('activity', activity);
        if (activity.type === 'like track') return
        this.props.history.push(`/station/${activity.stationInfo.id}`)
        this.props.setBgcAndName(activity.stationInfo.bgc, activity.stationInfo.name)
    }

    onReadActivity = async (activity) => {
        if (activity.isRead) return
        await this.props.onReadActivity(activity);
        this.loadActivities();
        console.log('activity', activity);
    }


    dynamicCmp = (activity, idx) => {
        const { user } = this.props
        const classStr = (activity.isRead) ? "flex read" : "flex";
        if (activity.createdBy._id === user._id) return
        switch (activity.type) {
            case 'create playlist':
                return (<li className={classStr} key={idx}
                    onClick={() => this.onGoToActivity(activity)}
                    onMouseLeave={() => this.onReadActivity(activity)}>
                    <div className="activity-user">
                        <img src={activity.createdBy.imgUrl} alt='user-img' />
                    </div>
                    <div className="activity-info">
                        <span className="user-name"> {activity.createdBy.fullname} </span>
                        <span className="green">created a playlist</span> - "{activity.stationInfo?.name}"
                    </div>
                    <div className="activity-date">{utilService.getTime(activity.createdAt)}</div>
                </li>)
            case 'add track':
                return (<li className={classStr} key={idx}
                    onClick={() => this.onGoToActivity(activity)}
                    onMouseLeave={() => this.onReadActivity(activity)}>
                    <div className="activity-user">
                        <img src={activity.createdBy.imgUrl} alt='user-img' />
                    </div>
                    <div className="activity-info" >
                        <span className="user-name"> {activity.createdBy.fullname} </span>
                        <span className="green"> added </span> "{activity.trackName}" to "{activity.stationInfo?.name}"!
                    </div>
                    <div className="activity-date">{utilService.getTime(activity.createdAt)}</div>
                </li>)
            case 'remove track':
                return (<li className={classStr} key={idx}
                    onClick={() => this.onGoToActivity(activity)}
                    onMouseLeave={() => this.onReadActivity(activity)}>
                    <div className="activity-user">
                        <img src={activity.createdBy.imgUrl} alt='user-img' />
                    </div>
                    <div className="activity-info">
                        <span className="user-name"> {activity.createdBy.fullname}</span>
                        <span className="red"> removed </span>"{activity.trackName}" from "{activity.stationInfo?.name}"!
                    </div>
                    <div className="activity-date">{utilService.getTime(activity.createdAt)}</div>
                </li>)
            case 'like track':
                return (<li className={classStr} key={idx}
                    onClick={() => this.onGoToActivity(activity)}
                    onMouseLeave={() => this.onReadActivity(activity)}>
                    <div className="activity-user">
                        <img src={activity.createdBy.imgUrl} alt='user-img' />
                    </div>
                    <div className="activity-info">
                        <span className="user-name"> {activity.createdBy.fullname}</span>
                        <span className="pink"> 💖 </span>"{activity.trackName}"!
                    </div>
                    <div className="activity-date">{utilService.getTime(activity.createdAt)}</div>
                </li>)
            default:
        }
    }

    render() {
        const { activities, unRead } = this.props
        return (<section className="activity-log">

            <h1>What's New?
                {unRead > 0 && <span className="unread shown">{unRead}</span>}
            </h1>

            <div className="activity-log-container">

                {!activities.length && <div><br /><br />No Activities</div>}
                <ul className="clean-list">
                    {activities.map((activity, index) => this.dynamicCmp(activity, index))}
                </ul>
            </div>

        </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        activities: state.activityLogModule.activities,
        unRead: state.activityLogModule.unRead,
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    loadActivities,
    setBgcAndName,
    onSetMsg,
    onReadActivity
}


export const ActivityLog = connect(mapStateToProps, mapDispatchToProps)(withRouter(_ActivityLog))