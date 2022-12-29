import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createAccount, getAllAccount } from '~/redux/apiRequest';
import { getAllService } from '~/redux/service/apiService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressBook, faEgg,
    faEnvelope,
    faImage,
    faKey,
    faPhone,
    faShieldCat,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './AddService.module.scss';
import { getUploadImage, uploadImage } from '~/redux/cloudImage/apiCloud';
const cx = classNames.bind(styles);

function AddService() {
    const [loadApi, setLoadApi] = useState(false);
    const [file, setFile] = useState();
    const [thumbnailLink, setThumbnailLink] = useState();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login?.currentUser);
    const handleApi = () => {
        setLoadApi(!loadApi);
    };

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name:'',
            description:'',
            typeServiceId:'',
            thumbnail: '',
            price: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            description: Yup.string().required('Vui lòng nhập mô tả.'),
            price: Yup.string().required('Vui lòng nhập giá.'),
            thumbnail: Yup.string().required('Vui gửi'),
        }),
        onSubmit: (values) => {
            alert('OK');
        },
    });

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const linkImage = useSelector((state) => state.cloudImage.cloudImage?.cloudImageCurrent);
    const handleUploadClick = async () => {
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        await uploadImage(formData,dispatch);
        // console.log("linkImage la:" + linkImage);
        setThumbnailLink(linkImage);
    };

    return (
        <div style={{ marginTop: 23 }}>
            <Link to={'/system/manage-user'}>
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
                            placeholder="Tên..."
                            autoComplete="tên"
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
                        <FontAwesomeIcon className={cx('inputicon')} icon={faUser} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="mô tả"
                            autoComplete="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.description && <p className="error">{formik.errors.description}</p>}
                    </div>
                </div>
                <div className={cx('customInput')}>
                    <FontAwesomeIcon className="inputicon" icon={faEgg} />
                    <input
                        className={cx('inputfield')}
                        type="number"
                        placeholder="Giá..."
                        autoComplete="price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                    />
                    <div className={cx('message')}>
                        {formik.errors.price && <p className="error">{formik.errors.price}</p>}
                    </div>
                </div>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <div>
                            <tr><td>File to upload:</td><td><input type="file" onChange={handleFileChange} /></td></tr>
                            <tr><td></td><td><button onClick={handleUploadClick}>Upload</button></td></tr>
                        </div>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faImage} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="avatar..."
                            autoComplete="thumbnail"
                            name="thumbnail"
                            value={thumbnailLink}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.thumbnail && <p className="error">{formik.errors.thumbnail}</p>}
                    </div>
                </div>

                <div className={cx('field submitfield')} style={{ width: '850px' }}>
                    <input className={cx('submit')} type="submit" value="Tạo" />
                </div>
            </form>
        </div>
    );
}

export default AddService;