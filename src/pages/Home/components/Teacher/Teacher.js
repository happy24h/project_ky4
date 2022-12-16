import { useState, useEffect } from 'react';
import * as useService from '~/services/userService';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Buffer } from 'buffer';
import classNames from 'classnames/bind';
import styles from '../ContentSlider/ContentSlider.module.scss';
import { dataTeacherFake } from '../../../../assets/dataFake/dataService';
const cx = classNames.bind(styles);
function Teacher({ settings }) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loadData, setLoadData] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            setLoadData(true);
            let result = await useService.teacher();
            setPosts(result);
            if (result && result.length > 0) {
                console.log('check load data:');
                setLoadData(false);
            }
        };
        fetchApi();
    }, []);
    const handleViewDetailTeacher = (teacher) => {
        navigate(`detail-teacher/${teacher.id}`);
    };
    console.log('posts >>>', posts);

    let newDataTeacher = posts && posts.length > 0 ? posts : dataTeacherFake;
    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Nhân viên nổi bật tuần qua</span>
                    <button className="btn-section">Xem thêm</button>
                </div>

                <div className={cx('slider')}>
                    <Slider className={cx('container')} {...settings}>
                        {newDataTeacher &&
                            newDataTeacher.length > 0 &&
                            newDataTeacher.map((item, index) => {
                                var imageBase64 =
                                    posts && posts.length > 0 ? Buffer.from(item.image, 'base64') : item.image.data;
                                // console.log('base64', imageBase64);

                                return (
                                    <div
                                        className="section-customize"
                                        key={index}
                                        onClick={() => handleViewDetailTeacher(item)}
                                    >
                                        <div className="item-center">
                                            <div
                                                className="bg-image section-outstanding-doctor"
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            ></div>
                                            <div className="name-specialty">{`${item.lastName} ${item.firstName}`}</div>
                                        </div>
                                    </div>
                                );
                            })}
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

export default Teacher;
