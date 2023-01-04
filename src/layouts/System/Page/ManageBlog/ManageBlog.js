import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getBlog } from '~/redux/blog/apiBlog';

import { DeleteOutlined, EyeTwoTone, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Space, Table, Button, Form, Card, InputNumber, Pagination } from 'antd';
// import { Space, Table, Button, Form, Tag, Card, Pagination } from 'antd';
import { Input } from 'antd';

import classNames from 'classnames/bind';
import styles from './ManageBlog.module.scss';

const cx = classNames.bind(styles);

function ManageBlog() {
    const [lineNumber, setLineNumber] = useState(3);
    const [page, setPage] = useState(1);
    const [state, setState] = useState({
        title: '',
        account: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBlog = useSelector((state) => state.blog.blog.listData);
    let dataBlog = {
        title: state?.title,
        auth_name: state?.account,
        start: '',
        end: '',
        page: page,
        limit: lineNumber,
        sort: 'asc',
        status: '',
    };

    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;

        setState({ ...state, [name]: value });
    };
    let totalState = state?.title + state?.account;
    useEffect(() => {
        getBlog(dataBlog, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, lineNumber]);
    useEffect(() => {
        getBlog(dataBlog, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalState]);

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
            title: 'Account',
            dataIndex: 'account',
            key: 'account',
            render: (text) => <span>{text.name}</span>,
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text) => {
                if (text.length > 9) {
                    return <div className={cx('thumbnail-branch')} style={{ backgroundImage: `url(${text})` }}></div>;
                } else {
                    return <div className={cx('thumbnail-branch')}></div>;
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
    const handleDeleteUser = () => {};
    const handleEditUser = (blog) => {
        // alert('hello world' + blog.id);
        navigate(`/system/manage-blog/detail/${blog.id}`);
    };

    const layoutInput = () => {
        return (
            <div className={cx('wrapper-input-group')}>
                <Input.Group className={cx('input-group')} compact>
                    <Input
                        style={{ width: '30%', height: 32 }}
                        placeholder="Search title"
                        name="title"
                        value={state?.title}
                        onChange={handleOnchangeInput}
                    />

                    <Input
                        style={{ width: '30%', height: 32 }}
                        placeholder="Search auth name"
                        name="account"
                        value={state?.account}
                        onChange={handleOnchangeInput}
                    />
                </Input.Group>
                {/* <Form.Item label=""> */}
                <Link to={'/system/manage-blog/add'}>
                    <Button type="primary" style={{ fontWeight: 600, fontSize: 10, backgroundColor: '#fcaf17' }}>
                        <PlusCircleOutlined />
                        Add Blog
                    </Button>
                </Link>
                {/* </Form.Item> */}
            </div>
        );
    };

    const handleIncrement = () => {
        return (
            <div
                className={cx('counter-number')}
                // style={{ padding: '0 5px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '12px' }}
                onClick={() => setLineNumber(lineNumber + 1)}
            >
                <PlusCircleOutlined />
            </div>
        );
    };
    const handleDecrement = () => {
        if (lineNumber < 2) {
            return (
                <div className={cx('counter-number')} onClick={() => setLineNumber(1)}>
                    <MinusCircleOutlined />
                </div>
            );
        } else {
            return (
                <div className={cx('counter-number')} onClick={() => setLineNumber(lineNumber - 1)}>
                    <MinusCircleOutlined />
                </div>
            );
        }
    };

    const tableFooter = () => {
        return (
            <div className={cx('table-footer')}>
                <div style={{ display: 'flex', width: '150px' }}>
                    {/* <Button onClick={() => setLineNumber(lineNumber + 1)}>+</Button> */}
                    <InputNumber
                        addonBefore={handleDecrement()}
                        addonAfter={handleIncrement()}
                        min={1}
                        max={10}
                        // defaultValue={lineNumber}
                        value={lineNumber}
                        onChange={onChange}
                    />{' '}
                    {/* <Button onClick={() => setLineNumber(lineNumber - 1)}>-</Button> */}
                </div>
                <Pagination
                    pageSize={lineNumber}
                    total={listBlog?.totalItems}
                    // current={page}
                    onChange={(page) => setPage(page)}
                />
            </div>
        );
    };

    const onChange = (value) => {
        // console.log('changed', value);
        setLineNumber(value);
    };

    return (
        <div style={{ marginTop: '110px' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    size="small"
                    title="Total Blogs"
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 160,
                        height: 140,
                        marginBottom: 40,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listBlog?.totalItems}</h3>
                    <p>Blogs</p>
                </Card>
                {/* <Form.Item label="">
                    <Link to={'/system/manage-blog/add'}>
                        <Button type="primary" style={{ marginTop: '23px' }}>
                            Add Blog
                        </Button>
                    </Link>
                </Form.Item> */}
                <Table
                    columns={columns}
                    dataSource={listBlog?.content}
                    title={() => layoutInput()}
                    bordered
                    footer={() => tableFooter()}
                    pagination={false}
                    // pagination={{
                    //     pageSize: lineNumber,
                    //     total: listBlog?.totalItems,
                    //     onChange: (page) => {
                    //         setPage(page);
                    //     },
                    // }}
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
