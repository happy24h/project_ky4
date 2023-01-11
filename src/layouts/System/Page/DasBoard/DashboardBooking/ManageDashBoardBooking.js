import styles from '../ManageDashBoard.module.scss';
import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import { Column, Pie,Heatmap,Gauge } from '@ant-design/plots';

import { Button, Card, Col, DatePicker, Popover, Row, Space } from 'antd';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);
const titlePage = 'Lịch hẹn';

function ManageDashBoardBooking() {
    const [dataPie, setDataPei] = useState([]);
    const [dataRate, setDataRate] = useState([]);
    const [dataBrush, setDataBrush] = useState([]);
    const [dataHeat, setDataHeat] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const configPie = getConfigPieChart(dataPie);
    const configRate = getConfigRateChart(dataRate);
    const configBrush = getConfigBrushChart(dataBrush);
    const configHeat = getConfigHeatMap(dataHeat);
    
    const showTimeLine = () => {
        setShowInfo(!showInfo);
    };
    useEffect(() => {
        asyncFetchPei();
        asyncFetchRate();
        asyncFetchBrush();
        asyncFetchHeat();
    }, []);
    const handleOpenChange1 = (newOpen) => {
        setOpen1(newOpen);
    };
    const handleOpenChange2 = (newOpen) => {
        setOpen2(newOpen);
    };

    const asyncFetchPei = () => {
        setDataPei([
            {
                type: '分类一',
                value: 27,
            },
            {
                type: '分类二',
                value: 25,
            },
            {
                type: '分类三',
                value: 18,
            },
            {
                type: '分类四',
                value: 15,
            },
            {
                type: '分类五',
                value: 10,
            },
            {
                type: '其他',
                value: 5,
            },
        ]);
    };
    const asyncFetchRate = () => {
        setDataRate(0.75);
    };

    const asyncFetchBrush = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/v6MvZBUBsQ/column-data.json')
            .then((response) => response.json())
            .then((json) => setDataBrush(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };

    const asyncFetchHeat = () => {
        fetch('https://gw.alipayobjects.com/os/basement_prod/a719cd4e-bd40-4878-a4b4-df8a6b531dfe.json')
            .then((response) => response.json())
            .then((json) => setDataHeat(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
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
                <Row className={styles['cards-dashboard']}>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={12}> <Card
                        title='Biểu đồ lịch hẹn theo nhánh' bordered={true}>
                        <div className={styles['cart-chart']}>
                            <Pie {...configPie} />
                        </div>
                    </Card></Col>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={12}> <Card
                        title='Biểu đồ tỷ lệ lịch hẹn đã đặt' bordered={true}>
                        <div className={styles['cart-chart']}>
                            <Gauge {...configRate} />
                        </div>
                    </Card></Col>
                </Row>
                <Row className='cards-dashboard'>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}>
                        <Card title='Biểu đồ lịch hẹn theo năm'
                              bordered={true}
                              extra={
                                  <Popover
                                      content={(
                                              <div>
                                                  <Row style={{
                                                      marginBottom:"5px"
                                                  }}>
                                                      <Button type='primary'>Năm 2021</Button>
                                                  </Row>
                                                  <Row style={{
                                                      marginBottom:"5px"
                                                  }}>
                                                      <Button type='primary'>Năm 2022</Button>
                                                  </Row>
                                                  <Row style={{
                                                      marginBottom:"5px"
                                                  }}>
                                                      <Button type='primary'>Năm 2023</Button>
                                                  </Row>
                                              </div>
                                          )

                                      }
                                      title=''
                                      trigger='click'
                                      open={open1}
                                      onOpenChange={handleOpenChange1}
                                  >
                                      <Button type='primary'>Tùy chỉnh</Button>
                                  </Popover>
                              }
                        >
                            <Column {...configBrush} />
                        </Card>

                    </Col>
                </Row>
                <Row className='cards-dashboard'>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}>
                        <Card title='Biểu đồ tần xuất lịch hẹn từng nhân viên'
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

                            <Heatmap {...configHeat} />
                        </Card>

                    </Col>
                </Row>
            </div>
        </div>
    );
}
function getConfigHeatMap(data){
    return  {
        width: 1000,
        height: 500,
        autoFit: true ,
        data,
        xField: 'Month of Year',
        yField: 'District',
        colorField: 'AQHI',
        color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
        meta: {
            'Month of Year': {
                type: 'cat',
            },
        },
    };
}

function getConfigBrushChart(data){
return {
    data,
    xField: 'release',
    yField: 'count',
    meta: {
        count: {
            alias: 'top2000 唱片总量',
            nice: true,
        },
        release: {
            tickInterval: 5,
            alias: '唱片发行年份',
        },
    },
    brush: {
        enabled: true,
        type: 'y-rect',
    },
};

}
function getConfigRateChart(percent) {
    return {
        percent: percent,
        range: {
            color: 'l(0) 0:#B8E1FF 1:#3D76DD',
        },
        startAngle: Math.PI,
        endAngle: 2 * Math.PI,
        indicator: null,
        statistic: {
            title: {
                offsetY: -36,
                style: {
                    fontSize: '36px',
                    color: '#4B535E',
                },
                formatter: () => '70%',
            },
            content: {
                style: {
                    fontSize: '24px',
                    lineHeight: '44px',
                    color: '#4B535E',
                },
                formatter: () => '加载进度',
            },
        },
    };
}

function getConfigPieChart(data) {
    return {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };
}

export default ManageDashBoardBooking;