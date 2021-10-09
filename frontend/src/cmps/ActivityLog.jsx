import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { utilService } from '../services/util.service'
import { loadActivities, getUnRead } from '../store/activitylog.actions'
import { setBgcAndName } from '../store/station.actions'
import { socketService } from '../services/socket.service'
import { activityService } from '../services/activity-log.service'

export class _ActivityLog extends Component {

    state = {
    }

    async componentDidMount() {
        this.loadActivities()
        this.props.getUnRead();
        socketService.on('addActivity', this.loadActivities)
    }

    loadActivities = async () => {
        try {
            await this.props.loadActivities()
        } catch (err) {
            this.props.onSetMsg('error', 'Oops.. something went wrong,\n please try again.')
        }
    }

<<<<<<< HEAD
    onGoToActivity = (activity) => {
        this.onReadActivity()
        if (activity.type === 'like track') return
        this.props.history.push(`/station/${activity.stationInfo.id}`)
        this.props.setBgcAndName(activity.stationInfo.bgc, activity.stationInfo.name)
    }

    onReadActivity = (activity) => {
        activityService.read(activity);
        this.loadActivities();
    }
=======
    getUnRead = async () => {
        await this.props.getUnRead()
    }

>>>>>>> c4b4fc3a15d4b799faf851618604d19b3ec4f7fb

    dynamicCmp = (activity, idx) => {
        const classStr = (activity.isRead) ? "flex read" : "flex";
        switch (activity.type) {
            case 'create playlist':
                return (<li className={classStr} key={idx}
<<<<<<< HEAD
                    onClick={() => this.onGoToActivity(activity)}
                    onMouseEnter={() => this.onReadActivity(activity)}>
=======
                    onClick={() => {
                        this.props.history.push(`/station/${activity.stationInfo.id}`)
                        this.props.setBgcAndName(activity.stationInfo.bgc, activity.stationInfo.name)

                    }}
                    onMouseEnter={() => {
                        activityService.read(activity);
                        this.loadActivities();
                        this.getUnRead();
                    }}
                >
>>>>>>> c4b4fc3a15d4b799faf851618604d19b3ec4f7fb
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
<<<<<<< HEAD
                    onClick={() => this.onGoToActivity(activity)}
                    onMouseEnter={() => this.onReadActivity(activity)}>
=======
                    onClick={() => {
                        this.props.history.push(`/station/${activity.stationInfo.id}`)
                        this.props.setBgcAndName(activity.stationInfo.bgc, activity.stationInfo.name)
                    }}
                    onMouseEnter={() => {
                        activityService.read(activity);
                        this.loadActivities();
                        this.getUnRead();
                    }}
                >
>>>>>>> c4b4fc3a15d4b799faf851618604d19b3ec4f7fb
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
<<<<<<< HEAD
                    onClick={() => this.onGoToActivity(activity)}
                    onMouseEnter={() => this.onReadActivity(activity)}>
=======
                    onClick={() => {
                        this.props.history.push(`/station/${activity.stationInfo.id}`)
                        this.props.setBgcAndName(activity.stationInfo.bgc, activity.stationInfo.name)
                    }}
                    onMouseEnter={() => {
                        activityService.read(activity);
                        this.loadActivities();
                        this.getUnRead();
                    }}
                >
>>>>>>> c4b4fc3a15d4b799faf851618604d19b3ec4f7fb
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
<<<<<<< HEAD
                    onClick={() => this.onGoToActivity(activity)}
                    onMouseEnter={() => this.onReadActivity(activity)}>
=======
                    onMouseEnter={() => {
                        activityService.read(activity);
                        this.loadActivities();
                        this.getUnRead();
                    }}
                >
>>>>>>> c4b4fc3a15d4b799faf851618604d19b3ec4f7fb
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
        let { unRead } = this.props;
        console.log('unRead', unRead);
        return (<section className="activity-log">
<<<<<<< HEAD
            <h1>What's New?</h1>
=======
            <h1>What's New? <span>{unRead}</span></h1>
>>>>>>> c4b4fc3a15d4b799faf851618604d19b3ec4f7fb

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
    getUnRead,
    setBgcAndName
}


export const ActivityLog = connect(mapStateToProps, mapDispatchToProps)(withRouter(_ActivityLog))