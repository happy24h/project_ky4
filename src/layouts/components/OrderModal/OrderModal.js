import { useState, useEffect } from 'react';
// import { Row, Tag, Checkbox, Button } from 'antd';
import NumberFormat from 'react-number-format';
import axios from 'axios';

import { faCartShopping, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOder, createOderDetail } from '~/redux/order/apiOrder';
import { getAllService } from '~/redux/service/apiService';
import classNames from 'classnames/bind';
import styles from './OrderModal.module.scss';
import { toast } from 'react-toastify';
import Loading from '../Loading';
const cx = classNames.bind(styles);
// import moment from 'moment';

function OrderModal() {
    const [state, setState] = useState({
        name_booking: '',
        phone: '',
        email: '',
        service: '',
        voucher: '',
        isShowLoading: false,
    });
    const [dataPrice, setDataPrice] = useState([]);
    const [modalItem, setModalItem] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    // var dataCreateOrder = useSelector((state) => state.order.order?.createData);
    const listService = useSelector((state) => state.service.service?.serviceCurrent);
    const dataCreateOrderDetail = useSelector((state) => state.orderDetail.orderDetail?.isFetching);
    const dataCreateOrder = useSelector((state) => state.order.order?.isFetching);

    // console.log(' check boolean', dataCreateOrderDetail);
    // console.log(' check order', dataCreateOrder);
    let subTotal = 0;
    dataPrice.forEach((item) => (subTotal += item.unit_price));

    // console.log('---+++', subTotal);

    useEffect(() => {
        getAllService();
        setState({ ...user });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);
    // console.log('check state modal', state);

    //B3: Lấy danh sách

    const values = {
        booking_id: id,
        customer_id: user?.id ? state?.id : '1',
        name_booking: state?.username,
        email: state?.email,
        phone: state?.phone,
        voucher_id: state?.voucher ? state?.voucher : '',
    };
    // console.log('check value ...', values);

    // console.log('hello viet anh state la : ', state);

    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    console.log('check state modal', state);

    const handleSelectService = (item) => {
        setDataPrice((prev) => {
            return [...prev, { service_id: item.service_id, unit_price: item.price }];
        });
        toast.success('Thêm dịch vụ thành công !');
    };
    // console.log('check box', dataPrice);
    // console.log('test create 2', dataCreateOrder.id);

    const handleConfirmBooking = async () => {
        // await createOder(values, dispatch, user?.accessToken);
        // console.log('test create', dataCreateOrder.id);

        // console.log('check value 2...', values);

        // const res = await axios
        //     .post('http://localhost:8078/api/v1/order/create', values)
        //     .then(function (response) {
        //         return response.data;
        //     })
        //     .catch(function (error) {
        //         console.log('----->', error.response.status);
        //         return error.response.status;
        //     });

        try {
            const res = await axios.post('http://localhost:8078/api/v1/order/create', values);
            try {
                const dataService = {
                    order_id: res?.id,
                    orderDetails: [...dataPrice],
                };
                await createOderDetail(dataService, dispatch, user?.accessToken);
                setDataPrice([]);
                navigate('/');
            } catch (error){
                toast.error(error.response.data);
            }
        } catch (error){
            toast.error(error.response.data);
        }

        // const dataService = {
        //     order_id: res?.id,
        //     orderDetails: [...dataPrice],
        // };
        // console.log('res check,', res);
        // alert(res);
        // if (res === 400 || res === 404) {
        //     toast.error('Vui lòng nhập đúng thông tin');
        // } else {
        //     await createOderDetail(dataService, dispatch, user?.accessToken);
        //     setDataPrice([]);
        //     navigate('/');
        // }
    };
    const handleClose = () => {
        navigate('/');
    };

    const handleDelete = (index) => {
        setDataPrice((state) => {
            const data = [...state];
            data.splice(index, 1);
            return data;
        });

        toast.success('Delete success');
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
                                value={state.username}
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
                            <label>Mã giảm giá</label>
                            <input
                                type="text"
                                name="voucher"
                                className="form-control"
                                value={state?.voucher}
                                onChange={handleOnchangeInput}
                            />
                        </div>
                    </form>

                    <div className={cx('select-service')}>
                        <strong style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 5 }}>Chọn dịch vụ</strong>
                        <div className={cx('wrapper-cart')}>
                            <FontAwesomeIcon
                                className={cx('cart-icon')}
                                icon={faCartShopping}
                                onClick={() => setModalItem(!modalItem)}
                            />
                            <span className={cx('notify-number')}>{dataPrice.length}</span>
                            {modalItem && (
                                <div className={cx('nav-list-item')}>
                                    <h4 className={cx('title-cart')}>Dịch vụ đã thêm</h4>

                                    {dataPrice.length === 0 && (
                                        <div
                                            style={{
                                                width: '300px',
                                                height: '150px',
                                                textAlign: 'center',
                                                marginTop: 50,
                                            }}
                                        >
                                            Chưa chọn sản phẩm
                                        </div>
                                    )}
                                    <div className={cx('wrapper-cart-item')}>
                                        {dataPrice &&
                                            dataPrice?.map((item, index) => {
                                                return (
                                                    <div key={index} className={cx('cart-item')}>
                                                        <span>Mã sản phẩm: {item.service_id}</span>
                                                        <span>
                                                            <NumberFormat
                                                                value={item.unit_price}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={' VND'}
                                                            />{' '}
                                                        </span>
                                                        <div onClick={handleDelete}>
                                                            {' '}
                                                            <FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} />
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        <div className={cx('total-cart')}>
                                            <div>Tổng:</div>{' '}
                                            <span>
                                                {
                                                    <NumberFormat
                                                        value={subTotal}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' VND'}
                                                    />
                                                }{' '}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="grid wide">
                            <div className="row">
                                {listService?.content.map((item, index) => {
                                    return (
                                        <div className="col l-3 m-4 c-6" key={index}>
                                            <div className={cx('item')}>
                                                <div
                                                    className={cx('item-image')}
                                                    style={{
                                                        backgroundImage: `url(${item.thumbnail})`,
                                                    }}
                                                >
                                                    {' '}
                                                </div>
                                                <span>{item.service_name}</span>
                                                <div>
                                                    <NumberFormat
                                                        value={item.price}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' VND'}
                                                    />{' '}
                                                </div>
                                                <div className={cx('wrapper-btn')}>
                                                    <button
                                                        className={cx('btn-buy')}
                                                        onClick={() => handleSelectService(item)}
                                                    >
                                                        Chọn
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal__footer">
                    <button onClick={() => handleConfirmBooking()}>Xác nhận</button>
                    <button className="cancel" onClick={() => handleClose(false)}>
                        Hủy
                    </button>
                </div>
            </div>
            {dataCreateOrder && <Loading />}
        </div>
    );
}

export default OrderModal;
