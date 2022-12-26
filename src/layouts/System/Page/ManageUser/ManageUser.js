import './ManageUser.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, getAllAccount } from '~/redux/apiRequest';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Button, Form, Tag, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import CreateAccount from './components/Modal/CreateAccount';

// import 'antd/dist/antd.min.css';

function ManageUser() {
    const [page, setPage] = useState(1);
    const [loadApi, setLoadApi] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account?.accountCurrent);
    const navigate = useNavigate();

    console.log('page', page);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'accounts_id',
            key: 'id',
            // render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Name',
            dataIndex: 'accounts_name',
            key: 'name',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'accounts_email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (text) => {
                if (text.length === 4) {
                    return <Tag color="blue">{text}</Tag>;
                } else {
                    return <Tag color="green">{text}</Tag>;
                }
            },
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
    let dataAccount = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        start: '',
        end: '',
        page: page,
        limit: 4,
        sort: 'asc',
        role_id: '',
        member_ship_class_id: '',
        status: '',
    };

    useEffect(() => {
        getAllAccount(dataAccount, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApi || page]);

    const handleLoadAPI = () => {
        // getAllAccount(dataAccount, dispatch, user?.accessToken);
        setLoadApi(!loadApi);
    };

    const handleDeleteUser = (account) => {
        // alert('hello world' + account.accounts_id);
        deleteAccount(account.accounts_id, user?.accessToken, dispatch);
        setLoadApi(!loadApi);
    };

    const handleEditUser = (account) => {
        // alert('hello world' + account.accounts_id);
        navigate(`/system/manage-user/edit/${account.accounts_id}`);
    };

    console.log(5 / 4, 'test');
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
                    <h3 style={{ fontSize: '28px' }}>{listAccount?.totalItems}</h3>
                    <p>Accounts</p>
                </Card>
                <Form.Item label="">
                    {/* <Link to={'/system/manage-user/add'}>
                        <Button style={{ margin: '20px auto 0' }} type="primary" htmlType="submit">
                            Add User
                        </Button>
                    </Link> */}
                    <CreateAccount loadApi = {handleLoadAPI} accessToken={user?.accessToken} />
                </Form.Item>
                <Table
                    columns={columns}
                    // { listAccount && listAccount.length > 0 ? dataSource={listAccount} : null}
                    dataSource={listAccount?.content}
                    // rowKey={(listAccount) => listAccount.id}
                    pagination={{
                        pageSize: 4,
                        total: listAccount?.totalItems,
                        onChange: (page) => {
                            setPage(page);
                        },
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

export default ManageUser;
