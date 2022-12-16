import { useState, useEffect } from 'react';
import _ from 'lodash';
import * as axios from '~/services/adminService';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { fetchGenderStart } from '~/store/actions/adminActions';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Modal.scss';
// import ProfileTeacher from '../../Course/ProfileTeacher';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function Modal({ setModal, dataTime }, props) {
    const [state, setState] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        birthday: '',
        selectedGender: '',
        doctorId: '',
        genders: '',
        timeType: '',
        isShowLoading: false,
    });

    const buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = item.valueVi;
                object.value = item.keyMap;
                return result.push(object);
            });
        }
        return result;
    };

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            genders: buildDataGender(props.genders),
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setModal]);

    let dataGenders = [
        { gender: 'Nam', key: 'M' },
        { gender: 'Nữ', key: 'F' },
        { gender: 'Khác', key: 'O' },
    ];

    console.log('hello viet anh state la : ', state);

    const handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...state }; // {}: object, ... copy lai ten bien can copy
        stateCopy[id] = valueInput; // stateCopy: state.tên cái biến muốn lấy. key có giá trị = giá trị truyền vào valueInput
        setState({
            ...stateCopy,
        });
    };

    const buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueVi;

            let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY');

            return `${time} - ${date}`;
        }
        return '';
    };

    const buildDoctorName = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
            return name;
        }
        return '';
    };

    const handleConfirmBooking = async () => {
        let date = new Date(state.birthday).getTime();
        let language = 'vi';

        console.log('date ----:', date);
        let timeString = buildTimeBooking(dataTime);
        let doctorName = buildDoctorName(dataTime);

        let doctorId = dataTime.doctorId;
        let timeType = dataTime.timeType;
        setState((prev) => ({
            ...prev,
            doctorId: doctorId,
            timeType: timeType,
            isShowLoading: true,
        }));

        let res = await axios.postPatientBookAppointment({
            fullName: state.fullName,
            phoneNumber: state.phoneNumber,
            email: state.email,
            address: state.address,
            reason: state.reason,
            date: dataTime.date,
            birthday: date,
            selectedGender: state.genders,
            doctorId: doctorId,
            timeType: timeType,
            language: language,
            timeString: timeString,
            doctorName: doctorName,
        });

        setState((prev) => ({
            ...prev,
            isShowLoading: false,
        }));

        if (res && res.errCode === 0) {
            toast.success('Đặt lịch hẹn mới thành công !');
            setModal(false);
        } else {
            toast.error('Vui lòng nhập đầy đủ thông tin !');
        }
    };

    return (
        <div className="modal ">
            {state.isShowLoading && (
                <div className="modal-loading">
                    <FontAwesomeIcon className="loading" icon={faSpinner} />
                </div>
            )}

            <div className="modal__inner">
                <div className="modal__header">
                    <p>Thông tin đặt lịch khóa học</p>
                    <span onClick={() => setModal(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </div>
                <div className="modal__body">
                    <div className="info-teacher">
                        {/* <ProfileTeacher 
                        /> */}
                    </div>
                    <form className="row">
                        <div className="col l-6 c-6 form-group">
                            <label>Họ và tên</label>
                            <input
                                type="text"
                                value={state.fullName}
                                className="form-control"
                                onChange={(event) => handleOnchangeInput(event, 'fullName')}
                            />
                        </div>
                        <div className="col l-6 c-6 form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.phoneNumber}
                                onChange={(event) => handleOnchangeInput(event, 'phoneNumber')}
                            />
                        </div>
                        <div className="col l-6 c-6 form-group">
                            <label>Địa chỉ email</label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.email}
                                onChange={(event) => handleOnchangeInput(event, 'email')}
                            />
                        </div>
                        <div className="col l-6 c-6 form-group">
                            <label>Địa chỉ liên lạc</label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.address}
                                onChange={(event) => handleOnchangeInput(event, 'address')}
                            />
                        </div>
                        <div className="col l-6 c-6 form-group">
                            <label>Ngày sinh</label>
                            <input
                                type="date"
                                className="form-control"
                                value={state.birthday}
                                onChange={(event) => handleOnchangeInput(event, 'birthday')}
                                required
                            />
                        </div>
                        <div className="col l-6 c-6 form-group">
                            <label>Giới tính</label>

                            <select
                                className="form-control"
                                onChange={(event) => handleOnchangeInput(event, 'selectedGender')}
                            >
                                <option value="">Choose...</option>
                                {dataGenders.map((item, index) => (
                                    <option key={index} value={item.key}>
                                        {item.gender}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col c-12 l-12 form-group">
                            <label>Ghi chú</label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.reason}
                                onChange={(event) => handleOnchangeInput(event, 'reason')}
                            />
                        </div>
                    </form>
                </div>
                <div className="modal__footer">
                    <button onClick={() => handleConfirmBooking()}>Xác nhận</button>
                    <button className="cancel" onClick={() => setModal(false)}>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenders: (actions) => dispatch(fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
