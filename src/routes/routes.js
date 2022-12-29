import config from '~/config';
import HeaderOnly from '~/layouts/HeaderOnly';

import Home from '~/pages/Home';
import Service from '~/pages/Service';
import Learn from '~/pages/Learn';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Library from '~/pages/Library';
import Contact from '~/pages/Contact';
import HairStyle from '~/pages/HairStyle';
import Blog from '~/pages/Blog';
import DetailWebsite from '~/pages/Home/Detail/Website';
import DetailCourse from '~/pages/Home/Detail/Course';
import DetailTeacher from '~/pages/Home/Detail/Teacher/DetailTeacher';

// System
import ManageUser from '~/layouts/System/Page/ManageUser';
import ManageSchedule from '~/layouts/System/Page/ManageSchedule';
import ManageFeedback from '~/layouts/System/Page/Feedback';
import AddAccount from '~/layouts/System/Page/ManageUser/components/AddAccount';
import EditAccount from '~/layouts/System/Page/ManageUser/components/EditAccount';
import ModalEdit from '~/layouts/System/Page/ManageUser/components/EditAccount/ModalEdit';
import DetailAccount from '~/layouts/System/Page/ManageUser/components/DetailAccount/DetailAccount';
import DetailFeedback from '~/layouts/System/Page/Feedback/DetailFeedBack';
import ManageBlog from '~/layouts/System/Page/ManageBlog';
import CreateBlog from '~/layouts/System/Page/ManageBlog/CreateBlog';
import DetailBlog from '~/layouts/System/Page/ManageBlog/DetailBlog/DetailBlog';

const publicRouters = [
    { path: config.routes.home, component: Home },
    { path: config.routes.service, component: Service },
    { path: config.routes.library, component: Library },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.hairStyle, component: HairStyle },
    { path: config.routes.learn, component: Learn, changeLayout: HeaderOnly },
    { path: config.routes.detailWebsite, component: DetailWebsite, changeLayout: HeaderOnly },
    { path: config.routes.detailCourse, component: DetailCourse, changeLayout: HeaderOnly },
    { path: config.routes.detailTeacher, component: DetailTeacher, changeLayout: HeaderOnly },
    { path: config.routes.login, component: Login, changeLayout: null },
    { path: config.routes.register, component: Register, changeLayout: null },
];

const privateRoutes = [
    { path: config.routes.manageSchedule, component: ManageSchedule },
    //Account
    { path: config.routes.manageUser, component: ManageUser },
    { path: config.routes.addAccount, component: AddAccount },
    { path: config.routes.editAccount, component: EditAccount },
    { path: config.routes.modalEdit, component: ModalEdit },
    { path: config.routes.detailAccount, component: DetailAccount },
    //FeedBack
    { path: config.routes.manageFeedback, component: ManageFeedback },
    { path: config.routes.detailFeedback, component: DetailFeedback },
    // blog
    { path: config.routes.manageBlog, component: ManageBlog },
    { path: config.routes.createBlog, component: CreateBlog },
    { path: config.routes.detailBlog, component: DetailBlog },
];

export { publicRouters, privateRoutes };
