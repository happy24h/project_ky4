import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getBlog } from '~/redux/blog/apiBlog';

import { DeleteOutlined, EyeTwoTone } from '@ant-design/icons';
import { Space, Table, Button, Form, Tag, Card } from 'antd';

function ManageBlog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBlog = useSelector((state) => state.blog.blog.listData);
    let dataBlog = {
        title: '',
        auth_name: '',
        start: '',
        end: '',
        page: 1,
        limit: 4,
        sort: 'asc',
        status: '',
    };
    useEffect(() => {
        getBlog(dataBlog, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'content',
            dataIndex: 'content',
            key: 'content',
        },

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
    const handleDeleteUser = () => {};
    const handleEditUser = (blog) => {
        // alert('hello world' + account.accounts_id);
        navigate(`/system/manage-blog/detail/${blog.id}`);
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
                    <h3 style={{ fontSize: '28px' }}>{listBlog?.totalItems}</h3>
                    <p>Accounts</p>
                </Card>
                <Form.Item label="">
                    <Link to={'/system/manage-blog/add'}>
                        <Button type="primary" style={{ marginTop: '23px' }}>
                            ADD USER
                        </Button>
                    </Link>
                </Form.Item>
                <Table
                    columns={columns}
                    dataSource={listBlog?.content}
                    pagination={{
                        pageSize: 4,
                        total: listBlog?.totalItems,
                        // onChange: (page) => {
                        //     setPage(page);
                        // },
                    }}
                />
                {/* {listAccount?.totalItems / 5 > 1 && (
            <Pagination
                total={listAccount?.totalItems}
                pageSize={4}
                current={page}
                onChange={(page) => setPage(page)}
            />
        )} */}
            </div>
        </div>
    );
}

export default ManageBlog;
