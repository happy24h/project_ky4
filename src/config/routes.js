const routes = {
    home: '/',
    service: '/service',
    learn: '/learn',
    login: '/login',
    register: '/register',
    library: '/library',
    blog: '/blog',
    contact: '/contact',
    hairStyle: '/hairStyle',
    detailWebsite: '/detail-learn-website/:id',
    detailCourse: '/detail-course/:id',
    detailTeacher: '/detail-teacher/:id',

    // System
    manageSchedule: 'system/manage-schedule',
    //Account
    manageUser: 'system/manage-user',
    addAccount: 'system/manage-user/add',
    editAccount: 'system/manage-user/edit/:id',
    detailAccount: 'system/manage-user/detail/:id',

    //FeedBack
    manageFeedback: 'system/manage-feedback',
    detailFeedback: 'system/manage-feedback/detail/:id',
};

export default routes;
