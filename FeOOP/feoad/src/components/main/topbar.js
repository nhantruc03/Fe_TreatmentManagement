import { Nav, NavDropdown } from 'react-bootstrap';
import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import auth from '../../router/auth';
class topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            logout: false,
            thongtincanhan: false
        }
    }
    async componentDidMount() {
        var login = localStorage.getItem('login');
        var obj = JSON.parse(login);
        this.setState({
            name: obj.name
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleSelect = (e) => {
        if (e === 'Logout') {
            auth.logout();
            this.setState({
                logout: true
            })
        } else {
            if (window.location.pathname !== '/thongtincanhan') {
                this.setState({
                    thongtincanhan: true
                })
            }
        }
    }

    render() {
        if (this.state.logout) {
            return (
                <Redirect to="login" />
            )
        }
        else if (this.state.thongtincanhan) {
            return (
                <Redirect to="thongtincanhan" />
            )
        }
        else {
            return (
                <div>
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                        {/* Sidebar Toggle (Topbar) */}
                        <div className="col-2">
                            asdfasdf
                        </div>
                        <div className="col">
                            <div className="NBar">
                                <NavLink className="link top" to="/home" >Trang đăng kí</NavLink>
                                <NavLink className="link top" to="/listpatients" >Bệnh nhân</NavLink>
                                <NavLink className="link top" to="/listdepartments" >Phòng</NavLink>
                                <NavLink className="link top" to="/phongduocsi" >Phòng dược sĩ</NavLink>
                                <NavLink className="link top" to="/listusers" >Người dùng</NavLink>
                                <NavLink className="link top" to="/listservices" >Dịch vụ</NavLink>
                                <NavLink className="link top" to="/doctor_listdepartments" >Phòng khám</NavLink>
                                <NavLink className="link top" to="/sobanthuoc" >Sổ bán thuốc</NavLink>
                            </div>
                        </div>
                        {/* Topbar Navbar */}
                        <div className="navbar-nav ml-auto">
                            <Nav variant="pills" activeKey="1" onSelect={this.handleSelect}>
                                <NavDropdown title={this.state.name} id="nav-dropdown">
                                    <NavDropdown.Item eventKey="user">Thông tin cá nhân</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item eventKey="Logout">Log out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </div>
                    </nav>

                </div>
            );
        }
    }
}

export default topbar;