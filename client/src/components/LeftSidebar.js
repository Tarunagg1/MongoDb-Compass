import React from 'react'
import './css/leftsidebar.css';

export default function LeftSidebar() {
    return (
        <div className="sidebar">
            <div className="menu">
                <div className="tab">
                <i className="fas fa-bolt"></i> <span>New Connection</span>
                </div>
                <div className="tab">
                <i className="fas fa-star"></i> <span>Favorites</span>
                </div>
                <div className="tab">
                <i className="fas fa-history"></i> <span>Recents</span>
                </div>
            </div>
        </div>
    )
}
