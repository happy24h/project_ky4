import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { DeleteOutlined, EyeTwoTone } from '@ant-design/icons';
import { Space, Table, Button, Form, Card } from 'antd';
import { getBranch } from '~/redux/branch/apiBranch';
import classNames from 'classnames/bind';
import styles from './ManageBranch.module.scss';
// import Slider from '~/layouts/components/Slider';
const cx = classNames.bind(styles);

function ManageBranch() {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBranch = useSelector((state) => state.branch.branch?.listData);
    let dataBranch = {
        name: '',
        address: '',
        hot_line: '',
        start: '',
        end: '',
        page: 1,
        limit: 4,
        sort: 'asc',
        status: '',
    };
    useEffect(() => {
        getBranch(dataBranch, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            // render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Hot line',
            dataIndex: 'hot_line',
            key: 'hot_line',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text) => {
                if (text.length > 4) {
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

    return (
        <div style={{ marginTop: '120px' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    size="small"
                    title="Total Blogs"
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 160,
                        height: 140,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listBranch?.totalItems}</h3>
                    <p>Blogs</p>
                </Card>
                <Form.Item label="">
                    <Link to={'/system/manage-blog/add'}>
                        <Button type="primary" style={{ marginTop: '23px' }}>
                            Add Branch
                        </Button>
                    </Link>
                </Form.Item>
                <Table
                    columns={columns}
                    dataSource={listBranch?.content}
                    pagination={{
                        pageSize: 3,
                        total: listBranch?.totalItems,
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

export default ManageBranch;
