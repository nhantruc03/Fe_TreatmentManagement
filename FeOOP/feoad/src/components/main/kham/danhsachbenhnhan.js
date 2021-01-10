import Axios from 'axios';
import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { AUTH, WebSocketServer } from '../../env';
import Search from '../search';
import TableData from '../table';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const tablerow = ['Tên', 'Lý do', 'Trạng thái']
const keydata = ['patientId.name', 'reason', 'status']
var obj = "departments";
const client = new W3CWebSocket(WebSocketServer);
class danhsachbenhnhan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            postsPerPage: 10,
            listPage: [],
            SearchData: [],
            type: ''
        }
    }
    
    sendMessage = () => {
        client.send(JSON.stringify({
            type: "message",
            msg: 'hello'
        }))
    }

    async componentDidMount() {
        this._isMounted = true;

        // websocket - realtime section

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer.id === this.props.match.params.id) {
                if (dataFromServer.type === "ADD") {
                    this.setState({
                        data: dataFromServer.data,
                        SearchData: dataFromServer.data
                    })
                }
            }
        };
        // end - realtime section

        const [queue, this_room, polyclinic] = await trackPromise(Promise.all([
            Axios.get('/api/departments/' + this.props.match.params.id + "/patient-queue", {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.get('/api/departments/' + this.props.match.params.id, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                ),
            Axios.post('/api/faculties/getAll', { name: "polyclinic" }, {
                headers: {
                    'Authorization': { AUTH }.AUTH
                }
            })
                .then((res) =>
                    res.data.data
                )
        ]));

        console.log(queue);

        if (queue !== null && this_room !== null && polyclinic !== null) {
            if (this._isMounted) {
                if (this_room.facultyId === polyclinic[0]._id) {
                    this.setState({
                        type: 'khamdakhoa'
                    })
                } else {
                    this.setState({
                        type: 'khamchuyenkhoa'
                    })
                }
                this.setState({
                    data: queue[0].queue,
                    SearchData: queue[0].queue
                })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getCurData = (SearchData) => {
        return SearchData;

    }

    getSearchData = (data) => {
        this.setState({
            SearchData: data
        })
    }

    onAddClick = () => {
        this.setState({
            onAdd: true
        })
    }

    onDelete = (e) => {
        this.setState({
            data: this.state.data.filter(o => o._id !== e),
            SearchData: this.state.SearchData.filter(o => o._id !== e)
        })

        if (this.state.type === "khamdakhoa") {
            client.send(JSON.stringify({
                type: "REMOVE",
                id: e
            }))
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    goBack = () => {
        this.props.history.goBack();
    }
    printData = (SearchData) => {
        if (this.state.data !== null) {
            return (
                <div className='mt-1' style={{height:'100%'}}>
                    <div className="row">
                        <div className="col-9">
                            <div onClick={this.goBack} className='subject'>{`<- Danh sách chờ của phòng khám`}</div>
                        </div>
                    </div>

                    <Search targetParent="patientId" target="name" data={this.state.data} getSearchData={(e) => this.getSearchData(e)} />
                   
                    <TableData autoScroll={true} noaction={true} type={this.state.type} curRoom={this.props.match.params.id} obj={obj} dataRow={tablerow} data={this.getCurData(SearchData)} keydata={keydata} onDelete={(e) => this.onDelete(e)} departmentId={this.props.match.params.id} />

                </div>
            )
        } else {
            return (
                <div className='mt-5'>
                    <h1 className='text-primary mb-3'>Danh sách người dùng</h1>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    {this.printData(this.state.SearchData)}
                </div>
            </div>
        );
    }
}

export default danhsachbenhnhan;