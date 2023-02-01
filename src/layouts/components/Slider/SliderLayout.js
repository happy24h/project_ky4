import React from 'react';
import './SliderLayout.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '~/config';
import {
    faBriefcase,
    faCircleQuestion,
    faClock,
    faHandshake,
    faHome,
    faHospital,
    faPenAlt,
    faUserNinja,
} from '@fortawesome/free-solid-svg-icons';

function SliderLayout() {
    return (
        <div className="home-header-banner">
            <div className="content-up">
                <div className="title1">CƠ SỞ LÀM TÓC UY TÍN</div>
                <div className="title2">NƠI CHĂM SÓC VÀ YÊU THƯƠNG MÁI TÓC</div>
                <div className="search">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Tìm kiếm kiểu tóc của bạn tại đây..." />
                </div>
            </div>
            <div className="content-down">
                <div className="options">
                    <div className="option-child">
                        <Link to={config.routes.home}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faHome} />
                            </div>
                            <div className="text-child">Trang chủ</div>
                        </Link>
                    </div>
                    <div className="option-child">
                        <Link to={config.routes.allService}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faHandshake} />
                            </div>
                            <div className="text-child">Dịch vụ</div>
                        </Link>
                    </div>
                    <div className="option-child">
                        <Link to={config.routes.allBranch}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faHospital} />
                            </div>
                            <div className="text-child">Cơ sở</div>
                        </Link>
                    </div>
                    <div className="option-child">
                        <Link to={config.routes.allEmployee}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faUserNinja} />
                            </div>
                            <div className="text-child">Nhân viên</div>
                        </Link>
                    </div>

                    <div className="option-child">
                        <Link to={'/blog'}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faPenAlt} />
                            </div>
                            <div className="text-child">Bài viết</div>
                        </Link>
                    </div>

                    <div className="option-child">
                        <Link to={'/library'}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faBriefcase} />
                            </div>
                            <div className="text-child">Tuyển dụng</div>
                        </Link>
                    </div>
                    <div className="option-child">
                        <Link to={'/contact'}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faCircleQuestion} />
                            </div>
                            <div className="text-child">Liên Hệ</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SliderLayout;
