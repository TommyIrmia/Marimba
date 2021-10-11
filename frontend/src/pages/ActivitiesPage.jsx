import React from 'react'
import { ActivityLog } from '../cmps/ActivityLog'

export function ActivitiesPage() {

    window.scrollTo(0, 0)
    return (
        <section className="activity-page">
            <h1>What's new?</h1>
            <ActivityLog />
        </section>
    )
}
