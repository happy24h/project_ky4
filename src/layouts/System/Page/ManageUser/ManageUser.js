import './ManageUser.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccount } from '~/redux/apiRequest';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Button, Form, Tag, Card } from 'antd';
import { Link } from 'react-router-dom';
// import 'antd/dist/antd.min.css';

function ManageUser() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account?.accountCurrent?.content);

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
        name: "",
        email:"",
        phone:"",
        gender:"",
        start:"",
        end:"",
        page: 1,
        limit:4,
        sort:"asc",
        role_id:"",
        member_ship_class_id:"",
        status:""
    };

    useEffect(() => {
        getAllAccount(dataAccount, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteUser = (account) => {
        alert('hello world ' + account.accounts_id);
    };

    const handleEditUser = (account) => {
        alert('hello world ' + account.accounts_id);
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
                    <h3 style={{ fontSize: '28px' }}>{listAccount?.length}</h3>
                    <p>Accounts</p>
                </Card>
                <Form.Item label="">
                    <Link to={'/add-user'}>
                        <Button style={{ display: 'flex', margin: '20px auto 0' }} type="primary" htmlType="submit">
                            Add User
                        </Button>
                    </Link>
                </Form.Item>
                <Table
                    columns={columns}
                    // { listAccount && listAccount.length > 0 ? dataSource={listAccount} : null}
                    dataSource={listAccount}
                    // rowKey={(listAccount) => listAccount.id}
                    // {...this.state.tableConfiguration}
                />
            </div>
        </div>
    );
}

export default ManageUser;
