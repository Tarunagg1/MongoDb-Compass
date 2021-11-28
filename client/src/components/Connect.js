import React from 'react'
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import './css/main.css';

export default function Connect() {
    return (
        <div className="mainconnect">
            <LeftSidebar />
            <RightSidebar />
        </div>
    )
}
