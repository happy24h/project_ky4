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

    modalEdit: 'system/manage-user/modal-edit/:id',

    detailAccount: 'system/manage-user/detail/:id',

    //FeedBack
    manageFeedback: 'system/manage-feedback',
    detailFeedback: 'system/manage-feedback/detail/:id',

    // blog
    manageBlog: 'system/manage-blog',
    createBlog: 'system/manage-blog/add',
    detailBlog: 'system/manage-blog/detail/:id',
    editBlog: 'system/manage-blog/edit/:id',

    //Service
    manageService: 'system/manage-service',
    addService: 'system/manage-service/add',
    detailService: 'system/manage-service/detail/:id',
};

export default routes;
