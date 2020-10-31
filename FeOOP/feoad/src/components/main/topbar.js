import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
class topbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    {/* Sidebar Toggle (Topbar) */}
                    <div className="col-2">
                        asdfasdf
                    </div>
                    <div className="col">
                        <div className="NBar">
                            <NavLink className="link" to="/listusers" >Home</NavLink>
                            <NavLink className="link" to="/listusers" >Patient</NavLink>
                            <NavLink className="link" to="/listusers" >Department</NavLink>
                            <NavLink className="link" to="/listusers" >Pharmacity</NavLink>
                            <NavLink className="link" to="/listusers" >User</NavLink>
                        </div>
                    </div>
                    {/* Topbar Navbar */}
                    <ul className="navbar-nav ml-auto">

                        {/* Nav Item - User Information */}
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna adf</span>
                                <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="" />
                            </a>
                            {/* Dropdown - User Information */}
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="/">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                Profile
                                </a>
                                <a className="dropdown-item" href="/">
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                                Settings
                                </a>
                                <a className="dropdown-item" href="/">
                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                                Activity Log
                                </a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item" href="/" data-toggle="modal" data-target="#logoutModal">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>

            </div>
        );
    }
}

export default topbar;