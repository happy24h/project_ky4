import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, DatePicker, Input, InputNumber, Pagination, Select, Space, Table, Tag } from 'antd';
import { EditOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { getAllOrder } from '~/redux/order/apiOrder';
import classNames from 'classnames/bind';
import styles from './ManageOrder.module.scss';
import { Option } from 'antd/es/mentions';
import { split } from 'lodash';

const cx = classNames.bind(styles);

function ManagerOrder() {
    const [page, setPage] = useState(1);
    const [statusParam, setSearchParams] = useSearchParams();
    const [lineNumber, setLineNumber] = useState(6);
    const [loadApiOrder, setloadApiOrder] = useState(false);
    const [state, setState] = useState({
        booking_id: '',
        voucher_id: '',
        status: '',

        sort: '',
        // voucher_id: '',
        time_booking: '',
        rangeTotalPriceStart: '',
        rangeTotalPriceEnd: '',
    });

    //B1: Gọi dispatch để gửi trạng thái reducer
    const dispatch = useDispatch();
    const navigate = useNavigate();
const dataSelector = useSelector((state) =>  state.dashBoarOderSlices.dashboardOrder?.listData);
    // console.log(12312314,dataSelector);
    //B2: Lấy token
    // useSelector để lấy dữ liệu
    const user = useSelector((state) => state.auth.login?.currentUser);
    if(statusParam.get('status')!=null){
        setState({ ...state, status: statusParam.get('status') })
    }
    //B2: gọi api
    let data = {
        booking_id: state?.booking_id,
        customer_id: '',
        // voucher_id: state?.voucher_id,
        time_booking: state?.time_booking,
        rangeTotalPriceStart: state?.rangeTotalPriceStart,
        rangeTotalPriceEnd: state?.rangeTotalPriceEnd,
        status: '',
        start: state?.start,
        end: state?.end,
        limit: lineNumber,
        page: page,
        sort: state?.sort,
    };

    let totalState =
        state?.booking_id +
        state?.sort +
        state?.time_booking +
        state?.rangeTotalPriceStart +
        state?.rangeTotalPriceEnd +
        state?.start +
        state?.end;

    useEffect(() => {
        getAllOrder(data, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApiOrder || page]);

    useEffect(() => {
        getAllOrder(data, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalState, lineNumber]);

    //B3: Lấy danh sách
    const listOrder = useSelector((state) => state.order.order?.orderCurrent);

    //B4: Tạo cột
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            // render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Email',
            dataIndex: 'booking',
            key: 'booking',
            render: (text) => <span style={{ color: '#1677ff' }}>{text.email}</span>,
        },
        {
            title: 'Mã đặt lịch',
            dataIndex: 'booking',
            key: 'booking',
            render: (text) => <span style={{ color: '#1677ff' }}>{text.id}</span>,
        },
        {
            title: 'Khung giờ',
            dataIndex: 'booking',
            key: 'booking',
            render: (text) => <span style={{ color: '#1677ff' }}>{text.time_booking}</span>,
        },
        {
            title: 'Đặt ngày',
            dataIndex: 'booking',
            key: 'booking',
            render: (text) => <span style={{ color: '#1677ff' }}>{text.date_booking}</span>,
        },
        // {
        //     title: 'Mã giảm giá',
        //     dataIndex: 'voucher',
        //     key: 'voucher',
        //     render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        // },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => {
                // const getDate = text.split(' ');
                // const convertDate = new Date(getDate[0]);
                // var dd = String(convertDate.getDate()).padStart(2, '0');
                // var mm = String(convertDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                // var yyyy = convertDate.getFullYear();

                return <span style={{ color: '#1677ff' }}>{text}</span>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text) {
                    case 2:
                        return <Tag color="blue">Đã đến</Tag>;
                    case 1:
                        return <Tag color="success">Đã đặt</Tag>;
                    case 0:
                        return <Tag color="purple">Chưa đặt</Tag>;
                    case -1:
                        return <Tag color="red">Đã Hủy</Tag>;
                    default:
                        return <Tag color="blue">{text}</Tag>;
                }
            },
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (text) => <span style={{ color: '#1677ff' }}>{numberFormat(text)}</span>,
        },
        {
            title: 'Đối tượng khách',
            dataIndex: 'booking.user_id',
            key: 'booking.user_id',
            render: (text) => {
                switch (text) {
                    case 1:
                        return <Tag color='blue'>Khách vãng lai</Tag>;
                    case 0:
                        return <Tag color='blue'>Khách vãng lai</Tag>;
                    default:
                        return <Tag color='success'>Khách đã đăng ký</Tag>;
                }
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        style={{ display: user.roles.map((item) => (item === 'ADMIN' ? 'block' : 'none')) }}
                        type="primary"
                        ghost
                        onClick={() => handleEditUser(record)}
                    >
                        <EditOutlined />
                        Edit
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEditUser = (order) => {
        navigate(`/system/manage-order/detail/${order.id}`);
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

    const numberFormat = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);

    const onChange = (value) => {
        // console.log('changed', value);
        setLineNumber(value);
    };

    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;

        setState({ ...state, [name]: value });
    };

    const handleSelectSort = (value) => {
        setState({ ...state, sort: value });
    };

    const layoutInput = () => {
        return (
            <div className={cx('wrapper-input-group')}>
                <Input.Group className={cx('input-group')} compact>
                    <Input
                        style={{ width: '30%', height: 32 }}
                        placeholder='Tìm mã đặt lịch'
                        name='booking_id'
                        value={state?.booking_id}
                        onChange={handleOnchangeInput}
                    />
                    {/*<Input*/}
                    {/*    style={{ width: '30%', height: 32 }}*/}
                    {/*    placeholder="Tìm mã giảm giá"*/}
                    {/*    name="voucher_id"*/}
                    {/*    value={state?.voucher_id}*/}
                    {/*    onChange={handleOnchangeInput}*/}
                    {/*/>*/}
                    <Select
                        className={cx('input-select')}
                        style={{ width: '25%', height: 32 }}
                        placeholder="Khung giờ"
                        name="time_booking"
                        onChange={(value) => {
                            setState({ ...state, time_booking: value });
                        }}
                    >
                        <Option value="">--Chọn--</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                        <Option value="10">10</Option>
                        <Option value="11">11</Option>
                        <Option value="13">13</Option>
                        <Option value="14">14</Option>
                        <Option value="15">15</Option>
                        <Option value="16">16</Option>
                    </Select>
                    <Select
                        className={cx('input-select')}
                        style={{ width: '25%', height: 32 }}
                        placeholder="Theo id tăng dần"
                        name="sort"
                        onChange={handleSelectSort}
                    >
                        <Option value="asc">Theo id tăng dần</Option>
                        <Option value="desc">Theo id giảm dần</Option>
                    </Select>
                    <DatePicker
                        format="DD-MM-YYYY"
                        onChange={(value) => {
                            setState({ ...state, start: value.format('YYYY-MM-DD') });
                        }}
                        placeholder="ngày bắt đầu"
                    />
                    <DatePicker
                        format="DD-MM-YYYY"
                        onChange={(value) => {
                            setState({ ...state, end: value.format('YYYY-MM-DD') });
                        }}
                        placeholder="ngày kết thúc"
                    />
                    <Select
                        className={cx('input-select')}
                        style={{ width: '25%', height: 32 }}
                        placeholder="Chọn khoảng giá"
                        name="sort"
                        onChange={(value) => {
                            const rangePrice = value.split('-');
                            setState({
                                ...state,
                                rangeTotalPriceStart: rangePrice[0],
                                rangeTotalPriceEnd: rangePrice[1],
                            });
                        }}
                    >
                        <Option value="">Chọn khoảng giá</Option>
                        <Option value="1000-3000">1000-3000</Option>
                        <Option value="4000-5000">4000-5000</Option>
                    </Select>
                </Input.Group>
                {/* <Form.Item label=""> */}
                {/*<Link to={'/system/manage-user/add'}>*/}
                {/*    <Button type="primary" style={{ fontWeight: 600, fontSize: 10, backgroundColor: '#fcaf17' }}>*/}
                {/*        <PlusCircleOutlined />*/}
                {/*        Add User*/}
                {/*    </Button>*/}
                {/*</Link>*/}
                {/* </Form.Item> */}
            </div>
        );
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
                    total={listOrder?.totalItems}
                    // current={page}
                    onChange={(page) => setPage(page)}
                />
            </div>
        );
    };

    return (
        <div style={{ marginTop: '120px' }}>
            <div className='container' style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    size='small'
                    title='Total Accounts'
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 180,
                        height: 140,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listOrder?.totalItems}</h3>
                    <p>Đơn hàng</p>
                </Card>
                {/*<Form.Item label="">*/}
                {/*    <Link to={'/add-feedback'}>*/}
                {/*        <Button style={{ display: 'flex', margin: '20px auto 0' }} type="primary" htmlType="submit">*/}
                {/*            Add Feedback*/}
                {/*        </Button>*/}
                {/*    </Link>*/}
                {/*</Form.Item>*/}
                <div style={{ display: 'flex', margin: '20px auto 0' }} />
                <Table
                    columns={columns}
                    // { listAccount && listAccount.length > 0 ? dataSource={listAccount} : null}
                    dataSource={listOrder?.content}
                    // rowKey={(orders) => orders.id}
                    title={() => layoutInput()}
                    footer={() => tableFooter()}
                    // pagination={{
                    //     pageSize: data.limit,
                    //     total: listOrder?.totalItems,
                    //     onChange: (page) => {
                    //         setPage(page);
                    //     },
                    // }}
                />
            </div>
        </div>
    );
}
export default ManagerOrder;
