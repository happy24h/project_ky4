import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteService, getAllService } from '~/redux/service/apiService';
import { Space, Table, Button, Form, Tag, Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function ManagerService() {
    const [page, setPage] = useState(1);
    const [loadApi, setloadApi] = useState(false);

    //B1: Gọi dispatch để gửi trạng thái reducer
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //B2: Lấy token
    // useSelector để lấy dữ liệu
    const user = useSelector((state) => state.auth.login?.currentUser);

    //B2: gọi api
    let data = {
        name: '',
        type_service_id: '',
        status: '',
        start: '',
        end: '',
        limit: 5,
        page: page,
        sort: 'desc',
    };

    useEffect(() => {
        getAllService(data, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApi || page]);

    //B3: Lấy danh sách
    const listService = useSelector((state) => state.service.service?.serviceCurrent);

    //B4: Tạo cột
    const columns = [
        {
            title: 'ID',
            dataIndex: 'service_id',
            key: 'service_id',
        },
        {
            title: 'Ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text) => <img src={text} width="35%" />,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'service_name',
            key: 'service_name',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Loại dịch vụ',
            dataIndex: 'type_service',
            key: 'type_service',
            render: (text) => <span style={{ color: '#1677ff' }}>{text.name}</span>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            // render: (text) => <span style={{ color: '#1677ff' }}>{text.price}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text) {
                    case 1:
                        return <Tag color="success">Hoạt động</Tag>;
                    case -1:
                        return <Tag color="red">Đã xóa</Tag>;
                    default:
                        return <Tag color="success">Hoạt động</Tag>;
                }
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" ghost onClick={() => handleEditService(record)}>
                        <EditOutlined />
                        Chi tiết
                    </Button>
                    <Button
                        style={{ display: user.roles.map((item) => (item === 'ADMIN' ? 'block' : 'none')) }}
                        type="primary"
                        danger
                        ghost
                        onClick={() => handleDeleteService(record)}
                    >
                        <DeleteOutlined />
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEditService = (service) => {
        navigate(`/system/manage-service/detail/${service?.service_id}`);
    };

    const handleDeleteService = (service) => {
        deleteService(service?.service_id, dispatch, user?.accessToken);
        setloadApi(!loadApi);
    };

    const handleLoadAPI = () => {
        setloadApi(!loadApi);
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
                    <h3 style={{ fontSize: '28px' }}>{listService?.totalItems}</h3>
                    <p>Dịch vụ</p>
                </Card>
                <Form.Item label="">
                    <Link to={'/system/manage-service/add'}>
                        <Button type="primary" style={{ marginTop: '23px' }}>
                            Thêm dịch vụ
                        </Button>
                    </Link>
                </Form.Item>
                {/*<Form.Item label="">*/}
                {/*    <AddService loadApi={handleLoadAPI} accessToken={user?.accessToken} />*/}
                {/*</Form.Item>*/}
                {/*<div style={{ display: 'flex', margin: '20px auto 0' }} />*/}
                <Table
                    columns={columns}
                    // { listAccount && listAccount.length > 0 ? dataSource={listAccount} : null}
                    dataSource={listService?.content}
                    pagination={{
                        pageSize: 5,
                        total: listService?.totalItems,
                        onChange: (page) => {
                            setPage(page);
                        },
                    }}
                />
            </div>
        </div>
    );
}
export default ManagerService;
