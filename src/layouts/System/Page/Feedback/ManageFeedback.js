import "./ManageFeedback.css"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeedback } from '~/redux/feedback/apiFeedback';
import { Button, Card, Form, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function ManageFeedback() {
    //B1: Gọi dispatch để gửi trạng thái reducer
    const dispatch = useDispatch();

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
        page:1,
        sort:""
    };

    useEffect(() => {
        getAllFeedback(dataFeedback, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //B3: Lấy danh sách
    const listFeedback = useSelector((state) => state.feedback.feedback?.feedbackCurrent?.content);

    //B4: Tạo cột
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            // render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Title',
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
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" ghost onClick={() => handleEditUser(record)}>
                        <EditOutlined />
                        Edit
                    </Button>
                    <Button type="primary" danger ghost onClick={() => handleDeleteUser(record)}>
                        <DeleteOutlined />
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDeleteUser = () => {
        alert('hello world');
    };

    const handleEditUser = () => {
        alert('hello world');
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
                    <h3 style={{ fontSize: '28px' }}>{listFeedback?.length}</h3>
                    <p>Feedback</p>
                </Card>
                <Form.Item label="">
                    <Link to={'/add-feedback'}>
                        <Button style={{ display: 'flex', margin: '20px auto 0' }} type="primary" htmlType="submit">
                            Add Feedback
                        </Button>
                    </Link>
                </Form.Item>
                <Table
                    columns={columns}
                    // { listAccount && listAccount.length > 0 ? dataSource={listAccount} : null}
                    dataSource={listFeedback}
                    rowKey={(feedbacks) => feedbacks.id}
                    // {...this.state.tableConfiguration}
                />
            </div>
        </div>
    );
}

export default ManageFeedback;
