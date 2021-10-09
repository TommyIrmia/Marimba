import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { utilService } from '../services/util.service'
import { loadActivities } from '../store/activitylog.actions'
import { setBgcAndName } from '../store/station.actions'
import { socketService } from '../services/socket.service'
import { activityService } from '../services/activity-log.service'

export class _ActivityLog extends Component {

    state = {
    }

    async componentDidMount() {
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

    dynamicCmp = (activity, idx) => {
        const classStr = (activity.isRead) ? "flex read" : "flex";
        // console.log('activity', activity)
        switch (activity.type) {
            case 'create playlist':
                return (<li className={classStr} key={idx}
                    onClick={() => {
                        this.props.history.push(`/station/${activity.stationInfo.id}`)
                        this.props.setBgcAndName(activity.stationInfo.bgc, activity.stationInfo.name)

                    }}
                    onMouseEnter={() => {
                        activityService.read(activity);
                        this.loadActivities();
                    }}
                >
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
                    onClick={() => {
                        this.props.history.push(`/station/${activity.stationInfo.id}`)
                        this.props.setBgcAndName(activity.stationInfo.bgc, activity.stationInfo.name)
                    }}
                    onMouseEnter={() => {
                        activityService.read(activity);
                        this.loadActivities();
                    }}
                >
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
                    onClick={() => {
                        this.props.history.push(`/station/${activity.stationInfo.id}`)
                        this.props.setBgcAndName(activity.stationInfo.bgc, activity.stationInfo.name)
                    }}
                    onMouseEnter={() => {
                        activityService.read(activity);
                        this.loadActivities();
                    }}
                >
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
                    onMouseEnter={() => {
                        activityService.read(activity);
                        this.loadActivities();
                    }}
                >
                    <div className="activity-user">
                        <img src={activity.createdBy.imgUrl} alt='user-img' />
                    </div>
                    <div className="activity-info">
                        <span className="user-name"> {activity.createdBy.fullname}</span>
                        <span className="pink"> 💖 </span>"{activity.trackName}"!
                    </div>
                    <div className="activity-date">{utilService.getTime(activity.createdAt)}</div>
                </li>)
        }
    }

    render() {
        let { activities } = this.props
        if (!activities.length) return <div>No Activities</div>

        return (<section className="activity-log">
            <h1>What's New? </h1>

            <div className="activity-log-container">
                <ul className="clean-list">
                    {activities.map((activity, index) => this.dynamicCmp(activity, index))}
                </ul>
            </div>

        </section>
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
    setBgcAndName
}


export const ActivityLog = connect(mapStateToProps, mapDispatchToProps)(withRouter(_ActivityLog))