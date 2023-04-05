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
};

export default ApiConfig;
