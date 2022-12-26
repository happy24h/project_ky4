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
    manageUser: 'system/manage-user',
    manageSchedule: 'system/manage-schedule',
    manageFeedback: 'system/manage-feedback',
    addAccount: 'system/manage-user/add',
    editAccount: 'system/manage-user/edit/:id',
};

export default routes;
