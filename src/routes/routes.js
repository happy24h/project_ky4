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
    { path: config.routes.manageUser, component: ManageUser },
];

export { publicRouters, privateRoutes };
