import { useState, useEffect } from 'react';
import { Row, Tag, Checkbox, Button } from 'antd';
import NumberFormat from 'react-number-format';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOder, createOderDetail } from '~/redux/order/apiOrder';
import { getAllService } from '~/redux/service/apiService';
// import moment from 'moment';

function OrderModal() {
    const [state, setState] = useState({
        name_booking: '',
        phone: '',
        email: '',

        service: '',
        isShowLoading: false,
    });
    const [dataPrice, setDataPrice] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dataCreateOrder = useSelector((state) => state.order.order?.createData);
    const listService = useSelector((state) => state.service.service?.serviceCurrent);

    useEffect(() => {
        getAllService();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //B3: Lấy danh sách

    const values = {
        booking_id: 'HN21',
        customer_id: '1',
        email: state?.email,
        phone: state?.phone,
        name_booking: state?.name_booking,
        voucher_id: '',
    };

    console.log('hello viet anh state la : ', state);

    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    console.log('check state modal', state);

    const handleCheckbox = (item) => {
        // alert('service_id = ' + item.service_id + ' and price = ' + item.price);
        setDataPrice((prev) => {
            return [...prev, { service_id: item.service_id, unit_price: item.price }];
        });
    };
    console.log('check box', dataPrice);

    const handleConfirmBooking = async () => {
        await createOder(values, dispatch, user?.accessToken);
        console.log('test create', dataCreateOrder.id);
        const dataService = {
            order_id: +dataCreateOrder.id,
            orderDetails: [...dataPrice],
        };
        await createOderDetail(dataService, dispatch, user?.accessToken);
    };
    const handleClose = () => {
        navigate('/');
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
                    <p>Thông tin của khách hàng</p>
                    <span onClick={() => handleClose(false)}>
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
                                name="name_booking"
                                value={state.name_booking}
                                className="form-control"
                                onChange={handleOnchangeInput}
                            />
                        </div>
                        <div className="col l-6 c-6 form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                value={state.phone}
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
                            <label>Dịch vụ</label>

                            <select className="form-control" name="service" onChange={handleOnchangeInput}>
                                <option value="">Choose...</option>

                                <option value="">hello</option>
                            </select>
                        </div>
                    </form>
                    {/* <div> */}
                    <strong style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 5 }}>Chọn dịch vụ</strong>
                    {/* </div> */}
                    {listService?.content.map((item, index) => {
                        return (
                            <Row key={index} className="row-todo" justify="space-between">
                                <Checkbox className="checkbox-row" onChange={() => handleCheckbox(item)}>
                                    <div className="checkbox-todo">
                                        <span>{item.service_name}</span>
                                        <span className="checkbox-todo-price">
                                            {' '}
                                            <NumberFormat
                                                value={item.price}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' VND'}
                                            />{' '}
                                        </span>
                                    </div>
                                </Checkbox>
                            </Row>
                        );
                    })}
                </div>
                <div className="modal__footer">
                    <button onClick={() => handleConfirmBooking()}>Xác nhận</button>
                    <button className="cancel" onClick={() => handleClose(false)}>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderModal;
