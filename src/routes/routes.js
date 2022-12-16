import config from '~/config';
import HeaderOnly from '~/layouts/HeaderOnly';

import Home from '~/pages/Home';
import Food from '~/pages/Food';
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
import TableUser from '~/layouts/System/Page/Manage/TableUser';
import ManageRedux from '~/layouts/System/Page/ManageRedux/TableUser';
import ScheduleTeacher from '~/layouts/System/Page/ScheduleTeacher';
import Classroom from '~/layouts/System/Page/Classroom';
import Specialty from '~/layouts/System/Page/Specialty';
import TeacherInfo from '~/layouts/System/Page/TeacherInfo';
import UserManage from '~/layouts/System/Page/UserManage';

const publicRouters = [
    { path: config.routes.home, component: Home },
    { path: config.routes.food, component: Food },
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
    { path: config.routes.TableUser, component: TableUser },
    { path: config.routes.manageRedux, component: ManageRedux },
    { path: config.routes.scheduleTeacher, component: ScheduleTeacher },
    { path: config.routes.classroom, component: Classroom },
    { path: config.routes.specialty, component: Specialty },
    { path: config.routes.teacherInfo, component: TeacherInfo },
    { path: config.routes.userManage, component: UserManage },
];

export { publicRouters, privateRoutes };
