import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// import './CreateAccount.scss';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faKey,
    faPhone,
    faUser,
    faShieldCat,
    faAddressBook,
    faImage,
} from '@fortawesome/free-solid-svg-icons';
import { createAccount, getAllAccount, getAllRoles } from '~/redux/apiRequest';
import { Button, Modal } from 'antd';
import classNames from 'classnames/bind';
import styles from './CreateBlog.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { createBlog } from '~/redux/blog/apiBlog';
// import { registerUser } from '../../redux/apiRequest';
const cx = classNames.bind(styles);

function CreateBlog() {
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
            title: '',
            description: '',
            content: '',
            thumbnail: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Vui lòng nhập tiêu đề.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            description: Yup.string().required('Vui lòng nhập miêu tả.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            content: Yup.string().required('Vui lòng nhập nội dung.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            thumbnail: Yup.string().required('Vui lòng nhập link avatar.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
        }),
        onSubmit: (values) => {
            // const submitValue = {
            //     ...values,
            //     // roles: [
            //     //     {
            //     //         name: state,
            //     //     },
            //     // ],
            // };
            createBlog(values, dispatch, user?.accessToken, handleApi, navigate);
            // if (state) {
            // } else {
            //     alert('Chưa điền đủ thông tin');
            // }
        },
    });

    return (
        <div style={{ marginTop: 23 }}>
            <Link to={'/system/manage-blog'}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    Back
                </Button>
            </Link>
            <form className={cx('loginForm')} onSubmit={formik.handleSubmit} style={{ width: '1000px' }}>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faUser} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Title..."
                            autoComplete="title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.title && <p className="error">{formik.errors.title}</p>}
                    </div>
                </div>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className="inputicon" icon={faEnvelope} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Description..."
                            autoComplete="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.description && <p className={cx('error')}>{formik.errors.description}</p>}
                    </div>
                </div>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faPhone} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Content..."
                            autoComplete="content"
                            name="content"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.content && <p className="error">{formik.errors.content}</p>}
                    </div>
                </div>

                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faImage} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="avatar..."
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
                    <input className={cx('submit')} type="submit" value="ADD USER" />
                </div>
            </form>
            {/* </Modal> */}
        </div>
    );
}

export default CreateBlog;
