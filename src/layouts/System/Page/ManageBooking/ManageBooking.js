import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { DeleteOutlined, EyeTwoTone } from '@ant-design/icons';
import { Space, Table, Button, Form, Card } from 'antd';
import { deleteBranch, getBranch } from '~/redux/branch/apiBranch';
import classNames from 'classnames/bind';
import styles from './ManageBooking.module.scss';
import { getBooking } from '~/redux/booking/apiBooking';

const cx = classNames.bind(styles);

function ManageBooking() {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBooking = useSelector((state) => state.booking.booking?.listData);
    console.log('list booking', listBooking);

    let today = new Date();
    if (state) {
        today = new Date(state);
    } else {
    }
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    console.log('today', today);
    let dataBooking = {
        branch_id: '1',
        employee_id: '',
        role: '',
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
    }, [loading]);
    useEffect(() => {
        getBooking(dataBooking, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [today]);
    const handleLoading = () => {
        setLoading(!loading);
    };

    // const handleDeleteUser = (data) => {
    //     // alert('hello world' + data.id);
    //     deleteBranch(data.id, user?.accessToken, dispatch, handleLoading);
    // };
    // const handleEditUser = (data) => {
    //     // alert('ID: ' + data.id);
    //     navigate(`/system/manage-branch/detail/${data.id}`);
    // };

    return (
        <div style={{ marginTop: '120px' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <div className=" l-6 form-group">
                    <label>Chọn ngày</label>
                    <input
                        type="date"
                        className="form-control"
                        name="currentDate"
                        dateformat="dd-mm-YY"
                        required
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <Card
                    size="small"
                    title="Total Booking"
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 160,
                        height: 140,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listBooking?.totalItems}</h3>
                    <p>Booking</p>
                </Card>
                <Form.Item label="">
                    <Link to={'/system/manage-branch/add'}>
                        <Button type="primary" style={{ marginTop: '23px' }}>
                            Add booking
                        </Button>
                    </Link>
                </Form.Item>
                {/* <Table
                    columns={columns}
                    dataSource={listBooking?.content?.employee}
                    pagination={{
                        pageSize: 3,
                        total: listBooking?.totalItems,
                        onChange: (page) => {
                            setPage(page);
                        },
                    }}
                /> */}
                <div className="grid wide">
                    <div className="row">
                        {listBooking?.content.map((item, index) => {
                            // return <div>{item.employee.employee_name}</div>;
                            return (
                                <div className="col l-2-4 m-4 c-6">
                                    <Card
                                        size="small"
                                        title="Đặt lịch"
                                        // extra={<a href="#">More</a>}
                                        style={{
                                            // width: 260,
                                            height: 170,
                                        }}
                                        key={index}
                                    >
                                        <h3 style={{ fontSize: '20px' }}>{item.employee.employee_name}</h3>
                                        <p>
                                            Ngày: <span>{item.employee.bookingByTime_bookings[0].date_booking}</span>
                                        </p>
                                        {/* <p>
                                            Số lượng: <span>{item.employee.bookingByTime_bookings.length}</span>
                                        </p> */}
                                        <div style={{ display: 'flex', marginTop: 8 }}>
                                            {item.employee.bookingByTime_bookings.map((item, index) => {
                                                return (
                                                    <div key={index} style={{ marginRight: '5px' }}>
                                                        <Button
                                                            type="primary"
                                                            style={{
                                                                fontWeight: 600,
                                                                fontSize: 10,
                                                                backgroundColor: '#fcaf17',
                                                            }}
                                                        >
                                                            {item.time_booking}h
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageBooking;
