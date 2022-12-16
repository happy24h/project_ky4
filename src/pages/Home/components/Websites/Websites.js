import { useState, useEffect } from 'react';
import * as userService from '~/services/userService';
import Slider from 'react-slick';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../ContentSlider/ContentSlider.module.scss';
import { dataWebsiteFake } from '../../../../assets/dataFake/dataService';

const cx = classNames.bind(styles);
function Websites({ settings }) {
    const navigate = useNavigate();
    const [dataWebsites, setDataWebsites] = useState([]);
    const [loadData, setLoadData] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            setLoadData(true);
            let result = await userService.websites();
            setDataWebsites(result);
            if (result && result.length > 0) {
                console.log('check load data:');
                setLoadData(false);
            }
        };
        fetchApi();
    }, []);

    const handleViewDetailWebsites = (website) => {
        navigate(`detail-learn-website/${website.id}`);
    };

    let newDataWebsite = dataWebsites && dataWebsites.length > 0 ? dataWebsites : dataWebsiteFake;

    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Tổng hợp cơ sở làm tóc</span>
                    <button className="btn-section">Xem thêm</button>
                </div>

                <div className={cx('slider')}>
                    <Slider className={cx('container')} {...settings}>
                        {newDataWebsite &&
                            newDataWebsite.length > 0 &&
                            newDataWebsite.map((item, index) => (
                                <div
                                    key={index}
                                    className="section-customize"
                                    onClick={() => handleViewDetailWebsites(item)}
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

export default Websites;
