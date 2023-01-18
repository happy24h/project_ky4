import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeSchedule from './Schedule/EmployeeSchedule';
// import './ServiceClient.scss';
import { getAllAccount, getDetailAccount } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ServiceClient.module.scss';
const cx = classNames.bind(styles);

function ServiceClient() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account?.accountCurrent.content);
    // const navigate = useNavigate();

    useEffect(() => {
        getAllAccount();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            {listAccount &&
                listAccount.map((item, index) => {
                    return (
                        <div key={index} className={cx('wrapper-content')}>
                            <div className={cx('content-employee')}>
                                <div
                                    className={cx('content-left')}
                                    style={
                                        item?.thumbnail
                                            ? {
                                                  backgroundImage: `url(${item?.thumbnail})`,
                                              }
                                            : {}
                                    }
                                ></div>
                                <div className={cx('content-right')}>
                                    <div className="up">{item?.accounts_name}</div>
                                    <div className="down">{item?.account_description}</div>
                                </div>
                            </div>
                            <EmployeeSchedule />
                        </div>
                    );
                })}
        </div>
    );
}

export default ServiceClient;
