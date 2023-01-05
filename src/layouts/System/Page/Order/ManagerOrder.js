import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Space, Table, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getAllOrder } from '~/redux/order/apiOrder';

function ManagerOrder() {
    const [page, setPage] = useState(1);
    const [loadApiFeedback, setloadApiFeedback] = useState(false);

    //B1: Gọi dispatch để gửi trạng thái reducer
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //B2: Lấy token
    // useSelector để lấy dữ liệu
    const user = useSelector((state) => state.auth.login?.currentUser);

    //B2: gọi api
    let data = {
        booking_id:"",
        customer_id:"",
        voucher_id:"",
        rangeTotalPriceStart:"",
        rangeTotalPriceEnd:"",
        status:"",
        start:"",
        end:"",
        limit:4,
        page:page,
        sort:""
    };

    useEffect(() => {
        getAllOrder(data, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApiFeedback || page]);

    //B3: Lấy danh sách
    const listOrder = useSelector((state) => state.order.order?.orderCurrent);

    //B4: Tạo cột
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            // render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Email Khách',
            dataIndex: 'booking.email',
            key: 'booking.email',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Khung giờ',
            dataIndex: 'booking',
            key: 'booking',
            render: (text) => <span style={{ color: '#1677ff' }}>{text.time_booking}</span>,
        },
        {
            title: 'Ngày',
            dataIndex: 'booking',
            key: 'booking',
            render: (text) => <span style={{ color: '#1677ff' }}>{text.date_booking}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text){
                    case 2:
                        return <Tag color="blue">Đã đến</Tag>;
                    case 1:
                        return <Tag color="success">Đang đặt</Tag>;
                    case 0:
                        return <Tag color="volcano">Chưa đặt</Tag>;
                    case -1:
                        return <Tag color="red">Đã xóa</Tag>;
                    default:
                        return <Tag color="blue">{text}</Tag>;
                }
            },
        },
        {
            title: 'Đối tượng khách',
            dataIndex: 'booking.user_id',
            key: 'booking.user_id',
            render: (text) => {
                switch (text){
                    case 1:
                        return <Tag color="blue">Khách vãng lai</Tag>;
                    case 0:
                        return <Tag color="blue">Khách vãng lai</Tag>;
                    default:
                        return <Tag color="success">Khách đã đăng ký</Tag>;
                }
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        style={{display: user.roles.map(item => (
                                item === "ADMIN" ? "block" : "none"
                            ))}}
                        type="primary" ghost onClick={() => handleEditUser(record)}>
                        <EditOutlined />
                        Edit
                    </Button>
                </Space>
            ),
        },
    ];

    // const handleDeleteUser = (order) => {
    //     // deleteFeedback(feedback.id,dispatch,user?.accessToken);
    //     // setloadApiFeedback(!loadApiFeedback);
    // };

    const handleEditUser = (order) => {
        navigate(`/system/manage-order/detail/${order.id}`);
    };

    return (
        <div style={{ marginTop: '120px' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    size="small"
                    title="Total Accounts"
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 180,
                        height: 140,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listOrder?.totalItems}</h3>
                    <p>Đơn hàng</p>
                </Card>
                {/*<Form.Item label="">*/}
                {/*    <Link to={'/add-feedback'}>*/}
                {/*        <Button style={{ display: 'flex', margin: '20px auto 0' }} type="primary" htmlType="submit">*/}
                {/*            Add Feedback*/}
                {/*        </Button>*/}
                {/*    </Link>*/}
                {/*</Form.Item>*/}
                <div style={{ display: 'flex', margin: '20px auto 0' }} />
                <Table
                    columns={columns}
                    // { listAccount && listAccount.length > 0 ? dataSource={listAccount} : null}
                    dataSource={listOrder?.content}
                    // rowKey={(orders) => orders.id}
                    pagination={{
                        pageSize: data.limit,
                        total: listOrder?.totalItems,
                        onChange: (page) => {
                            setPage(page);
                        },
                    }}
                />
            </div>
        </div>
    );
}
export default ManagerOrder;