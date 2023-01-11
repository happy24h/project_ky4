import styles from '../ManageDashBoard.module.scss';
import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar } from '@ant-design/plots';
import moment from 'moment';

import { Button, Card, Col, DatePicker, Popover, Row, Space } from 'antd';
import { faMoneyBill, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);
const titlePage = 'Đơn hàng';
const keyStorage = 'dashboard_order_dataLine';

function ManageDashBoardOrder() {
    const [data, setData] = useState([]);
    const [dataPie, setDataPei] = useState([]);
    const [dataBar, setDataBar] = useState([]);
    const [timeDate, setTimeDate] = useState([]);
    const [open, setOpen] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    let config = getConfigLineChart(data);
    let configPie = getConfigPieChart(dataPie);
    let configBar = getConfigBarChart(dataBar);

    const showTimeLine = () => {
        setShowInfo(!showInfo);
    };
    const handerSubmitTime = () => {
        console.log(timeDate);
        if (timeDate.length != 0) {
            console.log(1);
            let datalineStorage = localStorage.getItem(keyStorage);
            let dataTranform = Array.from(JSON.parse(datalineStorage));
            var data = dataTranform.filter((value) => {
                let startDate = timeDate[0];
                let endDate = timeDate[1];
                console.log(moment(startDate).isBefore(moment(value.Date)), moment(endDate).isAfter(moment(value.Date)));
                return moment(startDate).isBefore(value.Date) && moment(endDate).isAfter(moment(value.Date));
            });
            console.log(data);
            setData(
                data,
            );
        }
    };
    const refreshDataLine = () => {
        localStorage.removeItem(keyStorage);
        asyncFetch();
    };
    const showTimeLineYear = () => {
        asyncFetchYearOrMonth('year');
    };
    const showTimeLineMonth = () => {
        asyncFetchYearOrMonth('month');
    };
    const showTimeLineDay = () => {
        asyncFetch();
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    useEffect(() => {
        asyncFetch();
        asyncFetchPei();
        asyncFetchBar();

    }, []);

    const asyncFetch = () => {
        let dataLine;
        let datalineStorage = localStorage.getItem(keyStorage);
        if (datalineStorage == undefined) {
            dataLine = [
                {
                    Date: '2012-12-01',
                    scales: 555,
                    id: 100,
                },
                {
                    Date: '2012-11-01',
                    scales: 555,
                    id: 101,
                },
            ];
            localStorage.setItem(keyStorage, JSON.stringify(dataLine));
            setData(dataLine);
        } else {
            setData(Array.from(JSON.parse(datalineStorage)));
        }

    };

    const asyncFetchYearOrMonth = (type) => {
        let dataTranform;
        let dataYears;
        let dataMonths;
        let datalineStorage = localStorage.getItem(keyStorage);
        dataTranform = Array.from(JSON.parse(datalineStorage));
        switch (type) {
            case 'year':
                const mapYear = new Map();
                dataYears = dataTranform.forEach((dataDate) => {
                    var dateYear = new Date(dataDate.Date);
                    let year = mapYear.get(dateYear.getFullYear());
                    if (year == undefined) {
                        const ids = [];
                        ids.push(dataDate.id);
                        mapYear.set(dateYear.getFullYear(), {
                            Date: dateYear.getFullYear(),
                            scales: dataDate.scales,
                            ids: ids,
                        });

                    } else {
                        year.scales += dataDate.scales;
                        year.ids.push(dataDate.id);
                        mapYear.set(dateYear.getFullYear(), {
                            Date: dateYear.getFullYear(),
                            scales: year.scales,
                            ids: year.ids,
                        });
                    }
                });

                setData(Array.from(mapYear.values()));

                break;
            case 'month':
                const mapMonth = new Map();

                dataMonths = dataTranform.forEach((dataDate) => {
                    var dateMonth = moment(dataDate.Date);
                    var key = dateMonth.format('YYYY') + '-' + dateMonth.format('MM');
                    let month = mapMonth.get(key);
                    if (month == undefined) {
                        const ids = [];
                        ids.push(dataDate.id);
                        mapMonth.set(key, {
                            Date: key,
                            scales: dataDate.scales,
                            ids: ids,
                        });
                    } else {
                        month.scales += dataDate.scales;
                        month.ids.push(dataDate.id);
                        mapMonth.set(key, {
                            Date: key,
                            scales: month.scales,
                            ids: month.ids,
                        });
                    }
                });
                setData(Array.from(mapMonth.values()));
                break;
        }

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
    const asyncFetchBar = () => {
        setDataBar([
            {
                type: '家具家电',
                sales: 38,
            },
            {
                type: '粮油副食',
                sales: 52,
            },
            {
                type: '生鲜水果',
                sales: 61,
            },
            {
                type: '美容洗护',
                sales: 145,
            },
            {
                type: '母婴用品',
                sales: 48,
            },
            {
                type: '进口食品',
                sales: 38,
            },
            {
                type: '食品饮料',
                sales: 38,
            },
            {
                type: '家庭清洁',
                sales: 38,
            },
        ]);
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

                <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}> <Card title='' bordered={true}>
                    <Row className='cards-dashboard'>
                        <Col style={{ padding: '5px' }} span={6}>
                            <Card
                                className={styles['cart-item-header']}
                                title='Đã thanh toán' bordered={true}>
                                <div className={styles['flex-just-space-center']} style={{
                                    paddingBottom: '15px',
                                }}>
                                    <h1>30</h1>
                                </div>
                                <div className={styles['flex-just-space-between']}>
                                    <FontAwesomeIcon icon={faMoneyBill} />
                                    <span>50,000,000 (đ)</span>
                                </div>
                            </Card></Col>

                        <Col style={{ padding: '5px' }} span={6}>
                            <Card
                                className={styles['cart-item-header']}
                                title='Chưa thanh toán' bordered={true}>
                                <div className={styles['flex-just-space-center']} style={{
                                    paddingBottom: '15px',
                                }}>
                                    <h1>30</h1>
                                </div>
                                <div className={styles['flex-just-space-between']}>
                                    <FontAwesomeIcon icon={faMoneyBill} />
                                    <span>50,000,000 (đ)</span>
                                </div>
                            </Card></Col>

                        <Col style={{ padding: '5px' }} span={6}>
                            <Card
                                className={styles['cart-item-header']}
                                title='Đã hủy thanh toán' bordered={true}>
                                <div className={styles['flex-just-space-center']} style={{
                                    paddingBottom: '15px',
                                }}>
                                    <h1>30</h1>
                                </div>
                                <div className={styles['flex-just-space-between']}>
                                    <FontAwesomeIcon icon={faMoneyBill} />
                                    <span>50,000,000 (đ)</span>
                                </div>
                            </Card></Col>

                        <Col style={{ padding: '5px' }} span={6}>
                            <Card
                                className={styles['cart-item-header']}
                                title='Tổng hoa đơn' bordered={true}>
                                <div className={styles['flex-just-space-center']} style={{
                                    paddingBottom: '15px',
                                }}>
                                    <h1>30</h1>
                                </div>
                                <div className={styles['flex-just-space-between']}>
                                    <FontAwesomeIcon icon={faMoneyBill} />
                                    <span>50,000,000 (đ)</span>
                                </div>
                            </Card></Col>
                    </Row>
                </Card></Col>

                <Row className={styles['cards-dashboard']}>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={12}> <Card
                        title='Biểu đồ hóa đơn theo nhánh' bordered={true}>
                        <div className={styles['cart-chart']}>
                            <Pie {...configPie} />
                        </div>
                    </Card></Col>

                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={12}> <Card
                        title='Danh sách khách hàng tiềm năng' bordered={true}>
                        <div className={styles['cart-chart']}>
                            <Bar {...configBar} />;
                        </div>
                    </Card></Col>

                </Row>
                <Row className='cards-dashboard'>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}>
                        <Card title='Biểu đồ đơn hàng theo thời gian'
                              bordered={true}
                              extra={(
                                  <div>
                                      <Popover
                                          content={(
                                              <div>
                                                  <Row style={{
                                                      marginBottom: '5px',
                                                  }}>
                                                      <Button onClick={showTimeLineYear} type='primary'>Biểu đồ theo
                                                          năm</Button>
                                                  </Row>
                                                  <Row style={{
                                                      marginBottom: '5px',
                                                  }}>
                                                      <Button onClick={showTimeLineMonth} type='primary'>Biểu đồ theo
                                                          tháng</Button>
                                                  </Row>
                                                  <Row style={{
                                                      marginBottom: '5px',
                                                  }}>
                                                      <Button onClick={showTimeLineDay} type='primary'>Biểu đồ theo
                                                          ngày</Button>
                                                  </Row>
                                                  <Row style={{
                                                      marginBottom: '5px',
                                                  }}>
                                                      <Button onClick={showTimeLine} type='primary'>Chọn khoảng
                                                          ngày</Button>
                                                  </Row>
                                              </div>
                                          )}
                                          title=''
                                          trigger='click'
                                          open={open}
                                          onOpenChange={handleOpenChange}
                                      >
                                          <Button style={{ marginRight: '15px' }} type='primary'>Tùy chỉnh</Button>
                                      </Popover>
                                      <Button type='primary' onClick={refreshDataLine}><FontAwesomeIcon
                                          icon={faRefresh} /></Button>
                                  </div>)}
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
                                        }}
                                                     valueDefault
                                                     onChange={(values) => {
                                                         if (values != null) {
                                                             setTimeDate(values.map(item => {
                                                                 return item.format('YYYY-MM-DD');
                                                             }));
                                                         }
                                                     }
                                                     }
                                        />
                                        <Button onClick={handerSubmitTime} type='primary'>Gửi</Button>
                                    </div>


                                </Space>
                            </div>
                            <Line {...config} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>

    );
}

function getConfigPieChart(data) {
    return {
        appendPadding: 10,
        data,
        theme: 'light',
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        innerRadius: 0.64,
        meta: {
            value: {
                formatter: (v) => `¥ ${v}`,
            },
        },
        label: {
            type: 'inner',
            offset: '-50%',
            autoRotate: false,
            style: {
                textAlign: 'center',
                fill: '#fff',
            },
            formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        },
        statistic: {
            title: {
                offsetY: -8,
                style: {
                    color: '#fff',
                },
            },
            content: {
                style: {
                    color: '#fff',
                },
                offsetY: -4,
            },
        },
        pieStyle: {
            lineWidth: 0,
        },
    };
}

function getConfigBarChart(data) {
    return {
        data,
        xField: 'sales',
        yField: 'type',
        meta: {
            type: {
                alias: '类别',
            },
            sales: {
                alias: '销售额',
            },
        },
        minBarWidth: 20,
        maxBarWidth: 20,
    };
}

function getConfigLineChart(data) {
    return {
        data,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        annotations: [
            {
                type: 'regionFilter',
                start: ['min', 'median'],
                end: ['max', '0'],
                color: '#F4664A',
            },
            {
                type: 'text',
                position: ['min', 'median'],
                content: '中位数',
                offsetY: -4,
                style: {
                    textBaseline: 'bottom',
                },
            },
            {
                type: 'line',
                start: ['min', 'median'],
                end: ['max', 'median'],
                style: {
                    stroke: '#F4664A',
                    lineDash: [2, 2],
                },
            },
        ],
        onReady: (plot) => {
            plot.chart.on('plot:click', (evt) => {
                const { x, y } = evt;
                var item = plot.chart.getTooltipItems({ x, y })[0];
                console.log(item.data);
            });
        },

    };
}

export default ManageDashBoardOrder;