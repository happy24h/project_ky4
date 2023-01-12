import styles from '../ManageDashBoard.module.scss';
import classNames from 'classnames/bind';
import { Button, Card, Col, DatePicker, Popover, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Bar } from '@ant-design/plots';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsDownToPeople, faCut, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const titlePage = 'Dịch vụ';
const { RangePicker } = DatePicker;
function ManageDashBoardService() {
    const [dataBar, setDataBar] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [open2, setOpen2] = useState(false);
    const showTimeLine = () => {
        setShowInfo(!showInfo);
    };
    const handleOpenChange2 = (newOpen) => {
        setOpen2(newOpen);
    };

    useEffect(() => {
        asyncFetchBar();
    }, []);
    const asyncFetchBar = () => {
        setDataBar([
            {
                year: '1951 年',
                value: 38,
            },
            {
                year: '1952 年',
                value: 52,
            },
            {
                year: '1956 年',
                value: 61,
            },
            {
                year: '1957 年',
                value: 145,
            },
            {
                year: '1958 年',
                value: 48,
            },
        ]);
    };
    const configBarChart = getConfigBarChart(dataBar);
    return (
        <div style={{ marginTop: '120px' }}>
            <Row className={styles['flex-just-space-left']} style={{
                marginBottom: '30px',
                marginLeft: '30px',
                textTransform: 'uppercase',
            }}>
                <h1>{titlePage ?? ''}</h1>
            </Row>
            <div className='container' style={{ width: '1200px', margin: '0 auto' }}>
                <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}> <Card title='' bordered={true}>
                    <Row className='cards-dashboard'>
                        <Col style={{ padding: '5px' }} span={12}>
                            <Card
                                className={styles['cart-item-header']}
                                title="Tổng Dịch Vụ" bordered={true}>
                                <div className={styles['flex-just-space-center']} style={{
                                    paddingBottom:"15px",
                                }}>
                                    <h1><FontAwesomeIcon icon={faCut}/> 30</h1>
                                </div>
                            </Card></Col>
                        <Col style={{ padding: '5px' }} span={12}>
                            <Card
                                className={styles['cart-item-header']}
                                title="Tổng Nhân viên" bordered={true}>
                                <div className={styles['flex-just-space-center']} style={{
                                    paddingBottom:"15px",
                                }}>
                                    <h1><FontAwesomeIcon icon={faArrowsDownToPeople}/> 60</h1>
                                </div>
                            </Card></Col>
                    </Row>
                </Card></Col>
                <Row className='cards-dashboard'>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}>
                        <Card title='Biểu đồ dịch vụ được sử dụng nhiều trong khoảng thời gian'
                              bordered={true}
                              extra={
                                  <Popover
                                      content={(
                                          <div>

                                              <Row style={{
                                                  marginBottom:"5px"
                                              }}>
                                                  <Button onClick={showTimeLine} type='primary'>Chọn khoảng ngày</Button>
                                              </Row>
                                          </div>
                                      )

                                      }
                                      title=''
                                      trigger='click'
                                      open={open2}
                                      onOpenChange={handleOpenChange2}
                                  >
                                      <Button  type='primary'>Tùy chỉnh</Button>
                                  </Popover>
                              }
                        >
                            <div style={{ display: showInfo ? 'block' : 'none', paddingBottom: '50px' }}>
                                <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}>
                                    <span>Chon khoảng ngày:</span>
                                </Col>
                                <Space direction='vertical' size={12}>
                                    <div className={styles['flex-just-space-between']}>
                                        <RangePicker style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }} />
                                        <Button type='primary'>Gửi</Button>
                                    </div>


                                </Space>
                            </div>

                            return <Bar {...configBarChart} />;
                        </Card>

                    </Col>
                </Row>
            </div>
        </div>

    );
}
function getConfigBarChart(data) {
    return {
        data,
        xField: 'value',
        yField: 'year',
        seriesField: 'year',
        legend: {
            position: 'top-left',
        },
    };
}
export default ManageDashBoardService;