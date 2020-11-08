import React, { Component } from 'react';
import adddepartments from '../components/main/department/adddepartments';
import editdepartments from '../components/main/department/editdepartments';
import listdepartments from '../components/main/department/listdepartments';
import home from '../components/main/home/home';
import Admin from '../components/main/page';
import editpatients from '../components/main/patient/editpatients';
import listpatients from '../components/main/patient/listpatients';
import register_medical from '../components/main/register_medical/register_medical';
import addusers from '../components/main/user/addusers';
import editusers from '../components/main/user/editusers';
import user from '../components/main/user/listusers';
import doctor_listdepartments from '../components/main/kham/doctor_listdepartments'
import kham from '../components/main/kham/kham';
import khamdakhoa from '../components/main/khambenh/khamdakhoa';
import dangkikhamchuyenkhoa from '../components/main/register_medical/dangkikhamchuyenkhoa';
import khamchuyenkhoa from '../components/main/khambenh/khamchuyenkhoa';
import listservices from '../components/main/medical_service/listservices';
import editservices from '../components/main/medical_service/editservices';
import addservices from '../components/main/medical_service/addservices';
import dangkidichvu from '../components/main/register_medical/dangkidichvu';
import xemhoadon from '../components/main/register_medical/xemhoadon';
import danhsachketquachuyenkhoa from '../components/main/kham/danhsachketquachuyenkhoa';
import chitietchuyenkhoa from '../components/main/kham/chitietchuyenkhoa';
import taodonthuoc from '../components/main/kham/taodonthuoc';
import phongduocsi from '../components/main/phongduocsi/phongduocsi';
import xemdonthuoc from '../components/main/phongduocsi/xemdonthuoc';
import sobanthuoc from '../components/main/sobanthuoc/sobanthuoc';
import addpatients from '../components/main/patient/addpatients';
import login from '../components/main/login/login';
import loginpage from '../components/main/login/pagelogin';
import { SecureRouteAdmin } from './secureRoute'
import { AppRoute } from './AppRoute';
import thongtincanhan from '../components/main/thongtincanhan/thongtincanhan';
class router extends Component {
    render() {
        return (
            <div>

                <SecureRouteAdmin exact path="/" component={home} layout={Admin}/>
                <SecureRouteAdmin exact path="/listusers" component={user} layout={Admin}/>
                <SecureRouteAdmin exact path="/addusers" component={addusers} layout={Admin}/>
                <SecureRouteAdmin exact path="/editusers/:id" component={editusers} layout={Admin}/>

                
                <SecureRouteAdmin exact path="/listdepartments" component={listdepartments} layout={Admin}/>
                <SecureRouteAdmin exact path="/adddepartments" component={adddepartments} layout={Admin}/>
                <SecureRouteAdmin exact path="/editdepartments/:id" component={editdepartments} layout={Admin}/>
                <SecureRouteAdmin exact path="/listpatients" component={listpatients} layout={Admin}/>
                <SecureRouteAdmin exact path="/editpatients/:id" component={editpatients} layout={Admin}/>
                <SecureRouteAdmin exact path="/addpatients" component={addpatients} layout={Admin}/>
                <SecureRouteAdmin exact path="/home" component={home} layout={Admin}/>
                <SecureRouteAdmin exact path="/register_medical/:id" component={register_medical} layout={Admin}/>
                <SecureRouteAdmin exact path="/doctor_listdepartments" component={doctor_listdepartments} layout={Admin}/>

                <SecureRouteAdmin exact path="/listservices" component={listservices} layout={Admin}/>
                <SecureRouteAdmin exact path="/addservices" component={addservices} layout={Admin}/>
                <SecureRouteAdmin exact path="/editservices/:id" component={editservices} layout={Admin}/>


                <SecureRouteAdmin exact path="/doctor_listdepartments/:id" component={kham} layout={Admin}/>
                <SecureRouteAdmin exact path="/khamdakhoa/:id" component={khamdakhoa} layout={Admin}/>
                <SecureRouteAdmin exact path="/khamchuyenkhoa/:id" component={khamchuyenkhoa} layout={Admin}/>
                <SecureRouteAdmin exact path="/dangkikhamchuyenkhoa/:id" component={dangkikhamchuyenkhoa} layout={Admin}/>
                <SecureRouteAdmin exact path="/dangkidichvu/:id" component={dangkidichvu} layout={Admin}/>
                <SecureRouteAdmin exact path="/xemhoadon/:id" component={xemhoadon} layout={Admin}/>
                <SecureRouteAdmin exact path="/khamdakhoa/danhsachketquachuyenkhoa/:id" component={danhsachketquachuyenkhoa} layout={Admin}/>
                <SecureRouteAdmin exact path="/khamdakhoa/chitietchuyenkhoa/:id" component={chitietchuyenkhoa} layout={Admin}/>
                <SecureRouteAdmin exact path="/khamdakhoa/taodonthuoc/:id" component={taodonthuoc} layout={Admin}/>
                <SecureRouteAdmin exact path="/phongduocsi" component={phongduocsi} layout={Admin}/>
                <SecureRouteAdmin exact path="/phongduocsi/xemdonthuoc/:id" component={xemdonthuoc} layout={Admin}/>
                <SecureRouteAdmin exact path="/sobanthuoc" component={sobanthuoc} layout={Admin}/>
                <SecureRouteAdmin exact path="/thongtincanhan" component={thongtincanhan} layout={Admin}/>

                <AppRoute exact path="/login" component={login} layout={loginpage}/>
                {/* <SecureRouteAdmin exact path="/medical_records/:id" component={medical_records} layout={doctor_layout}/> */}


            </div>

        );
    }
}

export default router;