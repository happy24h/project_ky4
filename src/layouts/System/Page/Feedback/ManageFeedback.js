import "./ManageFeedback.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFeedback, getAllFeedback } from '~/redux/feedback/apiFeedback';
import { Button, Card, Form, Space, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function ManageFeedback() {
    const [page, setPage] = useState(1);
    const [loadApiFeedback, setloadApiFeedback] = useState(false);

    //B1: Gọi dispatch để gửi trạng thái reducer
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //B2: Lấy token
    // useSelector để lấy dữ liệu
    const user = useSelector((state) => state.auth.login?.currentUser);

    //B2: gọi api
    let dataFeedback = {
        title:"",
        email:"",
        status:"",
        start:"",
        end:"",
        limit:4,
        page:page,
        sort:""
    };

    useEffect(() => {
        getAllFeedback(dataFeedback, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApiFeedback || page]);

    //B3: Lấy danh sách
    const listFeedback = useSelector((state) => state.feedback.feedback?.feedbackCurrent);

    //B4: Tạo cột
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            // render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text){
                    case 1:
                        return <Tag color="success">Đã đọc</Tag>;
                    case 0:
                        return <Tag color="volcano">Chưa đọc</Tag>;
                    case -1:
                        return <Tag color="red">Đã xóa</Tag>;
                    default:
                        return <Tag color="blue">{text}</Tag>;
                }
            },
        },
        {
            title: 'Đối tượng khách',
            dataIndex: 'account_id',
            key: 'account_id',
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
                                item === "ADMIN" || "CUSTOMER_CARE" ? "block" : "none"
                            ))}}
                        type="primary" ghost onClick={() => handleEditUser(record)}>
                        <EditOutlined />
                        Edit
                    </Button>
                    <Button
                        style={{display: user.roles.map(item => (
                                item === "ADMIN" ? "block" : "none"
                            ))}}
                        type="primary" danger ghost onClick={() => handleDeleteUser(record)}>
                        <DeleteOutlined />
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDeleteUser = (feedback) => {
        deleteFeedback(feedback.id,dispatch,user?.accessToken);
        setloadApiFeedback(!loadApiFeedback);
    };

    const handleEditUser = (feedback) => {
        navigate(`/system/manage-feedback/detail/${feedback.id}`);
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
                    <h3 style={{ fontSize: '28px' }}>{listFeedback?.totalItems}</h3>
                    <p>Phản hồi</p>
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
                    dataSource={listFeedback?.content}
                    rowKey={(feedbacks) => feedbacks.id}
                    pagination={{
                        pageSize: 4,
                        total: listFeedback?.totalItems,
                        onChange: (page) => {
                            setPage(page);
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default ManageFeedback;
