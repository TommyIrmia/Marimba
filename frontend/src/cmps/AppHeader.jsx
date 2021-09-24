import React from 'react'
import { Logo } from './Logo'

export function AppHeader() {
    return (
        <div className="app-header">
            <div className="user-container">
                <div className="far fa-user-circle"></div>
                <div className="user-name">user</div>
                <div className="fas fa-sort-down"></div>
            </div>
        </div>
    )
}
