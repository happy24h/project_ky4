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
    viewBranch: '/detail-learn-branch/:id',
    detailCourse: '/detail-course/:id',
    detailEmployee: '/detail-employee/:id',
    orderModal: '/order-modal/:id',

    // System
    //schedule
    manageSchedule: 'system/manage-schedule',
    addSchedule: 'system/manage-schedule/add',
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

    // branch
    manageBranch: 'system/manage-branch',
    addBranch: 'system/manage-branch/add',
    detailBranch: 'system/manage-branch/detail/:id',
    editBranch: 'system/manage-branch/edit/:id',

    // booking
    manageBooking: 'system/manage-booking',
    addBooking: 'system/manage-booking/add',
    editBooking: 'system/manage-booking/edit/:id',

    //Service
    manageService: '',
    addService: 'system/manage-service/add',
    detailService: 'system/manage-service/detail/:id',
    editService: 'system/manage-service/edit/:id',


    //Type Service
    manageTypeService: 'system/manage-type-service',
    addTypeService: 'system/manage-type-service/add',
    detailTypeService: 'system/manage-type-service/detail/:id',
    editTypeService: 'system/manage-type-service/edit/:id',

    //Order
    manageOrder: '/system/manage-order',
    detailOrder: '/system/manage-order/detail/:id',


    //Dashboard

    manageDashBoardSerivce:"system/manage-dash-board-service",
    manageDashBoardBooking:"system/manage-dash-board-booking",
    manageDashBoardOrder:"system/manage-dash-board-order",
    manageTable:'system/manage-table-system',

};

export default routes;
