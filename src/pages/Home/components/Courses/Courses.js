import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import * as userService from '~/services/userService';
import classNames from 'classnames/bind';
import styles from '../ContentSlider/ContentSlider.module.scss';
import { dataCoursesFake } from '../../../../assets/dataFake/dataService';
const cx = classNames.bind(styles);

function Courses({ settings }) {
    const navigate = useNavigate();
    const [dataCourses, setDataCourses] = useState([]);
    const [loadData, setLoadData] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            setLoadData(true);
            const result = await userService.courses();
            setDataCourses(result);
            if (result && result.length > 0) {
                console.log('check load data:');
                setLoadData(false);
            }
        };
        fetchApi();
    }, []);

    const handleViewDetailCourses = (item) => {
        navigate(`detail-course/${item.id}`);
    };
    let newDataCourse = dataCourses && dataCourses.length > 0 ? dataCourses : dataCoursesFake;

    // console.log('data courses', dataCourses);
    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Dịch vụ chăm sóc khách hàng</span>
                    <button className="btn-section">Xem thêm</button>
                </div>

                <div className={cx('slider')}>
                    <Slider className={cx('container')} {...settings}>
                        {newDataCourse &&
                            newDataCourse.length > 0 &&
                            newDataCourse.map((item, index) => (
                                <div
                                    key={index}
                                    className="section-customize"
                                    onClick={() => handleViewDetailCourses(item)}
                                >
                                    <div
                                        className="bg-image section-specialty"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    ></div>
                                    <div className="name-specialty">{item.name}</div>
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

export default Courses;
