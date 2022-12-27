import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import './CreateAccount.scss';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { editDetailAccount, getDetailAccount } from '~/redux/apiRequest';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Button, Card, Modal } from 'antd';
import classNames from 'classnames/bind';
import styles from './EditAccount.module.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import { registerUser } from '../../redux/apiRequest';
const cx = classNames.bind(styles);

function ModalEdit() {
    const [loadApi, setLoadApi] = useState(false);
    let { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailAccount = useSelector((state) => state.account.account?.detailAccount);

    useEffect(() => {
        getDetailAccount(id, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApi]);

    const handleUpdateApi = () => {
        setLoadApi(!loadApi);
        navigate(`/system/manage-user/detail/${id}`);
    };

    // const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: detailAccount?.name,
            email: detailAccount?.email,
            password: detailAccount?.password,
            phone: detailAccount?.phone,
            gender: detailAccount?.gender,
            address: detailAccount?.address,
            roles: [
                {
                    name: 'ADMIN',
                },
                {
                    name: 'STAFF',
                },
            ],
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên người dùng.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            email: Yup.string()
                .required('Vui lòng nhập email.')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ.'),
            address: Yup.string().required('Vui lòng nhập tên địa chỉ.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            phone: Yup.string()
                .required('Vui lòng nhập số điện thoại.')
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phải là số điện thoại hợp lệ'),
            gender: Yup.string().required('Vui lòng xác nhận giới tính.').min(3, 'Tên phải lớn hơn 3 ký tự.'),
        }),
        onSubmit: (values) => {
            console.log(values);

            editDetailAccount(id, values, dispatch, user?.accessToken, handleUpdateApi);
            // actions.resetForm();
        },
    });

    return (
        <div style={{ marginTop: 23 }}>
            <Link to={`/system/manage-user/detail/${id}`}>
                {/* <EditOutlined /> */}
                <Button type="primary">Back</Button>
            </Link>
            {/* <Modal title="Modal Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}> */}
            <Card style={{ width: 1080, margin: '0 auto' }}>
                <form className={cx('loginForm')} onSubmit={formik.handleSubmit} style={{ width: '950px' }}>
                    <div className={cx('field')}>
                        <div className={cx('customInput')}>
                            <FontAwesomeIcon className={cx('inputicon')} icon={faUser} />
                            <input
                                className={cx('inputfield')}
                                type="text"
                                placeholder="Name..."
                                autoComplete="username"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.name && <p className="error">{formik.errors.name}</p>}
                        </div>
                    </div>
                    <div className={cx('field')}>
                        <div className={cx('customInput')}>
                            <FontAwesomeIcon className="inputicon" icon={faEnvelope} />
                            <input
                                className={cx('inputfield')}
                                type="email"
                                placeholder="Email.."
                                autoComplete="username"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.email && <p className={cx('error')}>{formik.errors.email}</p>}
                        </div>
                    </div>
                    <div className={cx('field')}>
                        <div className={cx('customInput')}>
                            <FontAwesomeIcon className={cx('inputicon')} icon={faPhone} />
                            <input
                                className={cx('inputfield')}
                                type="text"
                                placeholder="Phone..."
                                autoComplete="username"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
                        </div>
                    </div>
                    <div className={cx('field')}>
                        <div className={cx('customInput')}>
                            <FontAwesomeIcon className={cx('inputicon')} icon={faAddressBook} />
                            <input
                                className={cx('inputfield')}
                                type="text"
                                placeholder="Address..."
                                autoComplete="username"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.address && <p className="error">{formik.errors.address}</p>}
                        </div>
                    </div>

                    <div className={cx('field submitfield')} style={{ width: '700px' }}>
                        <input className={cx('submit')} type="submit" value="Update User" />
                    </div>
                </form>
            </Card>
            {/* </Modal> */}
        </div>
    );
}

export default ModalEdit;