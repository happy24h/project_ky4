import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, List, Tag } from 'antd';
import { getDetailOrder, updateStatusOrder } from '~/redux/order/apiOrder';
import classNames from 'classnames/bind';
import styles from './DetailOrder.module.scss';
import { getDetailBooking } from '~/redux/booking/apiBooking';
const cx = classNames.bind(styles);
const { Meta } = Card;

function OrderDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const orderDetail = useSelector((state) => state.orderDetail.orderDetail?.orderDetailCurrent);
    const bookingDetail = useSelector((state) => state.booking.booking?.detailData);
    const [statusOrderDetailChange, setStatusOrderDetailChange] = useState(false);

    useEffect(() => {
        getDetailOrder(id, dispatch, user?.accessToken);
        getDetailBooking(orderDetail[0]?.order.booking_id,dispatch)
    }, []);

    const handleChangeStatus = (e) => {
        if(window.confirm('Bạn có chắc muốn thay đổi trạng thái?')){
            // changeStatusDetailFeedback(id,e.target.value, dispatch, user?.accessToken);
            updateStatusOrder(id,e.target.value,dispatch, user?.accessToken);
            setStatusOrderDetailChange(!statusOrderDetailChange);
        };
    }

    const checkOrderStatus = () =>{
        switch (orderDetail[0]?.order.status){
            case 2:
                return <Tag color="blue">Đã đến</Tag>;
            case 1:
                return <Tag color="success">Đã đặt</Tag>;
            case 0:
                return <Tag color="volcano">Chưa Đặt</Tag>;
            case -1:
                return <Tag color="red">Đã hủy</Tag>;
            default:
                return <Tag color="blue">{orderDetail[0]?.order.status}</Tag>;
        }
    }

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
                        <strong>Khách hàng:</strong> <span className={cx('text-detail')}>{orderDetail[0]?.order.customer.name}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Mã đặt lịch:</strong> <span className={cx('text-detail')}>{orderDetail[0]?.order.booking_id}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Ngày đặt:</strong> <span className={cx('text-detail')}>{bookingDetail?.date_booking}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Khung giờ:</strong> <span className={cx('text-detail')}>{bookingDetail?.time_booking}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Trạng thái:</strong> <span className={cx('text-detail')}>{checkOrderStatus()}</span>
                        <span>
                        <select value={orderDetail[0]?.order.status} onChange={handleChangeStatus}>
                        <option value="2">Đã đến</option>
                            {
                                (orderDetail[0]?.order.status === 2 || orderDetail[0]?.order.status === -1)
                                    ? ''
                                    : <option value="1">Đã đặt</option>
                            }
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
                        {
                            orderDetail && orderDetail.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.serviceModel.id}</td>
                                        <td>{item.serviceModel.name}</td>
                                        <td>{item.serviceModel.price}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </Card>
            </div>
        </>
    );
}
export default OrderDetail;