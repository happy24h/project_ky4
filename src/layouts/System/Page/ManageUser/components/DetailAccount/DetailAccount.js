import { Card, List } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetailAccount } from '~/redux/apiRequest';
import EditAccount from '../EditAccount';
import styles from './DetailAccount.module.scss';
const cx = classNames.bind(styles);
const { Meta } = Card;

function DetailAccount() {
    const [loadApi, setLoadApi] = useState(false);
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailAccount = useSelector((state) => state.account.account?.detailAccount);

    useEffect(() => {
        getDetailAccount(id, dispatch, user?.accessToken);
    }, [loadApi]);

    const handleUpdateApi = () => {
        setLoadApi(!loadApi);
    };

    return (
        <>
            <EditAccount
                accountId={id}
                accessToken={user?.accessToken}
                detailAccount={detailAccount}
                handleUpdateApi={handleUpdateApi}
            />
            <div className={cx('wrapper')}>
                {' '}
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Sắp đến tết" description="www.instagram.com" />
                </Card>
                <Card title="Profile" size="default" style={{ width: 800 }}>
                    {/* <Divider orientation="left">Default Size</Divider> */}
                    <List className={cx('list-detail')}>
                        <strong>Full name:</strong> <span className={cx('text-detail')}>{detailAccount?.name}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Email:</strong> <span className={cx('text-detail')}>{detailAccount?.email}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Phone:</strong> <span className={cx('text-detail')}>{detailAccount?.phone}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Gender:</strong> <span className={cx('text-detail')}>{detailAccount?.gender}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Address:</strong> <span className={cx('text-detail')}>{detailAccount?.address}</span>
                    </List>
                </Card>
            </div>
        </>
    );
}

export default DetailAccount;
