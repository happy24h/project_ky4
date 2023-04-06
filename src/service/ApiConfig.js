const baseUrl = 'http://localhost:8078/';

const ApiConfig = {
    register: `${baseUrl}api/v1/register`,
    loginUser: `${baseUrl}api/v1/login`,
    registerCustomer: `${baseUrl}api/v1/registerCustomer`,
    getAllAccount: `${baseUrl}api/v1/account/search`,
    getAllRoles: `${baseUrl}api/v1/account/role`,
    deleteAccount: `${baseUrl}api/v1/account/delete`,
    createAccountCustomer: `${baseUrl}api/v1/registerCustomer`,
    getDetailAccount: `${baseUrl}api/v1/account`,
    editDetailAccount: `${baseUrl}api/v1/account/update`,

    // service
    getAllService: `${baseUrl}api/v1/service/search`,
    getAllTypeService: `${baseUrl}api/v1/service/findAllTypeService`,
    createService: `${baseUrl}api/v1/service/create`,
    updateService: `${baseUrl}api/v1/service/update`,
    getDetailService: `${baseUrl}api/v1/service`,
    deleteService: `${baseUrl}api/v1/service/delete`,

    // branch
    getBranch: `${baseUrl}api/v1/branch/search`,
    createBranch: `${baseUrl}api/v1/branch/create`,
    deleteBranch: `${baseUrl}api/v1/branch/delete`,
    getDetailBranch: `${baseUrl}api/v1/branch`,
    editBranch: `${baseUrl}api/v1/branch/update`,

    // booking
    getBooking: `${baseUrl}api/v1/booking/search`,
    createBooking: `${baseUrl}api/v1/booking/create`,
    getDetailBooking: `${baseUrl}api/v1/booking`,
    getDetailBookingDate: `${baseUrl}api/v1/booking/findAllByEmployee_idAndDate_booking`,
    editBooking: `${baseUrl}api/v1/blog/update`,

    // api cloud
    uploadImage: `${baseUrl}api/v1/cloud/uploads`,

    // api order
    getAllOrder: `${baseUrl}api/v1/order/search`,
    createOder: `${baseUrl}api/v1/order/create`,
    createOderDetail: `${baseUrl}api/v1/order/createOrderDetail`,
    getDetailOrder: `${baseUrl}api/v1/order`,
    updateStatusOrder: `${baseUrl}api/v1/order/update/status`,
};

export default ApiConfig;
