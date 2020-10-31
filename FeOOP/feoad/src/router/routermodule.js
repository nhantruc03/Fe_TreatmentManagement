import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
// import Listproducts from '../components/areaadmin/product/listproducts'
// import Addproducts from '../components/areaadmin/product/addproducts'
// import Editproducts from '../components/areaadmin/product/editproducts'
// import Listcategories from '../components/areaadmin/categories/listcategories'
// import Editcategories from '../components/areaadmin/categories/editcategories'
// import Addcategories from '../components/areaadmin/categories/addcategories'
// import Listbanners from '../components/areaadmin/banner/listbanner'
// import Addbanners from '../components/areaadmin/banner/addbanners'
// import Editbanners from '../components/areaadmin/banner/editbanner'
// import Listcategorycontents from '../components/areaadmin/categorycontents/listcategorycontents'
// import Addcategorycontents from '../components/areaadmin/categorycontents/addcategorycontents'
// import Editcategorycontents from '../components/areaadmin/categorycontents/editcategorycontents'
// import Listnewscategories from '../components/areaadmin/newscategories/listnewscategories'
// import Addnewscategories from '../components/areaadmin/newscategories/addnewscategories'
// import Editnewscategories from '../components/areaadmin/newscategories/editnewscategories'
// import Listnews from '../components/areaadmin/news/listnews'
// import Addnews from '../components/areaadmin/news/addnews'
// import Editnews from '../components/areaadmin/news/editnews'
// import Listuser from '../components/areaadmin/users/listusers'
// import Addusers from '../components/areaadmin/users/addusers'
// import Editusers from '../components/areaadmin/users/editusers'
// import Order from '../components/areaadmin/order/listorders'
// import OrderDetails from '../components/areaadmin/order/orderdetails'
// import { SecureRouteAdmin } from '../router/secureRoute'
// import { AppRoute } from './AppRoute';

// import Client from '../components/areaclient/page';
// import Admin from '../components/areaadmin/page';
// import Home from '../components/areaclient/home/home';
// import Contact from '../components/areaclient/contact/contact';
// import Productdetails from '../components/areaclient/productdetails/productdetails';
// import Shop from '../components/areaclient/shop/shop';
import Admin from '../components/main/page';
import addusers from '../components/main/user/addusers';
import user from '../components/main/user/listusers';
import { AppRoute } from './AppRoute';
class router extends Component {
    render() {
        return (
            <div>
                {/* <SecureRouteAdmin exact path="/admin/listproducts" component={Listproducts} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/addproducts" component={Addproducts} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/editproducts/:id" component={Editproducts} layout={Admin}/>

                <SecureRouteAdmin exact path="/admin/listcategories" component={Listcategories} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/editcategories/:id" component={Editcategories} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/addcategories" component={Addcategories} layout={Admin}/>

                <SecureRouteAdmin exact path="/admin/listbanners" component={Listbanners} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/editbanners/:id" component={Editbanners} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/addbanners" component={Addbanners} layout={Admin}/>

                <SecureRouteAdmin exact path="/admin/listcategorycontents" component={Listcategorycontents} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/editcategorycontents/:id" component={Editcategorycontents} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/addcategorycontents" component={Addcategorycontents} layout={Admin}/>

                <SecureRouteAdmin exact path="/admin/listnewscategories" component={Listnewscategories} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/editnewscategories/:id" component={Editnewscategories} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/addnewscategories" component={Addnewscategories} layout={Admin}/>

                <SecureRouteAdmin exact path="/admin/listnews" component={Listnews} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/editnews/:id" component={Editnews} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/addnews" component={Addnews} layout={Admin}/>

                <SecureRouteAdmin exact path="/admin/listusers" component={Listuser} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/editusers/:id" component={Editusers} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/addusers" component={Addusers} layout={Admin}/>

                <SecureRouteAdmin exact path="/admin/orders/:id" component={OrderDetails} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin/listorders" component={Order} layout={Admin}/>
                <SecureRouteAdmin exact path="/admin" component={Listproducts} layout={Admin}/>

                <AppRoute exact path="/" component={Home} layout={Client} />
                <AppRoute exact path="/contact" component={Contact} layout={Client} />
                <AppRoute exact path="/product-details/:meta.:id" component={Productdetails} layout={Client} />
                <AppRoute exact path="/shop" component={Shop} layout={Client} /> */}

                <AppRoute exact path="/" component={user} layout={Admin}/>
                <AppRoute exact path="/listusers" component={user} layout={Admin}/>
                <AppRoute exact path="/addusers" component={addusers} layout={Admin}/>
            </div>

        );
    }
}

export default router;