import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createTypeService } from '~/redux/type_service/apiTypeService';
import { Button, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldCat, faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './AddVoucher.module.scss';
import { useState } from 'react';
import { createVoucher } from '~/redux/voucher/apiVoucher';
const cx = classNames.bind(styles);

function AddVoucher() {
    const dispatch = useDispatch();

    const [state, setState] = useState();
    const user = useSelector((state) => state.auth.login?.currentUser);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name:'',
            discount:'',
            expired_date:'',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên'),
            discount: Yup.string().required('Vui lòng chọn mức giảm giá'),
            expired_date: Yup.string().required('Vui lòng chọn ngày hết hạn'),
        }),
        onSubmit: (values) => {
            values.discount = values.discount / 100;
            createVoucher(values,dispatch,user?.accessToken,navigate);
        },
    });

    return (
        <div style={{ marginTop: 23 }}>
            <Link to={'/system/manage-voucher'}>
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
                            placeholder="tên voucher..."
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
                <div className="field">
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faUser} />
                        <input
                            className={cx('inputfield')}
                            type="number"
                            placeholder="giảm giá ..."
                            autoComplete="discount"
                            name="discount"
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.discount && <p className="error">{formik.errors.discount}</p>}
                    </div>
                </div>
                <div className="field">
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faUser} />
                        <div className="col l-6 form-group">
                            {' '}
                            {/* <label>Chọn ngày </label> */}
                            <DatePicker
                                onChange={(e) => {
                                    let thisDate = new Date(e);
                                    let dd = String(thisDate.getDate()).padStart(2, '0');
                                    let mm = String(thisDate.getMonth() + 1).padStart(2, '0');
                                    let yyyy = thisDate.getFullYear();
                                    let dateConvert = yyyy + '-' + mm + '-' + dd;
                                    formik.setFieldValue('expired_date', dateConvert)
                                    }
                                }

                                name="expired_date"
                                style={{
                                    width: '100%',
                                    height: 32,
                                    margin: '0 0 20px',
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.expired_date && <p className="error">{formik.errors.expired_date}</p>}
                    </div>
                </div>

                <div className={cx('field submitfield')} style={{ width: '850px' }}>
                    <input className={cx('submit')} type="submit" value="Tạo" />
                </div>
            </form>
        </div>
    );
}
export default AddVoucher;