import React, { Component } from 'react'
import { ActivityLog } from '../cmps/ActivityLog'

export class ActivitiesPage extends Component {

    state = {
    }
    componentDidMount() {
        window.scrollTo(0, 0)
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
