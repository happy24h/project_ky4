import './ManageUser.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, getAllAccount } from '~/redux/apiRequest';
import { DeleteOutlined, EyeTwoTone, PlusCircleOutlined } from '@ant-design/icons';
import { Space, Table, Button, Form, Tag, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Select } from 'antd';

import classNames from 'classnames/bind';
import styles from './ManageUser.module.scss';

const cx = classNames.bind(styles);
const { Option } = Select;

function ManageUser() {
    const [page, setPage] = useState(1);
    const [loadApi, setLoadApi] = useState(false);
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        number: '',
    });
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account?.accountCurrent);
    const navigate = useNavigate();

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

    let totalState = state?.name.length + state?.email.length + state?.phone + state?.gender;
    // console.log('check total state', totalState);

    let dataAccount = {
        name: state?.name,
        email: state?.email,
        phone: state?.phone,
        gender: state?.gender,
        start: '',
        end: '',
        page: page,
        limit: 4,
        sort: 'asc',
        role_id: '',
        member_ship_class_id: '',
        status: '',
    };
    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;

        setState({ ...state, [name]: value });
    };

    const handleSelectChange = (value) => {
        setState({ ...state, gender: value });
    };

    useEffect(() => {
        getAllAccount(dataAccount, dispatch, user?.accessToken);
        console.log('loadApi useEffect ', loadApi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalState]);

    useEffect(() => {
        getAllAccount(dataAccount, dispatch, user?.accessToken);
        console.log('loadApi useEffect ', loadApi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApi || page]);

    const handleDeleteUser = (account) => {
        console.log('loadApi before ', loadApi);
        // alert('hello world' + account.accounts_id);
        deleteAccount(account.accounts_id, user?.accessToken, dispatch);
        setLoadApi(!loadApi);
    };

    const handleEditUser = (account) => {
        // alert('hello world' + account.accounts_id);
        navigate(`/system/manage-user/detail/${account.accounts_id}`);
    };

    const layoutInput = () => {
        return (
            <div className={cx('wrapper-input-group')}>
                <Input.Group className={cx('input-group')} compact>
                    <Input
                        style={{ width: '30%', height: 32 }}
                        placeholder="Search name"
                        name="name"
                        value={state?.name}
                        onChange={handleOnchangeInput}
                    />

                    <Input
                        style={{ width: '30%', height: 32 }}
                        placeholder="Search email"
                        name="email"
                        value={state?.email}
                        onChange={handleOnchangeInput}
                    />
                    <Input
                        style={{ width: '20%', height: 32 }}
                        placeholder="Search phone"
                        name="phone"
                        value={state?.phone}
                        onChange={handleOnchangeInput}
                    />
                    <Select
                        className={cx('input-select')}
                        style={{ width: '20%', height: 32 }}
                        placeholder="Gender"
                        name="gender"
                        // defaultValue="Gender"
                        onChange={handleSelectChange}
                    >
                        <Option value="">Tất cả</Option>
                        <Option value="MALE">Nam</Option>
                        <Option value="FEMALE">Nữ</Option>
                    </Select>
                </Input.Group>
                {/* <Form.Item label=""> */}
                <Link to={'/system/manage-user/add'}>
                    <Button type="primary" style={{ fontWeight: 600, fontSize: 10 }}>
                        <PlusCircleOutlined />
                        Add User
                    </Button>
                </Link>
                {/* </Form.Item> */}
            </div>
        );
    };

    console.log('test state', state);
    return (
        <div style={{ marginTop: '110px' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    size="small"
                    title="Total Accounts"
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 160,
                        height: 140,
                        marginBottom: 40,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listAccount?.totalItems}</h3>
                    <p>Accounts</p>
                </Card>
                {/* <Form.Item label="">
                    <Link to={'/system/manage-user/add'}>
                        <Button type="primary" style={{ marginTop: '23px' }}>
                            ADD USER
                        </Button>
                    </Link>
                </Form.Item> */}
                <Table
                    columns={columns}
                    dataSource={listAccount?.content}
                    // rowKey={(listAccount) => listAccount.id}
                    bordered
                    title={() => layoutInput()}
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
