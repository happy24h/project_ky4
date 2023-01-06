import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, List } from 'antd';
import { getDetailOrder } from '~/redux/order/apiOrder';
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

    useEffect(() => {
        getDetailOrder(id, dispatch, user?.accessToken);
        getDetailBooking(orderDetail[0]?.order.booking_id,dispatch)
    }, []);

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
                        <strong>Trạng thái:</strong> <span className={cx('text-detail')}>{orderDetail[0]?.order.status}</span>
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

                    {/*<List className={cx('list-detail')}>*/}
                    {/*    <strong>Trạng thái:</strong> <span className={cx('text-detail')}>{orderDetail?.serviceModel.name}</span>*/}
                    {/*</List>*/}
                </Card>
            </div>
        </>
    );
}
export default OrderDetail;