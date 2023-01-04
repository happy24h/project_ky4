import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// import './CreateAccount.scss';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faFilePen, faPenToSquare, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { createAccount, getAllAccount, getAllRoles } from '~/redux/apiRequest';
import { Button, Modal } from 'antd';
import classNames from 'classnames/bind';
import styles from './AddBranch.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { createBlog } from '~/redux/blog/apiBlog';
import { createBranch } from '~/redux/branch/apiBranch';
// import { registerUser } from '../../redux/apiRequest';
const cx = classNames.bind(styles);

function AddBranch() {
    // const [modal, setModal] = useState(false);

    const [loadApi, setLoadApi] = useState(false);
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const handleApi = () => {
        setLoadApi(!loadApi);
    };

    let navigate = useNavigate();
    useEffect(() => {
        getAllRoles(dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllAccount();
        console.log('loadApi useEffect ', loadApi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleApi]);

    // const listRoles = useSelector((state) => state.role.role?.roleCurrent);

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            hot_line: '',
            thumbnail: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            address: Yup.string().required('Vui lòng nhập địa chỉ.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            hot_line: Yup.string().required('Vui lòng nhập hot line.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            thumbnail: Yup.string().required('Vui lòng nhập link avatar.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
        }),
        onSubmit: (values) => {
            createBranch(values, dispatch, user?.accessToken, handleApi, navigate);
        },
    });

    return (
        <div style={{ marginTop: 23 }}>
            <Link to={'/system/manage-branch'}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    Back
                </Button>
            </Link>
            <form className={cx('loginForm')} onSubmit={formik.handleSubmit} style={{ width: '1000px' }}>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faCircleInfo} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Name..."
                            autoComplete="name"
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
                        <FontAwesomeIcon className="inputicon" icon={faPenToSquare} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Address..."
                            autoComplete="address"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.address && <p className={cx('error')}>{formik.errors.address}</p>}
                    </div>
                </div>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faFilePen} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Hot line..."
                            autoComplete="hot_line"
                            name="hot_line"
                            value={formik.values.hot_line}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.hot_line && <p className="error">{formik.errors.hot_line}</p>}
                    </div>
                </div>

                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faImage} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Avatar..."
                            autoComplete="thumbnail"
                            name="thumbnail"
                            value={formik.values.thumbnail}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.thumbnail && <p className="error">{formik.errors.thumbnail}</p>}
                    </div>
                </div>

                <div className={cx('field submitfield')} style={{ width: '850px' }}>
                    <input className={cx('submit')} type="submit" value="Add Branch" />
                </div>
            </form>
            {/* </Modal> */}
        </div>
    );
}

export default AddBranch;
