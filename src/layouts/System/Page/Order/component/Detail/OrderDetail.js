import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, List, Tag } from 'antd';
import { getDetailOrder, updateStatusOrder } from '~/redux/order/apiOrder';
import classNames from 'classnames/bind';
import styles from './DetailOrder.module.scss';
import { getDetailBooking } from '~/redux/booking/apiBooking';
import axios from 'axios';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
const { Meta } = Card;

function OrderDetail() {
    const [stateApi, setStateApi] = useState([]);
    const [discount, setDiscount] = useState();
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    console.log('check ---', user.roles[0]);

    const orderDetail = useSelector((state) => state.orderDetail.orderDetail?.orderDetailCurrent);
    const bookingDetail = useSelector((state) => state.booking.booking?.detailData);
    const [statusOrderDetailChange, setStatusOrderDetailChange] = useState();
    console.log('check status', statusOrderDetailChange);
    console.log('check state api ---', stateApi);

    const dataStatus = orderDetail?.length > 0 ? orderDetail[0]?.order.status : 1;

    useEffect(() => {
        setStatusOrderDetailChange(dataStatus);
        const fetchApi = async () => {
            // await getDetailOrder(id, dispatch, user?.accessToken);
            try {
                const res = await axios.get(`http://localhost:8078/api/v1/order/${id} `, {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                });
                console.log('check res', res);
                setStateApi(res.data);
                await getDetailBooking(res.data[0]?.order.booking_id, dispatch);

                if (res.data[0].order?.voucher_id){
                    try {
                        const voucherCheck = await axios.get(`http://localhost:8078/api/v1/voucher/${res.data[0].order?.voucher_id}`, {
                            headers: { Authorization: `Bearer ${user?.accessToken}` },
                        });
                        setDiscount(voucherCheck.data.discount);
                    } catch (error){
                        toast.error(error.response.data.message);
                    }
                }

            } catch (error){
                toast.error(error.response.data.message);
            }
        };

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id || dataStatus || statusOrderDetailChange || stateApi]);

    const handleChangeStatus = (e) => {
        if (e.target.value !== '') {
            if (window.confirm('B???n c?? ch???c mu???n thay ?????i tr???ng th??i?')) {
                updateStatusOrder(id, e.target.value, dispatch, user?.accessToken);
                setStatusOrderDetailChange(e.target.value);
            }
        }
    };

    const checkOrderStatus = () => {
        switch (statusOrderDetailChange) {
            case 2:
                return <Tag color="blue">???? thanh to??n</Tag>;
            case 1:
                return <Tag color="success">???? ?????t</Tag>;
            case 0:
                return <Tag color="volcano">Ch??a ?????t</Tag>;
            case -1:
                return <Tag color="red">???? h???y</Tag>;
            default:
                return <Tag color="blue">{dataStatus}</Tag>;
        }
    };

    return (
        <>
            <Link to={'/system/manage-order'}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    {/* <EditOutlined /> */}
                    Back
                </Button>
            </Link>

            <div className={cx('wrapper')}>
                <Card title="Profile" size="default" style={{ width: 800 }}>
                    <List className={cx('list-detail')}>
                        <strong>Id ????n h??ng:</strong> <span className={cx('text-detail')}>{id}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Kh??ch h??ng:</strong>{' '}
                        <span className={cx('text-detail')}>
                            {stateApi?.length > 0 && stateApi[0]?.order?.customer?.name}
                        </span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>T???ng ti???n:</strong>{' '}
                        <span className={cx('text-detail')}>
                            {stateApi?.length > 0 && stateApi[0]?.order?.total_price}
                        </span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>M?? gi???m gi??:</strong>{' '}
                        <span className={cx('text-detail')}>
                            {stateApi?.length > 0 && stateApi[0]?.order?.voucher_id}
                        </span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>M???c gi???m gi??:</strong>{' '}
                        <span className={cx('text-detail')}>
                            {discount ? (discount * 100) +'%' : '' }
                        </span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>M?? ?????t l???ch:</strong>{' '}
                        <span className={cx('text-detail')}>
                            {stateApi?.length > 0 && stateApi[0]?.order.booking_id}
                        </span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Ng??y ?????t:</strong>{' '}
                        <span className={cx('text-detail')}>{bookingDetail?.date_booking}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Khung gi???:</strong>{' '}
                        <span className={cx('text-detail')}>{bookingDetail?.time_booking}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Tr???ng th??i:</strong>{' '}
                        {/* <span className={cx('text-detail')}>{statusOrderDetailChange} ...</span> */}
                        {user.roles[0] === 'CUSTOMER' ? (
                            <span className={cx('text-detail')}>???? ?????t</span>
                        ) : (
                            <span className={cx('text-detail')}>
                                <select value={statusOrderDetailChange} onChange={handleChangeStatus}>
                                    <option value="2">???? thanh to??n</option>
                                    <option value="1">???? ?????t</option>

                                    <option value="-1">H???y</option>
                                </select>
                            </span>
                        )}
                    </List>
                    {/* <table>
                        <tr>
                            <th>Id</th>
                            <th>T??n s???n ph???m</th>
                            <th>Gi??</th>
                        </tr>
                        {stateApi &&
                            stateApi.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.serviceModel.id}</td>
                                        <td>{item.serviceModel.name}</td>
                                        <td>{item.serviceModel.price}</td>
                                    </tr>
                                );
                            })}
                    </table> */}

                    <table className={cx('customers')}>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Price</th>
                        </tr>
                        {stateApi &&
                            stateApi.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.serviceModel.id}</td>
                                        <td
                                            className={cx('image-service')}
                                            style={{
                                                backgroundImage: `url(${item.serviceModel.thumbnail})`,
                                                width: 50,
                                                height: 50,
                                            }}
                                        ></td>
                                        <td>{item.serviceModel.name}</td>
                                        <td>{item.serviceModel.price}</td>
                                    </tr>
                                );
                            })}
                    </table>
                </Card>
            </div>
        </>
    );
}
export default OrderDetail;
