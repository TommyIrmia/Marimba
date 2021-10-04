import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { utilService } from '../services/util.service'
import { loadActivities } from '../store/activitylog.actions'
import { setBgcAndName } from '../store/station.actions'

export class _ActivityLog extends Component {

    state = {
        activities: [],
    }

    componentDidMount() {
        this.loadActivities()
    }

    loadActivities = async () => {
        await this.props.loadActivities()
    }

    dynamicCmp = (activity, idx) => {

        switch (activity.type) {
            case 'create playlist':
                return (<li className="flex" key={idx}
                    onClick={() => {
                        this.props.history.push(`/station/${activity.stationInfo.id}`)
                        this.props.setBgcAndName(activity.stationInfo.bgc, activity.stationInfo.name)
                    }}>
                    <div className="activity-type">
                        <span className="fas fa-plus-square "></span>
                    </div>
                    <div className="activity-info">
                        {activity.byUser} created a playlist - "{activity.stationInfo.name}"
                    </div>
                    <div className="activity-date">{utilService.getTime(activity.createdAt)}</div>
                </li>)
            case 'add track':
                return (<li className="flex" key={idx}
                    onClick={() => {
                        this.props.history.push(`/station/${activity.stationInfo.id}`)
                        this.props.setBgcAndName(activity.stationInfo.bgc, activity.stationInfo.name)
                    }}>
                    <div className="activity-type">
                        <span className="fas fa-plus"></span>
                    </div>
                    <div className="activity-info" >
                        {activity.byUser} added "{activity.trackName}" to "{activity.stationInfo.name}"!
                    </div>
                    <div className="activity-date">{utilService.getTime(activity.createdAt)}</div>
                </li>)
            case 'remove track':
                return (<li className="flex" key={idx} onClick={() => {
                    this.props.history.push(`/station/${activity.stationInfo.id}`)
                    this.props.setBgcAndName(activity.stationInfo.bgc, activity.stationInfo.name)
                }}>
                    <div className="activity-type">
                        <span className="fas fa-trash-alt "></span>
                    </div>
                    <div className="activity-info">
                        {activity.byUser} removed "{activity.trackName}" from "{activity.stationInfo.name}"!
                    </div>
                    <div className="activity-date">{utilService.getTime(activity.createdAt)}</div>
                </li>)
        }
    }

    render() {
        const { activities } = this.props
        if (!activities.length) return <div></div>

        return (<section className="activity-log">

            <h1>Activity Log<span className="far fa-clock"></span></h1>

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
    }
}
const mapDispatchToProps = {
    loadActivities,
    setBgcAndName
}


export const ActivityLog = connect(mapStateToProps, mapDispatchToProps)(withRouter(_ActivityLog))