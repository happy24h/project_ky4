import { useState, useEffect } from 'react';
import Slider from 'react-slick';

import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../ContentSlider/ContentSlider.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getBranch } from '~/redux/branch/apiBranch';

const cx = classNames.bind(styles);
function Branch({ settings }) {
    // const [dataWebsites, setDataWebsites] = useState([]);
    // const [loadData, setLoadData] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    // const user = useSelector((state) => state.auth.login?.currentUser);
    const listBranch = useSelector((state) => state.branch.branch?.listData?.content);
    console.log('check list branch', listBranch);
    useEffect(() => {
        getBranch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleViewDetailBranch = (branch) => {
        navigate(`detail-learn-branch/${branch.id}`);
    };

    // let newDataWebsite = dataWebsites && dataWebsites.length > 0 ? dataWebsites : dataWebsiteFake;

    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Tổng hợp cơ sở làm tóc</span>
                    <button className="btn-section">Xem thêm</button>
                </div>

                <div className={cx('slider')}>
                    <Slider className={cx('container')} {...settings}>
                        {listBranch &&
                            listBranch.length > 0 &&
                            listBranch.map((item, index) => (
                                <div
                                    key={index}
                                    className="section-customize"
                                    onClick={() => handleViewDetailBranch(item)}
                                >
                                    <div
                                        className="bg-image section-specialty"
                                        style={{ backgroundImage: `url(${item.thumbnail})` }}
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

export default Branch;