import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { DatePicker } from 'antd';

import { Button, Form, Card } from 'antd';
import classNames from 'classnames/bind';
import styles from './ViewBranch.module.scss';
import { getBooking } from '~/redux/booking/apiBooking';

const cx = classNames.bind(styles);

function ViewBranch() {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const { id } = useParams();
    // const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBooking = useSelector((state) => state.booking.booking?.listData);
    // console.log('list booking', listBooking);

    const onChange = (date, dateString) => {
        console.log('test', date, 'aaaa', dateString);
        setState(dateString);
    };

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
        branch_id: id,
        employee_id: '',
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
    useEffect(() => {
        getBooking(dataBooking, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [today]);

    return (
        <div style={{ margin: '45px 0 ' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    title={<DatePicker onChange={onChange} />}
                    // extra={
                    //     <Form.Item label="">
                    //         <Link to={'/system/manage-booking/add'}>
                    //             <Button type="primary" style={{ marginTop: '23px', backgroundColor: '#fcaf17' }}>
                    //                 Add booking
                    //             </Button>
                    //         </Link>
                    //     </Form.Item>
                    // }
                    style={{
                        width: 1200,
                        minHeight: 600,
                        backgroundColor: '#e5e5e5',
                    }}
                >
                    <div className="grid wide">
                        <div className="row">
                            {listBooking?.content.map((item, index) => {
                                return (
                                    <div className="col l-3 m-4 c-6">
                                        <Card
                                            size="small"
                                            title="Đặt lịch"
                                            // extra={<a href="#">More</a>}
                                            style={{
                                                // width: 260,
                                                minHeight: 170,
                                            }}
                                            key={index}
                                        >
                                            <h3 style={{ fontSize: '20px' }}>{item.employee.employee_name}</h3>
                                            <p>
                                                Ngày:{' '}
                                                <span>{item.employee.bookingByTime_bookings[0].date_booking}</span>
                                            </p>
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
                </Card>
            </div>
        </div>
    );
}

export default ViewBranch;
