import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadActivities } from '../store/activitylog.actions'

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

    render() {
        const { activities } = this.props
        console.log('Activities from render', activities);
        // if (!activities.length) return <div></div>
        return (<section className="activity-log">
            <h1>Activity Log<span className="far fa-clock"></span></h1>
            <div className="activity-log-container">
                <ul className="clean-list">
                    {/* {activities.map(activity => {
                        (activity.type === 'create playlist') && (<li className="flex">
                            <div className="activity-type">
                                <span className="fas fa-plus-square "></span>
                            </div>
                            <div className="activity-info">
                                Tomer created a playlist - "All Time Hits"
                            </div>
                            <div className="activity-date">10/12 16:43</div>
                        </li>)

                            (activity.type === 'add track') && (<li className="flex">
                                <div className="activity-type">
                                    <span className="fas fa-plus"></span>
                                </div>
                                <div className="activity-info">
                                    Naama added "positions" to Ariana's HITS!
                                </div>
                                <div className="activity-date">10/11 10:43</div>
                            </li>)

                                (activity.type === 'remove track') && (<li className="flex">
                                    <div className="activity-type">
                                        <span className="fas fa-trash-alt "></span>
                                    </div>
                                    <div className="activity-info">
                                        Naama removed a track - positions from Ariana's HITS!
                                    </div>
                                    <div className="activity-date">10/12 16:43</div>
                                </li>)
                    })} */}



                    <li className="flex">
                        <div className="activity-type">
                            <span className="fas fa-plus-square "></span>
                        </div>
                        <div className="activity-info">
                            Tommy created a playlist - "Best of Lizzo!"
                        </div>
                        <div className="activity-date">10/12 16:43</div>
                    </li>



                    <li className="flex">
                        <div className="activity-type">
                            <span className="fas fa-trash-alt "></span>
                        </div>
                        <div className="activity-info">
                            Tomer removed a track - Hey Jude from "All Time Hits"
                        </div>
                        <div className="activity-date">10/12 16:43</div>
                    </li>

                    <li className="flex">
                        <div className="activity-type">
                            <span className="fas fa-plus "></span>
                        </div>
                        <div className="activity-info">
                            Tommy added a track - Juice to "Best of Lizzo!"
                        </div>
                        <div className="activity-date">10/12 16:43</div>
                    </li>
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
    loadActivities
}


export const ActivityLog = connect(mapStateToProps, mapDispatchToProps)(_ActivityLog)