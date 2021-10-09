import React, { Component } from 'react'
import { ActivityLog } from '../cmps/ActivityLog'

export default class ActivitiesPage extends Component {

    state = {
    }


    render() {

        return (
            <section className="activity-page">
                <h1>What's new?</h1>
                <ActivityLog />
            </section>
        )
    }
}
