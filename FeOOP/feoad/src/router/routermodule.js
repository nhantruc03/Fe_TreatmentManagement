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
import xemhoso from '../components/main/khambenh/xemhoso';
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
import { SecureRouteDoctor } from './secureRouteDoctor'
import { SecureRoutePharmacist } from './secureRoutePharmacist'
import { SecureRouteStaff } from './secureRouteStaff'
import { AppRoute } from './AppRoute';
import thongtincanhan from '../components/main/thongtincanhan/thongtincanhan';
import taodonthuoctudo from '../components/main/phongduocsi/taodonthuoctudo';
import loginfail from '../components/loginfail';
import donthuoc from '../components/main/khambenh/donthuoc';
import chitietdonthuoc from '../components/main/khambenh/chitietdonthuoc';
import trangchu from '../components/main/home/trangchu';
import listdanhmucthuoc from '../components/main/danhmucthuoc/listmedicinecategories';
import themdanhmucthuoc from '../components/main/danhmucthuoc/addmedicinecategories';
import suadanhmucthuoc from '../components/main/danhmucthuoc/editmedicinecategories';
import listmedicines from '../components/main/thuoc/listmedicines';
import addmedicines from '../components/main/thuoc/addmedicines';
import editmedicines from '../components/main/thuoc/editmedicines';
import listprescriptionbills from '../components/main/hoadonthuoc/listprescriptionbills';
import chitiethoadonthuoc from '../components/main/hoadonthuoc/chitiethoadonthuoc';
import danhsachbenhnhan from '../components/main/hosokhambenh/danhsachbenhnhan';
import danhsachhosokhambenh from '../components/main/hosokhambenh/danhsachhosokhambenh';
import listfalcuties from '../components/main/khoa/listfaculties';
import addfalcuties from '../components/main/khoa/addfaculties';
import editfaculties from '../components/main/khoa/editfaculties';
import hoadonkham from '../components/main/hoadonkhambenh/listhoadonkhambenh';
import Danhsachbenhnhan from '../components/main/kham/danhsachbenhnhan';
class router extends Component {
    render() {
        return (
            <div>

                <SecureRouteStaff exact path="/trangchu" component={trangchu} layout={Admin} />

                <SecureRouteStaff exact path="/" component={trangchu} layout={Admin} />

                <SecureRouteStaff exact path="/hoadonkham" component={hoadonkham} layout={Admin} />

                <SecureRouteAdmin exact path="/listusers" component={user} layout={Admin} />
                <SecureRouteAdmin exact path="/addusers" component={addusers} layout={Admin} />
                <SecureRouteAdmin exact path="/editusers/:id" component={editusers} layout={Admin} />


                <SecureRouteAdmin exact path="/listdepartments" component={listdepartments} layout={Admin} />
                <SecureRouteAdmin exact path="/adddepartments" component={adddepartments} layout={Admin} />
                <SecureRouteAdmin exact path="/editdepartments/:id" component={editdepartments} layout={Admin} />

                <SecureRouteAdmin exact path="/listfalcuties" component={listfalcuties} layout={Admin} />
                <SecureRouteAdmin exact path="/addfaculties" component={addfalcuties} layout={Admin} />
                <SecureRouteAdmin exact path="/editfaculties/:id" component={editfaculties} layout={Admin} />



                <SecureRouteAdmin exact path="/listpatients" component={listpatients} layout={Admin} />
                <SecureRouteAdmin exact path="/editpatients/:id" component={editpatients} layout={Admin} />
                <SecureRouteAdmin exact path="/addpatients" component={addpatients} layout={Admin} />
                <SecureRouteStaff exact path="/home" component={home} layout={Admin} />
                <SecureRouteStaff exact path="/register_medical/:id" component={register_medical} layout={Admin} />
                <SecureRouteDoctor exact path="/doctor_listdepartments" component={doctor_listdepartments} layout={Admin} />
                <SecureRouteDoctor exact path="/departments-queue/:id" component={Danhsachbenhnhan} layout={Admin} />

                <SecureRouteAdmin exact path="/listservices" component={listservices} layout={Admin} />
                <SecureRouteAdmin exact path="/addservices" component={addservices} layout={Admin} />
                <SecureRouteAdmin exact path="/editservices/:id" component={editservices} layout={Admin} />

                <SecureRoutePharmacist exact path="/listmedicinecategories" component={listdanhmucthuoc} layout={Admin} />
                <SecureRoutePharmacist exact path="/addmedicinecategories" component={themdanhmucthuoc} layout={Admin} />
                <SecureRoutePharmacist exact path="/editmedicine-categories/:id" component={suadanhmucthuoc} layout={Admin} />

                <SecureRoutePharmacist exact path="/listmedicines" component={listmedicines} layout={Admin} />
                <SecureRoutePharmacist exact path="/addmedicines" component={addmedicines} layout={Admin} />
                <SecureRoutePharmacist exact path="/editmedicines/:id" component={editmedicines} layout={Admin} />
                
                <SecureRoutePharmacist exact path="/hoadonthuoc" component={listprescriptionbills} layout={Admin} />


                <SecureRouteDoctor exact path="/doctor_listdepartments/:id" component={kham} layout={Admin} />
                <SecureRouteDoctor exact path="/xemhoso/:id" component={xemhoso} layout={Admin} />
                <SecureRouteDoctor exact path="/khamchuyenkhoa/:id" component={khamchuyenkhoa} layout={Admin} />
                <SecureRouteStaff exact path="/dangkikhamchuyenkhoa/:id" component={dangkikhamchuyenkhoa} layout={Admin} />
                <SecureRouteStaff exact path="/dangkidichvu/:id" component={dangkidichvu} layout={Admin} />
                <SecureRouteStaff exact path="/xemhoadon/:id" component={xemhoadon} layout={Admin} />
                <SecureRouteDoctor exact path="/khamdakhoa/danhsachketquachuyenkhoa/:id" component={danhsachketquachuyenkhoa} layout={Admin} />
                <SecureRouteDoctor exact path="/khamdakhoa/chitietchuyenkhoa/:id" component={chitietchuyenkhoa} layout={Admin} />
                <SecureRouteDoctor exact path="/khamdakhoa/taodonthuoc/:id" component={taodonthuoc} layout={Admin} />
                <SecureRouteDoctor exact path="/khamchuyenkhoa/taodonthuoc/:id" component={taodonthuoc} layout={Admin} />
                <SecureRoutePharmacist exact path="/phongduocsi" component={phongduocsi} layout={Admin} />
                <SecureRoutePharmacist exact path="/phongduocsi/xemdonthuoc/:id" component={xemdonthuoc} layout={Admin} />
                <SecureRoutePharmacist exact path="/sobanthuoc" component={sobanthuoc} layout={Admin} />
                <SecureRouteStaff exact path="/thongtincanhan" component={thongtincanhan} layout={Admin} />
                <SecureRoutePharmacist exact path="/taodonthuoctudo" component={taodonthuoctudo} layout={Admin} />
                <SecureRoutePharmacist exact path="/xemdonthuoc/:id" component={donthuoc} layout={Admin} />
                <SecureRouteDoctor exact path="/xemdonthuocbs/:id" component={donthuoc} layout={Admin} />
                <SecureRouteDoctor exact path="/xemdonthuocbs/chitietdonthuoc/:id" component={chitietdonthuoc} layout={Admin} />
                <SecureRoutePharmacist exact path="/xemdonthuoc/chitietdonthuoc/:id" component={chitietdonthuoc} layout={Admin} />
                <SecureRoutePharmacist exact path="/xemhoadonthuoc/chitiethoadonthuoc/:id" component={chitiethoadonthuoc} layout={Admin} />

                <SecureRouteDoctor exact path="/danhsachbenhnhan" component={danhsachbenhnhan} layout={Admin} />
                <SecureRouteDoctor exact path="/danhsachhosokhambenh/:id" component={danhsachhosokhambenh} layout={Admin} />
                <SecureRouteDoctor exact path="/danhsachchitietkhambenh/:id" component={danhsachketquachuyenkhoa} layout={Admin} />

                <AppRoute exact path="/login" component={login} layout={loginpage} />
                <AppRoute exact path="/khongcoquyen" component={loginfail} layout={Admin} />
                {/* <SecureRouteAdmin exact path="/medical_records/:id" component={medical_records} layout={doctor_layout}/> */}


            </div>

        );
    }
}

export default router;