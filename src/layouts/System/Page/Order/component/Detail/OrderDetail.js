import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, List, Tag } from 'antd';
import { getDetailOrder, updateStatusOrder } from '~/redux/order/apiOrder';
import classNames from 'classnames/bind';
import styles from './DetailOrder.module.scss';
import { getDetailBooking } from '~/redux/booking/apiBooking';
import axios from 'axios';
const cx = classNames.bind(styles);
const { Meta } = Card;

function OrderDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const orderDetail = useSelector((state) => state.orderDetail.orderDetail?.orderDetailCurrent);
    const bookingDetail = useSelector((state) => state.booking.booking?.detailData);
    const [statusOrderDetailChange, setStatusOrderDetailChange] = useState();
    console.log('check status', statusOrderDetailChange);

    console.log(' check order.....', orderDetail);
    console.log(' check booking Detail.....', bookingDetail);
    console.log(' check booking status.....', orderDetail[0]?.order.status);
    const dataStatus = orderDetail.length > 0 && orderDetail[0]?.order.status ? orderDetail[0]?.order.status : 1;

    useEffect(() => {
        setStatusOrderDetailChange(orderDetail[0]?.order.status);
        const fetchApi = async () => {
            // await getDetailOrder(id, dispatch, user?.accessToken);

            const res = await axios.get('http://localhost:8078/api/v1/order/' + id);
            console.log('check res', res);

            await getDetailBooking(res.data[0]?.booking_id, dispatch);
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id || statusOrderDetailChange || dataStatus]);

    const handleChangeStatus = (e) => {
        if (e.target.value !== '') {
            if (window.confirm('Bạn có chắc muốn thay đổi trạng thái?')) {
                updateStatusOrder(id, e.target.value, dispatch, user?.accessToken);
                setStatusOrderDetailChange(e.target.value);
            }
        }
    };

    const checkOrderStatus = () => {
        switch (statusOrderDetailChange) {
            case 2:
                return <Tag color="blue">Đã thanh toán</Tag>;
            case 1:
                return <Tag color="success">Đã đặt</Tag>;
            case 0:
                return <Tag color="volcano">Chưa Đặt</Tag>;
            case -1:
                return <Tag color="red">Đã hủy</Tag>;
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
                {' '}
                {/*<Card*/}
                {/*    hoverable*/}
                {/*    style={{*/}
                {/*        width: 240,*/}
                {/*    }}*/}
                {/*    title="Avatar"*/}
                {/*>*/}
                {/*    <div*/}
                {/*        className={cx('detail-image')}*/}
                {/*        style={{ backgroundImage: `url(${detailBranch?.thumbnail})` }}*/}
                {/*    ></div>*/}
                {/*    <Meta title="Sắp đến tết" description="www.instagram.com" />*/}
                {/*</Card>*/}
                <Card
                    title="Profile"
                    size="default"
                    // extra={
                    //     <Link to={`/system/manage-order/edit/${id}`}>
                    //         <Button type="primary" style={{ background: '#fcaf17' }}>
                    //             {' '}
                    //             <EditOutlined />
                    //             Edit Branch
                    //         </Button>
                    //     </Link>
                    // }
                    style={{ width: 800 }}
                >
                    <List className={cx('list-detail')}>
                        <strong>Id Đơn hàng:</strong> <span className={cx('text-detail')}>{id}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Khách hàng:</strong>{' '}
                        <span className={cx('text-detail')}>{orderDetail[0]?.order?.customer?.name}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Mã đặt lịch:</strong>{' '}
                        <span className={cx('text-detail')}>{orderDetail[0]?.order.booking_id}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Ngày đặt:</strong>{' '}
                        <span className={cx('text-detail')}>{bookingDetail?.date_booking}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Khung giờ:</strong>{' '}
                        <span className={cx('text-detail')}>{bookingDetail?.time_booking}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Trạng thái:</strong>{' '}
                        {/* <span className={cx('text-detail')}>{statusOrderDetailChange} ...</span> */}
                        <span>
                            <select
                                style={{
                                    display: user.roles.map((item) =>
                                        item === 'ADMIN' || 'CUSTOMER_CARE' ? '' : 'none',
                                    ),
                                }}
                                value={statusOrderDetailChange}
                                onChange={handleChangeStatus}
                            >
                                {/* <option value={statusOrderDetailChange}>{checkOrderStatus()}</option> */}

                                <option value="2">Đã thanh toán</option>
                                <option value="1">Đã đặt</option>

                                <option value="-1">Hủy</option>
                            </select>
                        </span>
                    </List>
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                        </tr>
                        {orderDetail &&
                            orderDetail.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.serviceModel.id}</td>
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
