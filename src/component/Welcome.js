import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../component/style.css'

export class Welcome extends Component {
    
    render() {
        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <Link className="navbar-brand mb-0 h1" to="/">
                            <img src="images/todo.png" width="40" height="40" className="d-inline-block align-top" alt=""/></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/registration">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            </ul>
                        </div>
                </nav>
            <div className="bg-image"></div>
            <h1 className='bg-text'>Welcome</h1>
            </>
        )
    }
}

export default Welcome
