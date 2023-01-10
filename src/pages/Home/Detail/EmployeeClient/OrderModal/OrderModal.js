import { useState, useEffect } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import moment from 'moment';

function OrderModal({ setModal }, props) {
    const [state, setState] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',

        genders: '',
        isShowLoading: false,
    });

    useEffect(() => {
        setState((prev) => ({
            ...prev,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setModal]);

    console.log('hello viet anh state la : ', state);

    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    console.log('check state modal', state);

    const handleConfirmBooking = async () => {};

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
                                name="fullName"
                                value={state.fullName}
                                className="form-control"
                                onChange={handleOnchangeInput}
                            />
                        </div>
                        <div className="col l-6 c-6 form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                className="form-control"
                                value={state.phoneNumber}
                                onChange={handleOnchangeInput}
                            />
                        </div>
                        <div className="col l-6 c-6 form-group">
                            <label>Địa chỉ email</label>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                value={state.email}
                                onChange={handleOnchangeInput}
                            />
                        </div>
                        <div className="col l-6 c-6 form-group">
                            <label>Địa chỉ liên lạc</label>
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={state.address}
                                onChange={handleOnchangeInput}
                            />
                        </div>

                        <div className="col l-6 c-6 form-group">
                            <label>Giới tính</label>

                            <select className="form-control" name="selectedGender" onChange={handleOnchangeInput}>
                                <option value="">Choose...</option>

                                <option value="">hello</option>
                            </select>
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

export default OrderModal;
