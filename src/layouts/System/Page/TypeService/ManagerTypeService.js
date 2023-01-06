import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteService, getAllService } from '~/redux/service/apiService';
import { deleteForTypeService, searchTypeService } from '~/redux/type_service/apiTypeService';
import { Button, Card, Form, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function ManagerTypeService() {
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
        name:"",
        status:"",
        start:"",
        end:"",
        limit:4,
        page:page,
        sort:"asc"
    }

    useEffect(() => {
        searchTypeService(data, dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApi || page]);

    //B3: Lấy danh sách
    const typeServices = useSelector((state) => state.typeService.typeService?.typeServiceCurrent);

    //B4: Tạo cột
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên loại dịch vụ',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text){
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
                    <Button
                        type="primary" ghost onClick={() => handleEditTypeService(record)}>
                        <EditOutlined />
                        Chi tiết
                    </Button>
                    <Button
                        style={{display: user.roles.map(item => (
                                item === "ADMIN" ? "block" : "none"
                            ))}}
                        type="primary" danger ghost onClick={() => handleDeleteTypeService(record)}>
                        <DeleteOutlined />
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEditTypeService = (type_service) => {
        navigate(`/system/manage-type-service/detail/${type_service?.id}`);
    };

    const handleDeleteTypeService = (type_service) => {
        deleteForTypeService(type_service?.id,dispatch,user?.accessToken);
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
                    <h3 style={{ fontSize: '28px' }}>{typeServices?.totalItems}</h3>
                    <p>Loại dịch vụ</p>
                </Card>
                <Form.Item label="">
                    <Link to={'/system/manage-type-service/add'}>
                        <Button type="primary" style={{ marginTop: '23px' }}>
                            Thêm loại dịch vụ
                        </Button>
                    </Link>
                </Form.Item>
                <Table
                    columns={columns}
                    // { listAccount && listAccount.length > 0 ? dataSource={listAccount} : null}
                    dataSource={typeServices?.content}
                    pagination={{
                        pageSize: 4,
                        total: typeServices?.totalItems,
                        onChange: (page) => {
                            setPage(page);
                        },
                    }}
                />
            </div>
        </div>
    );
}
export default ManagerTypeService;