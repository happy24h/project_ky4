// import { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// // import './CreateAccount.scss';
// import { useDispatch } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAddressBook, faEnvelope, faKey, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
// import { createAccount, editDetailAccount } from '~/redux/apiRequest';

// import { Button, Modal } from 'antd';
// import classNames from 'classnames/bind';
// import styles from './EditAccount.module.scss';
// // import { registerUser } from '../../redux/apiRequest';
// const cx = classNames.bind(styles);

// function EditAccount({ accountId, accessToken, detailAccount, handleUpdateApi }) {
//     console.log('check access token', accountId);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const showModal = () => {
//         setIsModalOpen(true);
//     };
//     const handleOk = () => {
//         setIsModalOpen(false);
//     };
//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };
//     const dispatch = useDispatch();
//     // const navigate = useNavigate();
//     const formik = useFormik({
//         initialValues: {
//             name: detailAccount?.name,
//             email: detailAccount?.email,
//             password: detailAccount?.password,
//             phone: detailAccount?.phone,
//             gender: detailAccount?.gender,
//             address: detailAccount?.address,
//             roles: [
//                 {
//                     name: 'ADMIN',
//                 },
//                 {
//                     name: 'STAFF',
//                 },
//             ],
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().required('Vui lòng nhập tên người dùng.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
//             email: Yup.string()
//                 .required('Vui lòng nhập email.')
//                 .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ.'),
//             address: Yup.string().required('Vui lòng nhập tên địa chỉ.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
//             phone: Yup.string()
//                 .required('Vui lòng nhập số điện thoại.')
//                 .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phải là số điện thoại hợp lệ'),
//             gender: Yup.string().required('Vui lòng xác nhận giới tính.').min(3, 'Tên phải lớn hơn 3 ký tự.'),
//         }),
//         onSubmit: (values) => {
//             console.log(values);

//             editDetailAccount(accountId, values, dispatch, accessToken, handleUpdateApi);
//             // actions.resetForm();
//             handleCancel();
//         },
//     });

//     return (
//         <div style={{ marginTop: 23 }}>
//             <Button type="primary" onClick={showModal}>
//                 Edit Account
//             </Button>
//             <Modal title="Modal Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
//                 <form className={cx('loginForm')} onSubmit={formik.handleSubmit} style={{ width: '950px' }}>
//                     <div className={cx('field')}>
//                         <div className={cx('customInput')}>
//                             <FontAwesomeIcon className={cx('inputicon')} icon={faUser} />
//                             <input
//                                 className={cx('inputfield')}
//                                 type="text"
//                                 placeholder="Name..."
//                                 autoComplete="username"
//                                 name="name"
//                                 value={formik.values.name}
//                                 onChange={formik.handleChange}
//                             />
//                         </div>
//                         <div className={cx('message')}>
//                             {formik.errors.name && <p className="error">{formik.errors.name}</p>}
//                         </div>
//                     </div>
//                     <div className={cx('field')}>
//                         <div className={cx('customInput')}>
//                             <FontAwesomeIcon className="inputicon" icon={faEnvelope} />
//                             <input
//                                 className={cx('inputfield')}
//                                 type="email"
//                                 placeholder="Email.."
//                                 autoComplete="username"
//                                 name="email"
//                                 value={formik.values.email}
//                                 onChange={formik.handleChange}
//                             />
//                         </div>
//                         <div className={cx('message')}>
//                             {formik.errors.email && <p className={cx('error')}>{formik.errors.email}</p>}
//                         </div>
//                     </div>
//                     <div className={cx('field')}>
//                         <div className={cx('customInput')}>
//                             <FontAwesomeIcon className={cx('inputicon')} icon={faPhone} />
//                             <input
//                                 className={cx('inputfield')}
//                                 type="text"
//                                 placeholder="Phone..."
//                                 autoComplete="username"
//                                 name="phone"
//                                 value={formik.values.phone}
//                                 onChange={formik.handleChange}
//                             />
//                         </div>
//                         <div className={cx('message')}>
//                             {formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
//                         </div>
//                     </div>
//                     <div className={cx('field')}>
//                         <div className={cx('customInput')}>
//                             <FontAwesomeIcon className={cx('inputicon')} icon={faAddressBook} />
//                             <input
//                                 className={cx('inputfield')}
//                                 type="text"
//                                 placeholder="Address..."
//                                 autoComplete="username"
//                                 name="address"
//                                 value={formik.values.address}
//                                 onChange={formik.handleChange}
//                             />
//                         </div>
//                         <div className={cx('message')}>
//                             {formik.errors.address && <p className="error">{formik.errors.address}</p>}
//                         </div>
//                     </div>

//                     <div className={cx('field submitfield')} style={{ width: '700px' }}>
//                         <input className={cx('submit')} type="submit" value="Update User" />
//                     </div>
//                 </form>
//             </Modal>
//         </div>
//     );
// }

// export default EditAccount;
