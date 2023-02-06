import { Card, List, Button } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import images from '~/assets/images';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetailAccount } from '~/redux/apiRequest';
import { EditOutlined } from '@ant-design/icons';

// import EditAccount from '../EditAccount';
import styles from './DetailAccount.module.scss';
import { getBooking } from '~/redux/booking/apiBooking';
const cx = classNames.bind(styles);
const { Meta } = Card;

function DetailAccount() {
    const [loadApi, setLoadApi] = useState(false);
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailAccount = useSelector((state) => state.account.account?.detailAccount);
    const listBooking = useSelector((state) => state.booking.booking?.listData);
    const today = '07-02-2023';

    useEffect(() => {
        getDetailAccount(id, dispatch, user?.accessToken);
    }, []);
    let dataBooking = {
        branch_id: '',
        employee_id: id,
        role: '3',
        date_booking: today,
        time_booking: '',
        start: '',
        end: '',
        limit: 4,
        page: 1,
        sort: 'asc',
    };

    useEffect(() => {
        getBooking(dataBooking, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleTimeBooking = (id) => {
        // navigate(`/order-modal/${id}`);
    };

    return (
        <>
            {user.isAdmin ? (
                <Link to={'/system/manage-user'}>
                    <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                        {/* <EditOutlined /> */}
                        Back
                    </Button>
                </Link>
            ) : (
                <Link to={'/'}>
                    <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                        {/* <EditOutlined /> */}
                        Back
                    </Button>
                </Link>
            )}

            <div className={cx('wrapper')}>
                {' '}
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                    title="Avatar"
                    // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <div
                        className={cx('detail-image')}
                        style={
                            detailAccount?.thumbnail && detailAccount?.thumbnail.length > 6
                                ? { backgroundImage: `url(${detailAccount?.thumbnail})` }
                                : { backgroundImage: `url(${images.noAvatar})` }
                        }
                    ></div>
                    <Meta title="Sắp đến tết" description="www.instagram.com" />
                </Card>
                <Card
                    title="Profile"
                    size="default"
                    extra={
                        <Link to={`/system/manage-user/modal-edit/${id}`}>
                            <Button type="primary" style={{ background: '#fcaf17' }}>
                                {' '}
                                <EditOutlined />
                                Edit User
                            </Button>
                        </Link>
                    }
                    style={{ width: 800 }}
                >
                    {/* <Divider orientation="left">Default Size</Divider> */}
                    <List className={cx('list-detail')}>
                        <strong>Full name:</strong> <span className={cx('text-detail')}>{detailAccount?.name}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Email:</strong> <span className={cx('text-detail')}>{detailAccount?.email}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Phone:</strong> <span className={cx('text-detail')}>{detailAccount?.phone}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Gender:</strong> <span className={cx('text-detail')}>{detailAccount?.gender}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Address:</strong> <span className={cx('text-detail')}>{detailAccount?.address}</span>
                    </List>
                </Card>
            </div>
            {listBooking?.content.map((item, index) => {
                return (
                    <div key={index} className={cx('wrapper-content')}>
                        <div className={cx('content-employee')}>
                            <div
                                className={cx('content-left')}
                                style={
                                    item.employee?.employee_thumbnail
                                        ? {
                                              backgroundImage: `url(${item.employee?.employee_thumbnail})`,
                                          }
                                        : {}
                                }
                            ></div>
                            <div className={cx('content-right')}>
                                <div className={cx('up')}>{item.employee?.employee_name}</div>
                                <div className="down">{item.employee?.employee_description}</div>
                            </div>
                        </div>
                        <Card
                            size="small"
                            title="Chọn ngày đặt lịch"
                            // extra={<DatePicker onChange={onChange} />}
                            style={{
                                minHeight: 170,
                                width: '100%',
                                marginLeft: 20,
                            }}
                        >
                            {/* <input value={employees_id} onChange={(e) => setState(e.target.value)} /> */}

                            <div className={cx('')}>
                                <div className="content-left">
                                    <div className="doctor-schedule-container" style={{ paddingLeft: '0px ' }}>
                                        <div className="grid wide">
                                            <div className="row">
                                                <div className="col l-12 m-12 c-12">
                                                    <div
                                                        style={
                                                            {
                                                                // width: '210px',
                                                                // display: 'flex',
                                                                // alignItems: 'center',
                                                                // justifyContent: 'space-between',
                                                                // marginBottom: 5,
                                                            }
                                                        }
                                                    >
                                                        <h3 style={{ fontSize: '20px' }}>Đặt lịch </h3>
                                                        <div>
                                                            Ngày: <span>{today}</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('wrapper-btn')}>
                                                        {item.employee.bookingByTime_bookings?.map((item, index) => {
                                                            let isStatus = item?.status === 1 ? true : false;

                                                            return (
                                                                <div
                                                                    key={index}
                                                                    style={{
                                                                        marginRight: '12px',
                                                                        marginBottom: '6px',
                                                                    }}
                                                                >
                                                                    <Button
                                                                        type="primary"
                                                                        className={cx('btn-booking')}
                                                                        onClick={() => handleTimeBooking(item.id)}
                                                                        disabled={isStatus}
                                                                        style={
                                                                            item?.status === 1
                                                                                ? { backgroundColor: '#8ccdf2' }
                                                                                : {}
                                                                        }
                                                                    >
                                                                        {item?.time_booking}:00 - {item?.time_booking}
                                                                        :30
                                                                    </Button>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    {/* </Card> */}
                                                </div>
                                            </div>
                                        </div>

                                        {}
                                    </div>
                                </div>
                                <div className="content-right">
                                    {/* <InfoAboutEmployee
                            EmployeeIdFromParent={
                                listBooking?.content[0]?.employee?.bookingByTime_bookings[0]?.branch_id
                            }
                        /> */}
                                </div>
                            </div>
                        </Card>
                    </div>
                );
            })}
        </>
    );
}

export default DetailAccount;
