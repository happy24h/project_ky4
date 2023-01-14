import { useState, useEffect } from 'react';
import Slider from 'react-slick';

import { useNavigate } from 'react-router-dom';
// import * as userService from '~/services/userService';
import classNames from 'classnames/bind';
import styles from '../ContentSlider/ContentSlider.module.scss';
// import { dataCoursesFake } from '../../../../assets/dataFake/dataService';
import { getAllService } from '~/redux/service/apiService';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function Service({ settings }) {
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const [loadData, setLoadData] = useState(false);

    useEffect(() => {
        getAllService();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //B3: Lấy danh sách
    const listService = useSelector((state) => state.service.service?.serviceCurrent?.content);

    const handleViewDetailCourses = (item) => {
        navigate(`detail-service/${item.service_id}`);
    };
    // let newDataCourse = dataCourses && dataCourses.length > 0 ? dataCourses : dataCoursesFake;

    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Trải nghiệm dịch vụ</span>
                    <button className="btn-section">Xem thêm</button>
                </div>

                <div className={cx('slider')}>
                    <Slider className={cx('container')} {...settings}>
                        {listService &&
                            listService.length > 0 &&
                            listService.map((item, index) => (
                                <div
                                    key={index}
                                    className="section-customize"
                                    onClick={() => handleViewDetailCourses(item)}
                                >
                                    <div
                                        className="bg-image section-specialty"
                                        style={{ backgroundImage: `url(${item.thumbnail})` }}
                                    ></div>
                                    <div className="name-specialty">{item.service_name}</div>
                                </div>
                            ))}
                    </Slider>
                    {/* {loadData && (
                        <div className={cx('wrapper-loading')}>
                            Loading...
                            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default Service;
