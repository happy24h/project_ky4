import classNames from 'classnames/bind';
import styles from './AllBranch.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBranch } from '~/redux/branch/apiBranch';

const cx = classNames.bind(styles);

function AllBranch() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBranch = useSelector((state) => state.branch.branch?.listData?.content);
    let dataBranch = {
        name: '',
        address: '',
        hot_line: '',
        start: '',
        end: '',
        page: 1,
        limit: 10,
        sort: 'desc',
        status: '',
    };

    useEffect(() => {
        getBranch(dataBranch, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className="grid wide">
                <div className="row">
                    {listBranch &&
                        listBranch.map((item, index) => {
                            return (
                                <div className="col l-2-4 m-4 c-6" key={index}>
                                    <div
                                        className={cx('item')}
                                        style={{
                                            backgroundImage: `url(${item.thumbnail})`,
                                        }}
                                    >
                                        <span>{item.name}</span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default AllBranch;
