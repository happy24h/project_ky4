import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllService } from '~/redux/service/apiService';
import { Space, Table, Button, Form, Tag, Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CreateAccount from '~/layouts/System/Page/ManageUser/components/Modal/CreateAccount';
import CreateService from '~/layouts/System/Page/Service/components/Modal/CreateService';


function ManagerService() {
    const [page, setPage] = useState(1);
    const [loadApiCreate, setloadApiCreate] = useState(false);

    //B1: Gọi dispatch để gửi trạng thái reducer
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //B2: Lấy token
    // useSelector để lấy dữ liệu
    const user = useSelector((state) => state.auth.login?.currentUser);

    //B2: gọi api
    let data = {
        "name":"",
        "type_service_id":"",
        "status":"",
        "start":"",
        "end":"",
        "limit":4,
        "page":page,
        "sort":"asc"
    }

    useEffect(() => {
        getAllService(data, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApiCreate || page]);

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
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'service_name',
            key: 'service_name',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Loại dịch vụ',
            dataIndex: 'typeServiceId',
            key: 'typeServiceId',
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
                    <Button type="primary" ghost onClick={() => handleEditService(record)}>
                        <EditOutlined />
                        Edit
                    </Button>
                    <Button type="primary" danger ghost onClick={() => handleDeleteService(record)}>
                        <DeleteOutlined />
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];
    console.log("listService la: " + listService);
    const handleEditService = (service) => {
        // deleteFeedback(service.id,dispatch,user?.accessToken);
        // setloadApiFeedback(!loadApiFeedback);
        console.log("service la: " + service?.service_id);
        alert("handleEditService service.service_id la: "+ service.service_id);
    };

    const handleDeleteService = (service) => {
        // navigate(`/system/manage-service/detail/${service.id}`);
        alert("handleDeleteService service.service_id la: "+ service?.service_id);
    };

    const handleLoadAPI = () => {
        setloadApiCreate(!loadApiCreate);
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
                    <p>Phản hồi</p>
                </Card>
                <Form.Item label="">
                    <CreateService loadApi={handleLoadAPI} accessToken={user?.accessToken} />
                </Form.Item>
                <div style={{ display: 'flex', margin: '20px auto 0' }} />
                <Table
                    columns={columns}
                    // { listAccount && listAccount.length > 0 ? dataSource={listAccount} : null}
                    dataSource={listService?.content}
                    pagination={{
                        pageSize: 4,
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