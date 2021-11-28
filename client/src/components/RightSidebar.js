import React from 'react'
import { useHistory } from 'react-router';
import './css/rightsidebar.css';

export default function RightSidebar() {
    const history = useHistory();

    const moveToDashboard = ()=>{
        history.push('/dashboard');
    }

    return (
        <div className="container">
            <div className="main">
                <p className="newString">New Connection</p>
                <div className="box">
                    <p className="insideStrng">Click edit to modify your connection string (SRV or Standard )</p>
                    <input type="text" placeholder="eg. mongodb+srv://username:password@cluster()-jtpsd.mongodb.net/admin" />
                    <button onClick={moveToDashboard}>Connect</button>
                </div>
            </div>
        </div>
    )
}
