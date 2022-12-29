import { Card, List, Button } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetailAccount } from '~/redux/apiRequest';
import { EditOutlined } from '@ant-design/icons';

// import EditAccount from '../EditAccount';
import styles from './DetailBlog.module.scss';
const cx = classNames.bind(styles);
const { Meta } = Card;

function DetailBlog() {
    const [loadApi, setLoadApi] = useState(false);
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailBlog = useSelector((state) => state.blog.blog?.detailBlog);

    useEffect(() => {
        getDetailAccount(id, dispatch, user?.accessToken);
    }, [loadApi]);

    const handleUpdateApi = () => {
        setLoadApi(!loadApi);
    };

    return (
        <>
            <Link to={'/system/manage-user'}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    {/* <EditOutlined /> */}
                    Back
                </Button>
            </Link>

            <div className={cx('wrapper')}>
                {' '}
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                >
                    <div
                        className={cx('detail-image')}
                        style={{ backgroundImage: `url(${detailBlog.thumbnail})` }}
                    ></div>
                    <Meta title="Sắp đến tết" description="www.instagram.com" />
                </Card>
                <Card
                    title="Profile"
                    size="default"
                    extra={
                        <Link to={`/system/manage-user/modal-edit/${id}`}>
                            <Button type="primary" style={{ background: '#fcaf17' }}>
                                {' '}
                                <EditOutlined />
                                Edit User
                            </Button>
                        </Link>
                    }
                    style={{ width: 800 }}
                >
                    {/* <Divider orientation="left">Default Size</Divider> */}
                    <List className={cx('list-detail')}>
                        <strong>Full name:</strong> <span className={cx('text-detail')}>{detailBlog?.title}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Email:</strong> <span className={cx('text-detail')}>{detailBlog?.description}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Phone:</strong> <span className={cx('text-detail')}>{detailBlog?.content}</span>
                    </List>
                    {/* <List className={cx('list-detail')}>
                        <strong>Gender:</strong> <span className={cx('text-detail')}>{detailBlog?.thumbnail}</span>
                    </List> */}
                </Card>
            </div>
        </>
    );
}

export default DetailBlog;
