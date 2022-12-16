import axios from '~/utils/axios';

export const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
};

// get user manage
export const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

// create user manage
export const createNewUserService = (data) => {
    console.log('check data from service: ', data);
    return axios.post('/api/create-new-user', data);
};

// delete user manage
export const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        },
    });
};

// edit user manage
export const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
};

// Detail course
export const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

// Detail course province || time
export const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

// Detail websites
export const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

// Detail teacher
export const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

// Detail teacher by date
export const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

// Info about teachers
export const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

// profile teacher
export const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

export const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);
};

// schedule all teacher
export const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
};

// save time schedule teacher
export const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};

// save new classroom
export const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data);
};

// save new specialty
export const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
};

export const getAllClinic = () => {
    return axios.get(`/api/get-clinic`);
};

export const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`);
};

// save info teacher
export const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data);
};
