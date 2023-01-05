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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBooking = useSelector((state) => state.booking.booking?.listData);
    console.log('list booking', listBooking);
    let dataBooking = {
        branch_id: '1',
        employee_id: '',
        role: '',
        date_booking: '04-01-2022',
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
    }, [page]);
    const handleLoading = () => {
        setLoading(!loading);
    };

    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',
        //     // render: (text) => <Link>{text}</Link>,
        // },
        {
            title: 'Employee_name',
            dataIndex: 'employee_name',
            key: 'employee_name',
            render: (text) => <span style={{ color: '#1677ff' }}>{text?.employee_name}</span>,
        },
        // {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     key: 'address',
        // },
        // {
        //     title: 'Hot line',
        //     dataIndex: 'hot_line',
        //     key: 'hot_line',
        // },
        // {
        //     title: 'Thumbnail',
        //     dataIndex: 'thumbnail',
        //     key: 'thumbnail',
        //     render: (text) => {
        //         if (text.length > 9) {
        //             return <div className={cx('thumbnail-branch')} style={{ backgroundImage: `url(${text})` }}></div>;
        //         } else {
        //             return <div className={cx('thumbnail-branch')}></div>;
        //         }
        //     },
        // },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" ghost onClick={() => handleEditUser(record)}>
                        <EyeTwoTone />
                        Detail
                    </Button>
                    <Button type="primary" danger ghost onClick={() => handleDeleteUser(record)}>
                        <DeleteOutlined />
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];
    const handleDeleteUser = (data) => {
        // alert('hello world' + data.id);
        deleteBranch(data.id, user?.accessToken, dispatch, handleLoading);
    };
    const handleEditUser = (data) => {
        // alert('ID: ' + data.id);
        navigate(`/system/manage-branch/detail/${data.id}`);
    };

    return (
        <div style={{ marginTop: '120px' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
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
                            Add Branch
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
                                            height: 160,
                                        }}
                                        key={index}
                                    >
                                        <h3 style={{ fontSize: '20px' }}>{item.employee.employee_name}</h3>
                                        <p>Branches</p>
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
